import L1AtomicTokenBridgeCreator from '@arbitrum/token-bridge-contracts/build/contracts/contracts/tokenbridge/ethereum/L1AtomicTokenBridgeCreator.sol/L1AtomicTokenBridgeCreator.json'
import { ethers } from 'ethers'

export async function getExecutorAddress(
  tokenBridgeCreator: string,
  inbox: string,
  l2Provider: ethers.providers.JsonRpcProvider,
  l3Provider: ethers.providers.JsonRpcProvider
) {
  // Muster is on older contracts version, cannot use the conventional way to get the UpgradeExecutor
  if (inbox == "0x18BB8310E3a3DF4EFcCb6B3E9AeCB8bE6d4af07f") {
    const upgradeExecutorProxy = "0x302210D41e5AEf43DB392FAD8382440f33cA0440"
    console.log('executor proxy:', upgradeExecutorProxy)
    return upgradeExecutorProxy
  } else {
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
    console.log('executor proxy:', upgradeExecutorProxy)

    let upgradeExecutor = await l3Provider.getStorageAt(
      upgradeExecutorProxy,
      '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'
    )
    upgradeExecutor = upgradeExecutor.replace(/^(0x)0+((\w{4})+)$/, '$1$2')
    console.log('executor:', upgradeExecutor)
    return upgradeExecutorProxy
  }
}
