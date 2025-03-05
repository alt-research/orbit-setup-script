import { JsonRpcProvider } from '@ethersproject/providers'
import {
  L1Network,
  L2Network,
  addCustomNetwork,
  constants as arbitrumSdkConstants,
} from '@arbitrum/sdk'
import { IERC20Bridge__factory } from '@arbitrum/sdk/dist/lib/abi/factories/IERC20Bridge__factory'
import { RollupAdminLogic__factory } from '@arbitrum/sdk/dist/lib/abi/factories/RollupAdminLogic__factory'
import * as fs from 'fs'
import { constants } from 'ethers'
import { defineChain, createPublicClient, http, Address } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import {
  createRollupPrepareTransactionReceipt,
  createRollupFetchTransactionHash,
  createTokenBridgeEnoughCustomFeeTokenAllowance,
  createTokenBridgePrepareCustomFeeTokenApprovalTransactionRequest,
  createTokenBridgePrepareTransactionRequest,
  createTokenBridgePrepareTransactionReceipt,
  createTokenBridgePrepareSetWethGatewayTransactionRequest,
  createTokenBridgePrepareSetWethGatewayTransactionReceipt,
  registerCustomParentChain,
} from '@arbitrum/orbit-sdk'
import { sanitizePrivateKey } from '@arbitrum/orbit-sdk/utils'

import { L3Config } from './l3ConfigType'

import { arbitrum, arbitrumGoerli, arbitrumNova, arbitrumSepolia, holesky, sepolia, mainnet } from 'viem/chains';

function createPublicClientFromChainInfo({
  id,
  name,
  rpcUrl,
}: {
  id: number
  name: string
  rpcUrl: string
}) {
  const chain = defineChain({
    id: id,
    network: name,
    name: name,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: {
        http: [rpcUrl],
      },
      public: {
        http: [rpcUrl],
      },
    },
    testnet: true,
  })

  return createPublicClient({ chain, transport: http(rpcUrl, {timeout: 120_000}) })
}

export const TOKEN_BRIDGE_CREATOR_Arb_Sepolia =
  '0x56C486D3786fA26cc61473C499A36Eb9CC1FbD8E'

export const TOKEN_BRIDGE_CREATOR_Sepolia =
  '0x7edb2dfBeEf9417e0454A80c51EE0C034e45a570'

export const TOKEN_BRIDGE_CREATOR_Arb_One =
  '0x2f5624dc8800dfA0A82AC03509Ef8bb8E7Ac000e'

export const TOKEN_BRIDGE_CREATOR_Holesky =
  '0xac890ED9bC2494C053cE701F138958df95966d94'

export const TOKEN_BRIDGE_CREATOR_Ethereum =
  '0x60D9A46F24D5a35b95A78Dd3E793e55D94EE0660'

async function getNativeToken({
  rollup,
  provider,
}: {
  rollup: string
  provider: JsonRpcProvider
}): Promise<`0x${string}`> {
  const bridge = await RollupAdminLogic__factory.connect(
    rollup,
    provider
  ).bridge()

  try {
    return (await IERC20Bridge__factory.connect(
      bridge,
      provider
    ).nativeToken()) as `0x${string}`
  } catch (error) {
    return constants.AddressZero
  }
}

async function getChain(chainID: number) {
  switch (chainID) {
    case arbitrum.id:
      return arbitrum;
    case arbitrumGoerli.id:
      return arbitrumGoerli;
    case arbitrumNova.id:
      return arbitrumNova;
    case arbitrumSepolia.id:
      return arbitrumSepolia;
    case holesky.id:
      return holesky;
    case sepolia.id:
      return sepolia;
    case mainnet.id:
      return mainnet;
    default:
      throw new Error("Unsupported chainID");
  }
}

/**
 * Steps:
 * - read network info from local container and register networks
 * - deploy L1 bridge creator and set templates
 * - do single TX deployment of token bridge
 * - populate network objects with new addresses and return it
 *
 * @param l1Deployer
 * @param l2Deployer
 * @param l1Url
 * @param l2Url
 * @returns
 */
