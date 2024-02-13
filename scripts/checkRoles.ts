import { ethers } from 'ethers'
import UpgradeExecutor from '@arbitrum/nitro-contracts/build/contracts/src/mocks/UpgradeExecutorMock.sol/UpgradeExecutorMock.json'
import { getSigner } from './erc20TokenBridgeDeployment'
import { getExecutorAddress } from './getExecutorAddress'

async function main() {
  // Read the environment variables
  const privateKey = process.env.PRIVATE_KEY
  const TOKEN_BRIDGE_CREATOR = process.env.TOKEN_BRIDGE_CREATOR || ''
  const L2_RPC_URL = process.env.L2_RPC_URL
  const L3_RPC_URL = process.env.L3_RPC_URL
  const OPERATOR = process.env.OPERATOR
  const INBOX = process.env.INBOX || ''
  if (!privateKey || !L3_RPC_URL || !OPERATOR) {
    throw new Error('Required environment variable not found')
  }

  // Generating providers from RPCs
  const L2Provider = new ethers.providers.JsonRpcProvider(L2_RPC_URL)
  const L3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)
  const l3Deployer = getSigner(L3Provider, privateKey)

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
  // const adminRole = await upgradeExecutor.ADMIN_ROLE()
  const executorRole = await upgradeExecutor.EXECUTOR_ROLE()

  const hasExecutorRole = await upgradeExecutor.hasRole(executorRole, OPERATOR)
  console.log('has executor role: ', hasExecutorRole)
}

// Run the script
main().catch(error => {
  console.error(error)
  process.exit(1)
})
