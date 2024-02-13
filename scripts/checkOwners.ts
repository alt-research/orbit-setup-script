import { abi as ArbOwner__abi } from '@arbitrum/nitro-contracts/build/contracts/src/precompiles/ArbOwner.sol/ArbOwner.json'
import { ethers } from 'ethers'

export async function main() {
  const privateKey = process.env.PRIVATE_KEY || ''
  const L3_RPC_URL = process.env.L3_RPC_URL || ''
  const L3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)

  // Creating the wallet and signer
  const l3signer = new ethers.Wallet(privateKey).connect(L3Provider)

  // Arb Owner precompile address
  const arbOwnerAddress = '0x000000000000000000000000000000000000006b'

  // Constructing call data for setting L1 basefee on L3
  const ArbOwner = new ethers.Contract(arbOwnerAddress, ArbOwner__abi, l3signer)
  const owners = await ArbOwner.getAllChainOwners()
  console.log('chain owners: ', owners)
}

// Run the script
main().catch(error => {
  console.error(error)
  process.exit(1)
})
