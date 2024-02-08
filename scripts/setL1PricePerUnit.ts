import { abi as ArbOwner__abi } from '@arbitrum/nitro-contracts/build/contracts/src/precompiles/ArbOwner.sol/ArbOwner.json'
import { ethers } from 'ethers'

export async function main() {
  const privateKey = process.env.PRIVATE_KEY || ''
  const L3_RPC_URL = process.env.L3_RPC_URL
  const L1_PRICE_PER_UNIT = process.env.L1_PRICE_PER_UNIT
  // Generating providers from RPCs
  const L3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)

  // Creating the wallet and signer
  const l3signer = new ethers.Wallet(privateKey).connect(L3Provider)

  // ArbOwner precompile setup
  const arbOwnerABI = ArbOwner__abi

  // Arb Owner precompile address
  const arbOwnerAddress = '0x0000000000000000000000000000000000000070'
  const ArbOwner = new ethers.Contract(arbOwnerAddress, arbOwnerABI, l3signer)

  // Call the isChainOwner function and check the response
  const isSignerChainOwner = await ArbOwner.isChainOwner(l3signer.address)
  if (!isSignerChainOwner) {
    throw new Error('The address you have provided is not the chain owner')
  }

  // Setting L1 basefee on L3
  console.log(`Setting L1 base fee estimate on L3 to ${L1_PRICE_PER_UNIT}`)
  const tx1 = await ArbOwner.setL1PricePerUnit(L1_PRICE_PER_UNIT)

  // Wait for the transaction to be mined
  const receipt1 = await tx1.wait()
  console.log(
    `L1 base fee estimate is set on the block number ${await receipt1.blockNumber} on the Orbit chain`
  )

  // Check the status of the transaction: 1 is successful, 0 is failure
  if (receipt1.status === 0) {
    throw new Error('Base Fee Setting failed')
  }

  console.log('All things done! Enjoy your Orbit chain. LFG 🚀🚀🚀🚀')
}

// Run the script
main().catch(error => {
  console.error(error)
  process.exit(1)
})
