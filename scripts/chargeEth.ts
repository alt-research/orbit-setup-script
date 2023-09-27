import { ethers } from 'ethers'
import fs from 'fs'

// Delay function
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Read the JSON configuration
const configRaw = fs.readFileSync(
  './config/orbitSetupScriptConfig.json',
  'utf-8'
)
const config = JSON.parse(configRaw)
const ERC20BridgeAddress = config.bridge
const ERC20InboxAddress = config.inbox

const erc20BridgeInterface = new ethers.utils.Interface([
  'function nativeToken() public view returns (address)',
])
const erc20InboxInterface = new ethers.utils.Interface([
  'function depositERC20(uint256) public returns (uint256)',
])

async function main() {
  const privateKey = process.env.PRIVATE_KEY
  const L2_RPC_URL = process.env.L2_RPC_URL
  const L3_RPC_URL = process.env.L3_RPC_URL
  const amount = process.env.AMOUNT

  if (!privateKey || !L2_RPC_URL || !L3_RPC_URL || !amount) {
    throw new Error('Required environment variable not found')
  }

  const l2Provider = new ethers.providers.JsonRpcProvider(L2_RPC_URL)
  const l3Provider = new ethers.providers.JsonRpcProvider(L3_RPC_URL)
  const l2Signer = new ethers.Wallet(privateKey).connect(l2Provider)

  const erc20Bridge = new ethers.Contract(
    ERC20BridgeAddress,
    erc20BridgeInterface,
    l2Signer
  )
  const erc20Inbox = new ethers.Contract(
    ERC20InboxAddress,
    erc20InboxInterface,
    l2Signer
  )

  const nativeToken = await erc20Bridge.nativeToken()
  let tx
  if (nativeToken === ethers.constants.AddressZero) {
    tx = await l2Signer.sendTransaction({
      to: ERC20InboxAddress,
      value: ethers.utils.parseEther(amount),
    })
  } else {
    tx = await erc20Inbox.depositERC20(ethers.utils.parseEther(amount))
  }

  console.log('Transaction hash on parent chain: ', tx.hash)
  await tx.wait()
  console.log('Transaction has been mined')

  const oldBalance = await l3Provider.getBalance(config.chainOwner)
  while (true) {
    const newBalance = await l3Provider.getBalance(config.chainOwner)
    if (newBalance.gt(oldBalance)) {
      console.log(
        `LFG! 🚀 Balance of your account on Orbit chain increased by ${amount} Ether.`
      )
      break
    }
    console.log(
      'Balance not changed yet. Waiting for another 30 seconds to receive the funds on the Orbit chain ⏰⏰⏰⏰⏰⏰'
    )
    await delay(30 * 1000)
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
