import { ethers } from 'ethers'
import { abi as ArbOwner__abi } from '@arbitrum/nitro-contracts/build/contracts/src/precompiles/ArbOwner.sol/ArbOwner.json'

async function main() {
  // Read the environment variables
  const privateKey = ''
  const L3_RPC_URL = 'http://localhost:8449'
  const networkFeeReceiver = ''
  if (!privateKey || !L3_RPC_URL) {
    throw new Error('Required environment variable not found')
  }

  // ArbOwner precompile setup
  const arbOwnerABI = ArbOwner__abi

  // Generating providers from RPCs
  const L3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)
  const l3signer = new ethers.Wallet(privateKey).connect(L3Provider)

  // Arb Owner precompile address
  const arbOwnerAddress = '0x0000000000000000000000000000000000000070'

  const ArbOwner = new ethers.Contract(arbOwnerAddress, arbOwnerABI, l3signer)
  // Set the network fee receiver
  const tx = await ArbOwner.setNetworkFeeAccount(networkFeeReceiver)
  // Wait for the transaction to be mined
  const recepit = await tx.wait()
  console.log(
    `network fee receiver is set on the block number ${await recepit.blockNumber} on the Orbit chain`
  )
}

// Run the script
main().catch(error => {
  console.error(error)
  process.exit(1)
})
