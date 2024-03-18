import { ethers } from 'ethers'
import UpgradeExecutor from '@arbitrum/nitro-contracts/build/contracts/src/mocks/UpgradeExecutorMock.sol/UpgradeExecutorMock.json'
import {
  TOKEN_BRIDGE_CREATOR_Arb_Sepolia,
  TOKEN_BRIDGE_CREATOR_Sepolia,
  TOKEN_BRIDGE_CREATOR_Arb_One,
  TOKEN_BRIDGE_CREATOR_Holesky,
} from './createTokenBridge'
import { getSigner } from './erc20TokenBridgeDeployment'
import { getExecutorAddress } from './getExecutorAddress'

async function main() {
  // Read the environment variables
  const privateKey = process.env.PRIVATE_KEY
  const L2_RPC_URL = process.env.L2_RPC_URL
  const L3_RPC_URL = process.env.L3_RPC_URL
  const newOwner = process.env.NEW_OWNER
  const INBOX = process.env.INBOX || ''
  if (!privateKey || !L3_RPC_URL || !newOwner) {
    throw new Error('Required environment variable not found')
  }

  // Generating providers from RPCs
  const L2Provider = new ethers.providers.JsonRpcProvider(L2_RPC_URL)
  const L3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)
  const l3Deployer = getSigner(L3Provider, privateKey)

  //fetching chain id of parent chain
  const l2ChainId = (await L2Provider.getNetwork()).chainId

  let TOKEN_BRIDGE_CREATOR: string
  if (l2ChainId === 421614) {
    TOKEN_BRIDGE_CREATOR = TOKEN_BRIDGE_CREATOR_Arb_Sepolia
  } else if (l2ChainId === 11155111) {
    TOKEN_BRIDGE_CREATOR = TOKEN_BRIDGE_CREATOR_Sepolia
  } else if (l2ChainId === 42161) {
    TOKEN_BRIDGE_CREATOR = TOKEN_BRIDGE_CREATOR_Arb_One
  } else if (l2ChainId === 17000) {
    TOKEN_BRIDGE_CREATOR = TOKEN_BRIDGE_CREATOR_Holesky
  } else {
    throw new Error(
      'The Base Chain you have provided is not supported, please put RPC for Arb Sepolia, Sepolia, Holesky, or Arb One'
    )
  }

  const executorContractAddress = await getExecutorAddress(
    TOKEN_BRIDGE_CREATOR,
    INBOX,
    L2Provider,
    L3Provider
  )

  console.log('executor address: ', executorContractAddress)
  //Defining upgrade executor contract
  const executorContract__factory = new ethers.Contract(
    executorContractAddress,
    UpgradeExecutor.abi,
    l3Deployer
  )
  const upgradeExecutor = executorContract__factory.connect(l3Deployer)
  const adminRole = await upgradeExecutor.ADMIN_ROLE()
  const executorRole = await upgradeExecutor.EXECUTOR_ROLE()

  console.log('admin role: ', adminRole)
  console.log('executor role: ', executorRole)

  const ABI = ['function grantRole(bytes32 role, address account)']
  const iface = new ethers.utils.Interface(ABI)
  const data = iface.encodeFunctionData('grantRole', [executorRole, newOwner])
  console.log('data: ', data)
  const receipt = await upgradeExecutor.executeCall(
    executorContractAddress,
    data
  )
  console.log('Transaction complete, grant executor role on TX:', receipt.hash)
}

// Run the script
main().catch(error => {
  console.error(error)
  process.exit(1)
})
