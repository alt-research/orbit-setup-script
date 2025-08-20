import { getExecutorAddress } from './getExecutorAddressImpl'
import { ethers } from 'ethers'

// Run the script
const L2_RPC_URL = process.env.L2_RPC_URL || 'https://sepolia.alt.technology'
const L3_RPC_URL =
  process.env.L3_RPC_URL || 'https://kartel-testnet.alt.technology'
const TOKEN_BRIDGE_CREATOR =
  process.env.TOKEN_BRIDGE_CREATOR ||
  '0x7edb2dfBeEf9417e0454A80c51EE0C034e45a570'
const INBOX = process.env.INBOX || '0xb28Df9651f90Dbc0E4C323693a9526A1Ea451b3c'
const L2Provider = new ethers.providers.JsonRpcProvider(L2_RPC_URL)
const L3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)

async function main() {
  return await getExecutorAddress(
    TOKEN_BRIDGE_CREATOR,
    INBOX,
    L2Provider,
    L3Provider
  )
}

// Run the script
main().catch(error => {
  console.error(error)
  process.exit(1)
})
