import { getExecutorAddress } from './getExecutorAddressImpl'
import { ethers } from 'ethers'

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

async function main() {
  return await getExecutorAddress(TOKEN_BRIDGE_CREATOR, INBOX, L2Provider, L3Provider)
}

// Run the script
main().catch(error => {
  console.error(error)
  process.exit(1)
})
