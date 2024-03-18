import { ethers } from 'ethers'
import L1AtomicTokenBridgeCreator from '@arbitrum/token-bridge-contracts/build/contracts/contracts/tokenbridge/ethereum/L1AtomicTokenBridgeCreator.sol/L1AtomicTokenBridgeCreator.json'
import { getSigner } from './erc20TokenBridgeDeployment'
import fs from 'fs'
import {
  TOKEN_BRIDGE_CREATOR_Arb_Sepolia,
  TOKEN_BRIDGE_CREATOR_Sepolia,
  TOKEN_BRIDGE_CREATOR_Arb_One,
  TOKEN_BRIDGE_CREATOR_Holesky,
} from './createTokenBridge'

async function main() {
  const L2_RPC_URL = process.env.L2_RPC_URL
  const PRIVATE_KEY = process.env.PRIVATE_KEY

  const l2Provider = new ethers.providers.JsonRpcProvider(L2_RPC_URL)
  //Generating l2 and l3 deployer signers from privatekey and providers
  const l2Deployer = getSigner(l2Provider, PRIVATE_KEY)
  //fetching chain id of parent chain
  const l2ChainId = (await l2Provider.getNetwork()).chainId
  const addInfo = new Map<string, string>()
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
  const L1AtomicTokenBridgeCreator__factory = new ethers.Contract(
    TOKEN_BRIDGE_CREATOR,
    L1AtomicTokenBridgeCreator.abi,
    l2Deployer
  )
  const l1TokenBridgeCreator =
    L1AtomicTokenBridgeCreator__factory.connect(l2Deployer)
  // fetching retryable sender address
  const retryableSenderAddress = await l1TokenBridgeCreator.retryableSender()
  addInfo.set('Address', retryableSenderAddress)
  console.log(addInfo)
  const info = {
    Address: retryableSenderAddress,
  }
  const addressInfo = JSON.stringify(info)
  fs.writeFileSync('./output/retryableAddress.json', addressInfo)
}

// Run the script
main().catch(error => {
  console.error(error)
  process.exit(1)
})
