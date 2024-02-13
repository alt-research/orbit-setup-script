import L1AtomicTokenBridgeCreator from '@arbitrum/token-bridge-contracts/build/contracts/contracts/tokenbridge/ethereum/L1AtomicTokenBridgeCreator.sol/L1AtomicTokenBridgeCreator.json'
import { ethers } from 'ethers'

export async function getExecutorAddress(
  tokenBridgeCreator: string,
  inbox: string,
  l2Provider: ethers.providers.JsonRpcProvider,
  l3Provider: ethers.providers.JsonRpcProvider
) {
  const L1AtomicTokenBridgeCreator__factory = new ethers.Contract(
    tokenBridgeCreator,
    L1AtomicTokenBridgeCreator.abi,
    l2Provider
  )
  const l1TokenBridgeCreator =
    L1AtomicTokenBridgeCreator__factory.connect(l2Provider)

  //fetching L3 upgrade executor address
  const upgradeExecutorProxy = (
    await l1TokenBridgeCreator.inboxToL2Deployment(inbox)
  ).upgradeExecutor
  console.log('executor proxy: ', upgradeExecutorProxy)

  let upgradeExecutor = await l3Provider.getStorageAt(
    upgradeExecutorProxy,
    '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'
  )
  upgradeExecutor = upgradeExecutor.replace(/^(0x)0+((\w{4})+)$/, '$1$2')
  console.log('executor: ', upgradeExecutor)
  return upgradeExecutorProxy
}

// Run the script
const L2_RPC_URL =
  process.env.L2_RPC_URL || 'https://arbitrum-one.alt.technology'
const L3_RPC_URL = process.env.L3_RPC_URL || 'https://pmon.alt.technology'
const TOKEN_BRIDGE_CREATOR =
  process.env.TOKEN_BRIDGE_CREATOR ||
  '0x2f5624dc8800dfA0A82AC03509Ef8bb8E7Ac000e'
const INBOX = process.env.INBOX || '0x1285D6cE3604D341b29ccfF300d043af1CDb57e3'
const L2Provider = new ethers.providers.JsonRpcProvider(L2_RPC_URL)
const L3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)

getExecutorAddress(TOKEN_BRIDGE_CREATOR, INBOX, L2Provider, L3Provider).catch(
  error => {
    console.error(error)
    process.exit(1)
  }
)