export const createNewTokenBridge = async (
  baseChainRpc: string,
  baseChainDeployerKey: string,
  childChainRpc: string,
  rollupAddress: string,
  deployedAtBlockNumber: bigint,
  baseChainId: number,
  tokenBridgeCreator: string
) => {
  try {
    getChain(baseChainId)
  }
  catch (e) {
    registerCustomParentChain({
      id: baseChainId,
      name: `My Chain`,
      network: `my-chain`,
      nativeCurrency: { 
        name: 'Ether', 
        symbol: 'ETH', 
        decimals: 18
      },
      rpcUrls: {
        public: { 
          http: [baseChainRpc] },
          default: { http: [baseChainRpc] 
        },
      },
      // the following contract addresses have to be provided
      contracts: {
        rollupCreator: { address: '0x2000000000000000000000000000000000000000' },
        tokenBridgeCreator: { address: tokenBridgeCreator as `0x${string}` },
      },
    })
  }

  const l1Provider = new JsonRpcProvider(baseChainRpc)
  const l1NetworkInfo = await l1Provider.getNetwork()

  const l2Provider = new JsonRpcProvider(childChainRpc)
  const l2NetworkInfo = await l2Provider.getNetwork()

  const deployer = privateKeyToAccount(sanitizePrivateKey(baseChainDeployerKey))
  const rollup = RollupAdminLogic__factory.connect(rollupAddress, l1Provider)

  const parentChainPublicClient = createPublicClientFromChainInfo({
    id: l1NetworkInfo.chainId,
    name: l1NetworkInfo.name,
    rpcUrl: baseChainRpc,
  })

  const orbitChainPublicClient = createPublicClientFromChainInfo({
    id: l2NetworkInfo.chainId,
    name: l2NetworkInfo.name,
    rpcUrl: childChainRpc,
  })

  const nativeToken = await getNativeToken({
    rollup: rollupAddress,
    provider: l1Provider,
  })

  // custom gas token
  if (nativeToken !== constants.AddressZero) {
    console.log(
      `Detected custom gas token chain with native token ${nativeToken}`
    )

    const allowanceParams = {
      nativeToken,
      owner: deployer.address,
      publicClient: parentChainPublicClient,
    }

    const enoughCustomFeeTokenAllowance =
      await createTokenBridgeEnoughCustomFeeTokenAllowance(allowanceParams)

    if (!enoughCustomFeeTokenAllowance) {
      console.log('Not enough allowance for custom gas token')
      const approvalTxRequest =
        await createTokenBridgePrepareCustomFeeTokenApprovalTransactionRequest(
          allowanceParams
        )

      console.log(`Sending tx to approve custom gas token`)
      // sign and send the transaction
      const approvalTxHash = await parentChainPublicClient.sendRawTransaction({
        serializedTransaction: await deployer.signTransaction(
          approvalTxRequest
        ),
      })

      // get the transaction receipt after waiting for the transaction to complete
      const approvalTxReceipt =
        await parentChainPublicClient.waitForTransactionReceipt({
          hash: approvalTxHash,
        })

      console.log(
        `Done! Custom gas token approved in tx ${approvalTxReceipt.transactionHash}`
      )
    }
  }

  const txRequest = await createTokenBridgePrepareTransactionRequest({
    params: {
      rollup: rollupAddress as Address,
      rollupOwner: deployer.address,
    },
    parentChainPublicClient,
    orbitChainPublicClient,
    account: deployer.address,
  })

  // submit tx
  const txHash = await parentChainPublicClient.sendRawTransaction({
    serializedTransaction: await deployer.signTransaction(txRequest),
  })

  // get the transaction receipt after waiting for the transaction to complete
  const txReceipt = createTokenBridgePrepareTransactionReceipt(
    await parentChainPublicClient.waitForTransactionReceipt({ hash: txHash })
  )
  console.log(
    `Token bridge deployed in transaction ${txReceipt.transactionHash}`
  )

  console.log(`Waiting for retryables...`)
  // wait for retryables to execute
  const retryables = await txReceipt.waitForRetryables({
    orbitPublicClient: orbitChainPublicClient,
  })
  console.log(`Retryable #1: ${retryables[0].transactionHash}`)
  console.log(`Retryable #2: ${retryables[1].transactionHash}`)
  console.log(`Done!`)

  // set weth gateway (only for eth-based chains)
  if (nativeToken === constants.AddressZero) {
    console.log(`Setting weth gateway...`)

    const setWethGatewayTxRequest =
      await createTokenBridgePrepareSetWethGatewayTransactionRequest({
        rollup: rollupAddress as Address,
        rollupDeploymentBlockNumber: deployedAtBlockNumber,
        parentChainPublicClient,
        orbitChainPublicClient,
        account: deployer.address,
        retryableGasOverrides: {
          gasLimit: {
            percentIncrease: 200n,
          },
        },
      })

    // sign and send the transaction
    const setWethGatewayTxHash =
      await parentChainPublicClient.sendRawTransaction({
        serializedTransaction: await deployer.signTransaction(
          setWethGatewayTxRequest
        ),
      })

    // get the transaction receipt after waiting for the transaction to complete
    const setWethGatewayTxReceipt =
      createTokenBridgePrepareSetWethGatewayTransactionReceipt(
        await parentChainPublicClient.waitForTransactionReceipt({
          hash: setWethGatewayTxHash,
        })
      )

    console.log(
      `Weth gateway set in tx ${setWethGatewayTxReceipt.transactionHash}`
    )

    // Wait for retryables to execute
    console.log(`Waiting for retryables...`)
    const orbitChainSetWethGatewayRetryableReceipt =
      await setWethGatewayTxReceipt.waitForRetryables({
        orbitPublicClient: orbitChainPublicClient,
      })
    console.log(
      `Retryable #1: ${orbitChainSetWethGatewayRetryableReceipt[0].transactionHash}`
    )
    if (orbitChainSetWethGatewayRetryableReceipt[0].status !== 'success') {
      console.error(
        `Retryable status is not success: ${orbitChainSetWethGatewayRetryableReceipt[0].status}. The process will continue, but you'll have to register the Weth gateway later again.`
      )
    }
    console.log(`Done!`)
  }

  const { parentChainContracts, orbitChainContracts } =
    await txReceipt.getTokenBridgeContracts({
      parentChainPublicClient,
    })

  // fetch core contracts
  console.log(`Fetching core contracts...`);
  const createRollupTxHash = await createRollupFetchTransactionHash({
    rollup: rollupAddress as Address,
    publicClient: parentChainPublicClient,
    fromBlock: deployedAtBlockNumber,
  })

  const coreContracts = createRollupPrepareTransactionReceipt(
    await parentChainPublicClient.getTransactionReceipt({
      hash: createRollupTxHash,
    })
  ).getCoreContracts()

  const l1Network: L1Network = {
    blockTime: 10,
    chainID: l1NetworkInfo.chainId,
    explorerUrl: '',
    isCustom: true,
    name: l1NetworkInfo.name,
    partnerChainIDs: [l2NetworkInfo.chainId],
    isArbitrum: false,
  }

  const l2Network: L2Network = {
    chainID: l2NetworkInfo.chainId,
    confirmPeriodBlocks: (await rollup.confirmPeriodBlocks()).toNumber(),
    ethBridge: {
      bridge: coreContracts.bridge,
      inbox: coreContracts.inbox,
      outbox: coreContracts.outbox,
      rollup: rollup.address,
      sequencerInbox: coreContracts.sequencerInbox,
    },
    explorerUrl: '',
    isArbitrum: true,
    isCustom: true,
    name: 'OrbitChain',
    partnerChainID: l1NetworkInfo.chainId,
    partnerChainIDs: [],
    retryableLifetimeSeconds: 7 * 24 * 60 * 60,
    nitroGenesisBlock: 0,
    nitroGenesisL1Block: 0,
    depositTimeout: 900000,
    tokenBridge: {
      l1CustomGateway: parentChainContracts.customGateway,
      l1ERC20Gateway: parentChainContracts.standardGateway,
      l1GatewayRouter: parentChainContracts.router,
      l1MultiCall: parentChainContracts.multicall,
      // todo: fix
      l1ProxyAdmin: constants.AddressZero,
      l1Weth: parentChainContracts.weth,
      l1WethGateway: parentChainContracts.wethGateway,

      l2CustomGateway: orbitChainContracts.customGateway,
      l2ERC20Gateway: orbitChainContracts.standardGateway,
      l2GatewayRouter: orbitChainContracts.router,
      l2Multicall: orbitChainContracts.multicall,
      l2ProxyAdmin: orbitChainContracts.proxyAdmin,
      l2Weth: orbitChainContracts.weth,
      l2WethGateway: orbitChainContracts.wethGateway,
    },
    blockTime: arbitrumSdkConstants.ARB_MINIMUM_BLOCK_TIME_IN_SECONDS,
  }

  return {
    l1Network,
    l2Network,
  }
}

