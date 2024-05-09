import { ethers } from 'ethers'

const privateKey = process.env.PRIVATE_KEY || ''
const to = process.env.TO || ''
const amount = process.env.AMOUNT || ''
const rpc = process.env.PRC || ''

const provider = new ethers.providers.JsonRpcProvider(rpc)
const signer = new ethers.Wallet(privateKey).connect(provider)

async function main() {
  const tx = await signer.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(amount),
  })
  console.log(`Transaction hash on target chain: ${tx.hash}`)
  const start = new Date()
  const receipt = await tx.wait()
  console.log(
    `Transaction was mined in block ${receipt.blockNumber} on parent chain`
  )
  const end = new Date()
  const span = end.getTime() - start.getTime()
  console.log('Time span: ', span)
}

// Run the script
main().catch(error => {
  console.error(error)
  process.exit(1)
})
