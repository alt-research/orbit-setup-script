import { abi as ArbOwner__abi } from '@arbitrum/nitro-contracts/build/contracts/src/precompiles/ArbOwner.sol/ArbOwner.json'
import { ethers } from 'ethers'
import UpgradeExecutor from '@arbitrum/nitro-contracts/build/contracts/src/mocks/UpgradeExecutorMock.sol/UpgradeExecutorMock.json'
import { getExecutorAddress } from './getExecutorAddress'

export async function main() {
  const privateKey = process.env.PRIVATE_KEY || ''
  const L2_RPC_URL = process.env.L2_RPC_URL
  const L3_RPC_URL = process.env.L3_RPC_URL
  const INBOX = process.env.INBOX || ''
  const TOKEN_BRIDGE_CREATOR = process.env.TOKEN_BRIDGE_CREATOR || ''
  const WEI_PER_UNIT = process.env.WEI_PER_UNIT
  // Generating providers from RPCs
  const L2Provider = new ethers.providers.JsonRpcProvider(L2_RPC_URL)
  const L3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)

  // Creating the wallet and signer
  const l3signer = new ethers.Wallet(privateKey).connect(L3Provider)

  // Arb Owner precompile address
  const arbOwnerAddress = '0x0000000000000000000000000000000000000070'

  const upgradeExecutorProxy = await getExecutorAddress(
    TOKEN_BRIDGE_CREATOR,
    INBOX,
    L2Provider,
    L3Provider
  )

  // Defining upgrade executor contract
  const executorContract__factory = new ethers.Contract(
    upgradeExecutorProxy,
    UpgradeExecutor.abi,
    l3signer
  )
  const upgradeExecutor = executorContract__factory.connect(l3signer)

  // Constructing call data for setting L1 pricing reward rate on L3
  const arbOwnerInterface = new ethers.utils.Interface(ArbOwner__abi)
  const targetCallData = arbOwnerInterface.encodeFunctionData(
    'setL1PricingRewardRate',
    [WEI_PER_UNIT]
  )
  console.log(
    'Executing setL1PricingRewardRate through the UpgradeExecutor contract'
  )
  console.log(`Setting L1 pricing reward rate on L3 to ${WEI_PER_UNIT}`)
  const receipt = await (
    await upgradeExecutor.executeCall(arbOwnerAddress, targetCallData)
  ).wait()
  console.log('Transaction complete, on TX:', receipt.transactionHash)
  console.log('All things done! Enjoy your Orbit chain. LFG 🚀🚀🚀🚀')
}

// Run the script
main().catch(error => {
  console.error(error)
  process.exit(1)
})
