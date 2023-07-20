import { Signer, ContractFactory, Overrides } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import type {
  RollupMock,
  RollupMockInterface,
} from '@arbitrum/sdk/dist/lib/abi/RollupMock'
declare type RollupMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>
export declare class RollupMock__factory extends ContractFactory {
  constructor(...args: RollupMockConstructorParams)
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>
    }
  ): Promise<RollupMock>
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>
    }
  ): TransactionRequest
  attach(address: string): RollupMock
  connect(signer: Signer): RollupMock__factory
  static readonly contractName: 'RollupMock'
  readonly contractName: 'RollupMock'
  static readonly bytecode =
    '0x608060405234801561001057600080fd5b5061010b806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806361373919146037578063edfd03ed14604f575b600080fd5b603d6060565b60405190815260200160405180910390f35b605e605a36600460bd565b6091565b005b6040516000907f1c09fbbf7cfd024f5e4e5472dd87afd5d67ee5db6a0ca715bf508d96abce309f908290a150600090565b6040517fb774f793432a37585a7638b9afe49e91c478887a2c0fef32877508bf2f76429d90600090a150565b60006020828403121560ce57600080fd5b503591905056fea2646970667358221220fc39311811243901a9c107ebde51901d4627af7b8772f5f283e44615c1991ed364736f6c63430008090033'
  static readonly abi: (
    | {
        anonymous: boolean
        inputs: never[]
        name: string
        type: string
        outputs?: undefined
        stateMutability?: undefined
      }
    | {
        inputs: {
          internalType: string
          name: string
          type: string
        }[]
        name: string
        outputs: never[]
        stateMutability: string
        type: string
        anonymous?: undefined
      }
    | {
        inputs: never[]
        name: string
        outputs: {
          internalType: string
          name: string
          type: string
        }[]
        stateMutability: string
        type: string
        anonymous?: undefined
      }
  )[]
  static createInterface(): RollupMockInterface
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RollupMock
}
export {}
