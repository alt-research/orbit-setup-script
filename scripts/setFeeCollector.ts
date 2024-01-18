import { ethers } from 'ethers'
import { abi as ArbOwner__abi } from '@arbitrum/nitro-contracts/build/contracts/src/precompiles/ArbOwner.sol/ArbOwner.json'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

dotenvConfig({ path: resolve(__dirname, '../.env') })

async function main() {
  // Read the environment variables
  const privateKey = process.env.PRIVATE_KEY
  const L3_RPC_URL = process.env.L3_RPC_URL
  const networkFeeReceiver = process.env.NetworkFeeReceiver
  console.log('Set fee collectionn to: ', networkFeeReceiver)
  if (!privateKey || !L3_RPC_URL || !networkFeeReceiver) {
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