export const createERC20Bridge = async (
  baseChainRpc: string,
  baseChainDeployerKey: string,
  childChainRpc: string,
  rollupAddress: string,
  baseChainId: number,
  tokenBridgeCreator: string
) => {
  console.log('Creating token bridge for rollup', rollupAddress)

  // Read the JSON configuration
  const configRaw = fs.readFileSync(
    './config/orbitSetupScriptConfig.json',
    'utf-8'
  )
  const config: L3Config = JSON.parse(configRaw)

  const { l1Network, l2Network } = await createNewTokenBridge(
    baseChainRpc,
    baseChainDeployerKey,
    childChainRpc,
    rollupAddress,
    BigInt(config.deployedAtBlockNumber),
    baseChainId,
    tokenBridgeCreator
  )
  const NETWORK_FILE = 'network.json'
  fs.writeFileSync(
    NETWORK_FILE,
    JSON.stringify({ l1Network, l2Network }, null, 2)
  )
  console.log(NETWORK_FILE + ' updated')

  const outputInfo = {
    chainInfo: {
      minL2BaseFee: config.minL2BaseFee,
      networkFeeReceiver: config.networkFeeReceiver,
      infrastructureFeeCollector: config.infrastructureFeeCollector,
      batchPoster: config.batchPoster,
      staker: config.stakers[0],
      chainOwner: config.chainOwner,
      chainName: config.chainName,
      chainId: config.chainId,
      parentChainId: config.parentChainId,
      rpcUrl: 'http://localhost:8449',
      explorerUrl: 'http://localhost',
      nativeToken: config.nativeToken,
    },
    coreContracts: {
      rollup: config.rollup,
      inbox: config.inbox,
      outbox: config.outbox,
      adminProxy: config.adminProxy,
      sequencerInbox: config.sequencerInbox,
      bridge: config.bridge,
      utils: config.utils,
      validatorWalletCreator: config.validatorWalletCreator,
    },

    tokenBridgeContracts: {
      l2Contracts: {
        customGateway: l2Network.tokenBridge.l1CustomGateway,
        multicall: l2Network.tokenBridge.l1MultiCall,
        proxyAdmin: l2Network.tokenBridge.l1ProxyAdmin,
        router: l2Network.tokenBridge.l1GatewayRouter,
        standardGateway: l2Network.tokenBridge.l1ERC20Gateway,
        weth: l2Network.tokenBridge.l1Weth,
        wethGateway: l2Network.tokenBridge.l1WethGateway,
      },
      l3Contracts: {
        customGateway: l2Network.tokenBridge.l2CustomGateway,
        multicall: l2Network.tokenBridge.l2Multicall,
        proxyAdmin: l2Network.tokenBridge.l2ProxyAdmin,
        router: l2Network.tokenBridge.l2GatewayRouter,
        standardGateway: l2Network.tokenBridge.l2ERC20Gateway,
        weth: l2Network.tokenBridge.l2Weth,
        wethGateway: l2Network.tokenBridge.l2WethGateway,
      },
    },
  }
  fs.writeFileSync('./output/outputInfo.json', JSON.stringify(outputInfo, null, 2))

  console.log('Done!')
}
