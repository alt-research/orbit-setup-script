import { abi as ArbOwner__abi } from '@arbitrum/nitro-contracts/build/contracts/src/precompiles/ArbOwner.sol/ArbOwner.json'
import { abi as ArbGasInfo__abi } from '@arbitrum/nitro-contracts/build/contracts/src/precompiles/ArbGasInfo.sol/ArbGasInfo.json'
import { ethers } from 'ethers'
import UpgradeExecutor from '@arbitrum/nitro-contracts/build/contracts/src/mocks/UpgradeExecutorMock.sol/UpgradeExecutorMock.json'
import { getExecutorAddress } from './getExecutorAddressImpl'

export async function main() {
  const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
  const L2_RPC_URL = process.env.L2_RPC_URL
  const L3_RPC_URL = process.env.L3_RPC_URL
  const RECIPIENT = process.env.RECIPIENT || ''
  if (!PRIVATE_KEY || !L2_RPC_URL || !L3_RPC_URL || !RECIPIENT) {
    throw new Error('Required environment variable not found')
  }

  const JUST_GENERATE_TARGET_CALLDATA =
    process.env.JUST_GENERATE_TARGET_CALLDATA

  // To determine UpgradeExecutor proxy, provide either TOKEN_BRIDGE_CREATOR and INBOX, or just UPGRADE_EXECUTOR_PROXY
  const TOKEN_BRIDGE_CREATOR = process.env.TOKEN_BRIDGE_CREATOR || ''
  const INBOX = process.env.INBOX || ''
  const UPGRADE_EXECUTOR_PROXY = process.env.UPGRADE_EXECUTOR_PROXY

  // Generating providers from RPCs
  const L2Provider = new ethers.providers.JsonRpcProvider(L2_RPC_URL)
  const L3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)

  // Creating the wallet and signer
  const l3signer = new ethers.Wallet(PRIVATE_KEY).connect(L3Provider)

  // Arb Owner precompile address
  const arbOwnerAddress = '0x0000000000000000000000000000000000000070'

  let executorContractAddress = ''
  if (!UPGRADE_EXECUTOR_PROXY) {
    console.log(`UPGRADE_EXECUTOR_PROXY is not provided, getting address...`)
    executorContractAddress = await getExecutorAddress(
      TOKEN_BRIDGE_CREATOR,
      INBOX,
      L2Provider,
      L3Provider
    )
  } else {
    console.log(`UPGRADE_EXECUTOR_PROXY is provided`)
    executorContractAddress = UPGRADE_EXECUTOR_PROXY
  }
  console.log('executor address:', executorContractAddress)

  // Defining upgrade executor contract
  const executorContract__factory = new ethers.Contract(
    executorContractAddress,
    UpgradeExecutor.abi,
    l3signer
  )
  const upgradeExecutor = executorContract__factory.connect(l3signer)
  const ABI = [
    'function setL1PricingRewardRecipient(address recipient) external',
  ]
  const iface = new ethers.utils.Interface(ABI)
  const data = iface.encodeFunctionData('setL1PricingRewardRecipient', [
    RECIPIENT,
  ])

  // Constructing call data for setting L1 pricing reward rate on L3
  const arbOwnerInterface = new ethers.utils.Interface(ArbOwner__abi)
  const targetCallData = arbOwnerInterface.encodeFunctionData(
    'setL1PricingRewardRecipient',
    [RECIPIENT]
  )
  console.log(`targetCallData:`, targetCallData)

  if (JUST_GENERATE_TARGET_CALLDATA) {
    return
  }

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
