import { ethers } from 'ethers'
import L1AtomicTokenBridgeCreator from '@arbitrum/token-bridge-contracts/build/contracts/contracts/tokenbridge/ethereum/L1AtomicTokenBridgeCreator.sol/L1AtomicTokenBridgeCreator.json'
import UpgradeExecutor from '@arbitrum/nitro-contracts/build/contracts/src/mocks/UpgradeExecutorMock.sol/UpgradeExecutorMock.json'
import {
  TOKEN_BRIDGE_CREATOR_Arb_Sepolia,
} from './createTokenBridge'
import { getSigner } from './erc20TokenBridgeDeployment'

async function main() {
  // Read the environment variables
  const privateKey = process.env.PRIVATE_KEY
  const L2_RPC_URL = process.env.L2_RPC_URL
  const L3_RPC_URL = process.env.L3_RPC_URL
  const newOwner = process.env.NEW_OWNER
  if (!privateKey || !L3_RPC_URL || !newOwner) {
    throw new Error('Required environment variable not found')
  }

  // Generating providers from RPCs
  const L2Provider = new ethers.providers.JsonRpcProvider(L2_RPC_URL)
  const L3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)
  const l3Deployer = getSigner(L3Provider, privateKey)
  const l2Deployer = getSigner(L2Provider, privateKey)

  //fetching chain id of parent chain
  const l2ChainId = (await L2Provider.getNetwork()).chainId
  const l3ChainId = (await L3Provider.getNetwork()).chainId

  let TOKEN_BRIDGE_CREATOR: string
  if (l2ChainId === 421614) {
    TOKEN_BRIDGE_CREATOR = TOKEN_BRIDGE_CREATOR_Arb_Sepolia
  } else {
    throw new Error(
      'The Base Chain you have provided is not supported, please put RPC for Arb Goerli, Arb Sepolia, or Arb One'
    )
  }

  const L1AtomicTokenBridgeCreator__factory = new ethers.Contract(
    TOKEN_BRIDGE_CREATOR,
    L1AtomicTokenBridgeCreator.abi,
    l2Deployer
  )
  const l1TokenBridgeCreator =
    L1AtomicTokenBridgeCreator__factory.connect(l2Deployer)

  const executorContractAddress =
    await l1TokenBridgeCreator.getCanonicalL2UpgradeExecutorAddress(l3ChainId)

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
