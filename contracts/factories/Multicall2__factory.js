'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Multicall2__factory = void 0
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require('ethers')
const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes[]',
        name: 'returnData',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    name: 'getBlockHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [
      {
        internalType: 'address',
        name: 'coinbase',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [
      {
        internalType: 'uint256',
        name: 'difficulty',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'gaslimit',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'getEthBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'requireSuccess',
        type: 'bool',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'requireSuccess',
        type: 'bool',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
const _bytecode =
  '0x608060405234801561001057600080fd5b506109cf806100206000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806372425d9d1161007157806372425d9d1461013a57806386d516e814610140578063a8b0574e14610146578063bce38bd714610154578063c3077fa914610174578063ee82ac5e1461018757600080fd5b80630f28c97d146100b9578063252dba42146100ce57806327e86d6e146100ef578063399542e9146100f757806342cbb15c146101195780634d2301cc1461011f575b600080fd5b425b6040519081526020015b60405180910390f35b6100e16100dc366004610699565b610199565b6040516100c592919061080b565b6100bb610320565b61010a6101053660046106d5565b610333565b6040516100c593929190610875565b436100bb565b6100bb61012d366004610677565b6001600160a01b03163190565b446100bb565b456100bb565b6040514181526020016100c5565b6101676101623660046106d5565b61034b565b6040516100c591906107f8565b61010a610182366004610699565b610504565b6100bb610195366004610729565b4090565b805143906060906001600160401b038111156101b7576101b7610983565b6040519080825280602002602001820160405280156101ea57816020015b60608152602001906001900390816101d55790505b50905060005b835181101561031a5760008085838151811061020e5761020e61096d565b6020026020010151600001516001600160a01b03168684815181106102355761023561096d565b60200260200101516020015160405161024e91906107dc565b6000604051808303816000865af19150503d806000811461028b576040519150601f19603f3d011682016040523d82523d6000602084013e610290565b606091505b5091509150816102e75760405162461bcd60e51b815260206004820181905260248201527f4d756c746963616c6c206167677265676174653a2063616c6c206661696c656460448201526064015b60405180910390fd5b808484815181106102fa576102fa61096d565b6020026020010181905250505080806103129061093c565b9150506101f0565b50915091565b600061032d6001436108f5565b40905090565b4380406060610342858561034b565b90509250925092565b606081516001600160401b0381111561036657610366610983565b6040519080825280602002602001820160405280156103ac57816020015b6040805180820190915260008152606060208201528152602001906001900390816103845790505b50905060005b82518110156104fd576000808483815181106103d0576103d061096d565b6020026020010151600001516001600160a01b03168584815181106103f7576103f761096d565b60200260200101516020015160405161041091906107dc565b6000604051808303816000865af19150503d806000811461044d576040519150601f19603f3d011682016040523d82523d6000602084013e610452565b606091505b509150915085156104b457816104b45760405162461bcd60e51b815260206004820152602160248201527f4d756c746963616c6c32206167677265676174653a2063616c6c206661696c656044820152601960fa1b60648201526084016102de565b60405180604001604052808315158152602001828152508484815181106104dd576104dd61096d565b6020026020010181905250505080806104f59061093c565b9150506103b2565b5092915050565b6000806060610514600185610333565b9196909550909350915050565b80356001600160a01b038116811461053857600080fd5b919050565b600082601f83011261054e57600080fd5b813560206001600160401b038083111561056a5761056a610983565b8260051b6105798382016108c5565b8481528381019087850183890186018a101561059457600080fd5b600093505b8684101561066a578035858111156105b057600080fd5b89016040601f19828d0381018213156105c857600080fd5b6105d061089d565b6105db8a8501610521565b815282840135898111156105ee57600080fd5b8085019450508d603f85011261060357600080fd5b898401358981111561061757610617610983565b6106278b84601f840116016108c5565b92508083528e8482870101111561063d57600080fd5b808486018c85013760009083018b0152808a01919091528552505060019390930192918501918501610599565b5098975050505050505050565b60006020828403121561068957600080fd5b61069282610521565b9392505050565b6000602082840312156106ab57600080fd5b81356001600160401b038111156106c157600080fd5b6106cd8482850161053d565b949350505050565b600080604083850312156106e857600080fd5b823580151581146106f857600080fd5b915060208301356001600160401b0381111561071357600080fd5b61071f8582860161053d565b9150509250929050565b60006020828403121561073b57600080fd5b5035919050565b600082825180855260208086019550808260051b84010181860160005b848110156107a357858303601f190189528151805115158452840151604085850181905261078f818601836107b0565b9a86019a945050509083019060010161075f565b5090979650505050505050565b600081518084526107c881602086016020860161090c565b601f01601f19169290920160200192915050565b600082516107ee81846020870161090c565b9190910192915050565b6020815260006106926020830184610742565b600060408201848352602060408185015281855180845260608601915060608160051b870101935082870160005b8281101561086757605f198887030184526108558683516107b0565b95509284019290840190600101610839565b509398975050505050505050565b8381528260208201526060604082015260006108946060830184610742565b95945050505050565b604080519081016001600160401b03811182821017156108bf576108bf610983565b60405290565b604051601f8201601f191681016001600160401b03811182821017156108ed576108ed610983565b604052919050565b60008282101561090757610907610957565b500390565b60005b8381101561092757818101518382015260200161090f565b83811115610936576000848401525b50505050565b600060001982141561095057610950610957565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220f9edd9af9c102e74f48834412b3b3ff219db58eac25d9f60dea9df4c947a977364736f6c63430008070033'
const isSuperArgs = xs => xs.length > 1
class Multicall2__factory extends ethers_1.ContractFactory {
  constructor(...args) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
    this.contractName = 'Multicall2'
  }
  deploy(overrides) {
    return super.deploy(overrides || {})
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {})
  }
  attach(address) {
    return super.attach(address)
  }
  connect(signer) {
    return super.connect(signer)
  }
  static createInterface() {
    return new ethers_1.utils.Interface(_abi)
  }
  static connect(address, signerOrProvider) {
    return new ethers_1.Contract(address, _abi, signerOrProvider)
  }
}
exports.Multicall2__factory = Multicall2__factory
Multicall2__factory.bytecode = _bytecode
Multicall2__factory.abi = _abi
