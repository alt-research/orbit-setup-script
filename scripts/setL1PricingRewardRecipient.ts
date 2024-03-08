import { abi as ArbOwner__abi } from '@arbitrum/nitro-contracts/build/contracts/src/precompiles/ArbOwner.sol/ArbOwner.json'
import { abi as ArbGasInfo__abi } from '@arbitrum/nitro-contracts/build/contracts/src/precompiles/ArbGasInfo.sol/ArbGasInfo.json'
import { ethers } from 'ethers'
import UpgradeExecutor from '@arbitrum/nitro-contracts/build/contracts/src/mocks/UpgradeExecutorMock.sol/UpgradeExecutorMock.json'
import { getExecutorAddress } from './getExecutorAddressImpl'

export async function main() {
  const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
  const L2_RPC_URL = process.env.L2_RPC_URL
  const L3_RPC_URL = process.env.L3_RPC_URL
  const INBOX = process.env.INBOX || ''
  const TOKEN_BRIDGE_CREATOR = process.env.TOKEN_BRIDGE_CREATOR || ''
  const RECIPIENT = process.env.RECIPIENT || ''
  // Generating providers from RPCs
  const L2Provider = new ethers.providers.JsonRpcProvider(L2_RPC_URL)
  const L3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)

  // Creating the wallet and signer
  const l3signer = new ethers.Wallet(PRIVATE_KEY).connect(L3Provider)

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
  const ABI = [
    'function setL1PricingRewardRecipient(address recipient) external',
  ]
  const iface = new ethers.utils.Interface(ABI)
  const data = iface.encodeFunctionData('setL1PricingRewardRecipient', [
    RECIPIENT
  ])

  // Constructing call data for setting L1 pricing reward rate on L3
  const arbOwnerInterface = new ethers.utils.Interface(ArbOwner__abi)
  const targetCallData = arbOwnerInterface.encodeFunctionData(
    'setL1PricingRewardRecipient',
    [RECIPIENT]
  )
  console.log(
    'Executing setL1PricingRewardRecipient through the UpgradeExecutor contract'
  )
  console.log(`Setting L1 pricing reward recipient to ${RECIPIENT}`)
  const receipt = await upgradeExecutor.executeCall(
    '0x0000000000000000000000000000000000000070',
    data
  )
  console.log('Transaction complete, on TX:', receipt.hash)

  // Verify
  console.log(`Checking getL1RewardRecipient`)
  const arbGasInfoAbi = ArbGasInfo__abi
  const arbGasInfoAddress = '0x000000000000000000000000000000000000006c'
  const ArbOGasInfo = new ethers.Contract(
    arbGasInfoAddress,
    arbGasInfoAbi,
    L3Provider
  )
  const newRecipient = await ArbOGasInfo.getL1RewardRecipient()
  console.log(`newRecipient`, newRecipient)
  if (newRecipient != RECIPIENT) {
    console.log(`ERROR! Please try again.`)
  } else {
    console.log('All things done! Enjoy your Orbit chain. LFG 🚀🚀🚀🚀')
  }
}

// Run the script
main().catch(error => {
  console.error(error)
  process.exit(1)
})
