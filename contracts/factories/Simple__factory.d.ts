import { Signer, ContractFactory, Overrides } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import type { Simple, SimpleInterface } from '@arbitrum/sdk/dist/lib/abi/Simple'
declare type SimpleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>
export declare class Simple__factory extends ContractFactory {
  constructor(...args: SimpleConstructorParams)
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>
    }
  ): Promise<Simple>
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>
    }
  ): TransactionRequest
  attach(address: string): Simple
  connect(signer: Signer): Simple__factory
  static readonly contractName: 'Simple'
  readonly contractName: 'Simple'
  static readonly bytecode =
    '0x608060405234801561001057600080fd5b50610a6b806100206000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c806361bc221a1161006657806361bc221a146100e35780639ff5ccac1461010e578063b226a96414610116578063d09de08a1461011e578063ded5ecad1461012657600080fd5b806305795f73146100a35780630e8c389f146100ad57806344c25fba146100b55780635677c11e146100c85780635dfc2e4a146100ab575b600080fd5b6100ab610139565b005b6100ab61017b565b6100ab6100c3366004610873565b610272565b6100d0610651565b6040519081526020015b60405180910390f35b6000546100f6906001600160401b031681565b6040516001600160401b0390911681526020016100da565b6100ab6106b0565b6100ab61071d565b6100ab610748565b6100ab6101343660046108f5565b610787565b60405162461bcd60e51b8152602060048201526012602482015271534f4c49444954595f524556455254494e4760701b60448201526064015b60405180910390fd5b600080546001600160401b0316908061019383610944565b91906101000a8154816001600160401b0302191690836001600160401b03160217905550507f773c78bf96e65f61c1a2622b47d76e78bfe70dd59cf4f11470c4c121c315941333606e6001600160a01b031663de4ba2b36040518163ffffffff1660e01b815260040160206040518083038186803b15801561021457600080fd5b505afa158015610228573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024c919061096b565b604080516001600160a01b039384168152929091166020830152015b60405180910390a1565b85156103115784151560646001600160a01b03166308bd624c6040518163ffffffff1660e01b815260040160206040518083038186803b1580156102b557600080fd5b505afa1580156102c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102ed919061099b565b15151461030c5760405162461bcd60e51b8152600401610172906109b8565b6103a5565b84151560646001600160a01b031663175a260b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561034e57600080fd5b505afa158015610362573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610386919061099b565b1515146103a55760405162461bcd60e51b8152600401610172906109b8565b60405163ded5ecad60e01b815286151560048201528415156024820152309063ded5ecad9060440160006040518083038186803b1580156103e557600080fd5b505afa1580156103f9573d6000803e3d6000fd5b505060408051891515602482015286151560448083019190915282518083039091018152606490910182526020810180516001600160e01b031663ded5ecad60e01b17905290519092506000915030906104549084906109e3565b600060405180830381855af49150503d806000811461048f576040519150601f19603f3d011682016040523d82523d6000602084013e610494565b606091505b50509050806104dc5760405162461bcd60e51b81526020600482015260146024820152731111531151d0551157d0d0531317d1905253115160621b6044820152606401610172565b6040805189151560248201528515156044808301919091528251808303909101815260649091019091526020810180516001600160e01b031663ded5ecad60e01b1781528151919350600091829182305af290508061056f5760405162461bcd60e51b815260206004820152600f60248201526e10d0531310d3d11157d19052531151608a1b6044820152606401610172565b60408051891515602482015284151560448083019190915282518083039091018152606490910182526020810180516001600160e01b031663ded5ecad60e01b179052905190925030906105c49084906109e3565b6000604051808303816000865af19150503d8060008114610601576040519150601f19603f3d011682016040523d82523d6000602084013e610606565b606091505b505080915050806106475760405162461bcd60e51b815260206004820152600b60248201526a10d0531317d1905253115160aa1b6044820152606401610172565b5050505050505050565b600061065e600243610a1e565b4061066a600143610a1e565b4014156106ab5760405162461bcd60e51b815260206004820152600f60248201526e0a6829a8abe84989e8696be9082a69608b1b6044820152606401610172565b504390565b600080546001600160401b031690806106c883610944565b82546101009290920a6001600160401b03818102199093169183160217909155600054604051911681527fa45d7e79cb3c6044f30c8dd891e6571301d6b8b6618df519c987905ec70742e79150602001610268565b6040517f6f59c82101949290205a9ae9d0c657e6dae1a71c301ae76d385c2792294585fe90600090a1565b600080546001600160401b0316908061076083610944565b91906101000a8154816001600160401b0302191690836001600160401b0316021790555050565b81156108255780151560646001600160a01b03166308bd624c6040518163ffffffff1660e01b815260040160206040518083038186803b1580156107ca57600080fd5b505afa1580156107de573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610802919061099b565b1515146108215760405162461bcd60e51b8152600401610172906109b8565b5050565b80151560646001600160a01b031663175a260b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156107ca57600080fd5b801515811461087057600080fd5b50565b60008060008060008060c0878903121561088c57600080fd5b863561089781610862565b955060208701356108a781610862565b945060408701356108b781610862565b935060608701356108c781610862565b925060808701356108d781610862565b915060a08701356108e781610862565b809150509295509295509295565b6000806040838503121561090857600080fd5b823561091381610862565b9150602083013561092381610862565b809150509250929050565b634e487b7160e01b600052601160045260246000fd5b60006001600160401b03808316818114156109615761096161092e565b6001019392505050565b60006020828403121561097d57600080fd5b81516001600160a01b038116811461099457600080fd5b9392505050565b6000602082840312156109ad57600080fd5b815161099481610862565b60208082526011908201527015539156141150d5115117d49154d55315607a1b604082015260600190565b6000825160005b81811015610a0457602081860181015185830152016109ea565b81811115610a13576000828501525b509190910192915050565b600082821015610a3057610a3061092e565b50039056fea26469706673582212204884ab59ac5270eeaf4ade9ce9cf7d28b65efc012fa2d6c3799a881c1be64e5b64736f6c63430008090033'
  static readonly abi: (
    | {
        anonymous: boolean
        inputs: {
          indexed: boolean
          internalType: string
          name: string
          type: string
        }[]
        name: string
        type: string
        outputs?: undefined
        stateMutability?: undefined
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
  )[]
  static createInterface(): SimpleInterface
  static connect(address: string, signerOrProvider: Signer | Provider): Simple
}
export {}
