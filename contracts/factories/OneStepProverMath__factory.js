'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.OneStepProverMath__factory = void 0
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
            internalType: 'uint256',
            name: 'maxInboxMessagesRead',
            type: 'uint256',
          },
          {
            internalType: 'contract IBridge',
            name: 'bridge',
            type: 'address',
          },
        ],
        internalType: 'struct ExecutionContext',
        name: '',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum MachineStatus',
            name: 'status',
            type: 'uint8',
          },
          {
            components: [
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'enum ValueType',
                        name: 'valueType',
                        type: 'uint8',
                      },
                      {
                        internalType: 'uint256',
                        name: 'contents',
                        type: 'uint256',
                      },
                    ],
                    internalType: 'struct Value[]',
                    name: 'inner',
                    type: 'tuple[]',
                  },
                ],
                internalType: 'struct ValueArray',
                name: 'proved',
                type: 'tuple',
              },
              {
                internalType: 'bytes32',
                name: 'remainingHash',
                type: 'bytes32',
              },
            ],
            internalType: 'struct ValueStack',
            name: 'valueStack',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'enum ValueType',
                        name: 'valueType',
                        type: 'uint8',
                      },
                      {
                        internalType: 'uint256',
                        name: 'contents',
                        type: 'uint256',
                      },
                    ],
                    internalType: 'struct Value[]',
                    name: 'inner',
                    type: 'tuple[]',
                  },
                ],
                internalType: 'struct ValueArray',
                name: 'proved',
                type: 'tuple',
              },
              {
                internalType: 'bytes32',
                name: 'remainingHash',
                type: 'bytes32',
              },
            ],
            internalType: 'struct ValueStack',
            name: 'internalStack',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'enum ValueType',
                        name: 'valueType',
                        type: 'uint8',
                      },
                      {
                        internalType: 'uint256',
                        name: 'contents',
                        type: 'uint256',
                      },
                    ],
                    internalType: 'struct Value',
                    name: 'returnPc',
                    type: 'tuple',
                  },
                  {
                    internalType: 'bytes32',
                    name: 'localsMerkleRoot',
                    type: 'bytes32',
                  },
                  {
                    internalType: 'uint32',
                    name: 'callerModule',
                    type: 'uint32',
                  },
                  {
                    internalType: 'uint32',
                    name: 'callerModuleInternals',
                    type: 'uint32',
                  },
                ],
                internalType: 'struct StackFrame[]',
                name: 'proved',
                type: 'tuple[]',
              },
              {
                internalType: 'bytes32',
                name: 'remainingHash',
                type: 'bytes32',
              },
            ],
            internalType: 'struct StackFrameWindow',
            name: 'frameStack',
            type: 'tuple',
          },
          {
            internalType: 'bytes32',
            name: 'globalStateHash',
            type: 'bytes32',
          },
          {
            internalType: 'uint32',
            name: 'moduleIdx',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'functionIdx',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'functionPc',
            type: 'uint32',
          },
          {
            internalType: 'bytes32',
            name: 'modulesRoot',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Machine',
        name: 'startMach',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'globalsMerkleRoot',
            type: 'bytes32',
          },
          {
            components: [
              {
                internalType: 'uint64',
                name: 'size',
                type: 'uint64',
              },
              {
                internalType: 'uint64',
                name: 'maxSize',
                type: 'uint64',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
            ],
            internalType: 'struct ModuleMemory',
            name: 'moduleMemory',
            type: 'tuple',
          },
          {
            internalType: 'bytes32',
            name: 'tablesMerkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'functionsMerkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'uint32',
            name: 'internalsOffset',
            type: 'uint32',
          },
        ],
        internalType: 'struct Module',
        name: 'startMod',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint16',
            name: 'opcode',
            type: 'uint16',
          },
          {
            internalType: 'uint256',
            name: 'argumentData',
            type: 'uint256',
          },
        ],
        internalType: 'struct Instruction',
        name: 'inst',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'proof',
        type: 'bytes',
      },
    ],
    name: 'executeOneStep',
    outputs: [
      {
        components: [
          {
            internalType: 'enum MachineStatus',
            name: 'status',
            type: 'uint8',
          },
          {
            components: [
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'enum ValueType',
                        name: 'valueType',
                        type: 'uint8',
                      },
                      {
                        internalType: 'uint256',
                        name: 'contents',
                        type: 'uint256',
                      },
                    ],
                    internalType: 'struct Value[]',
                    name: 'inner',
                    type: 'tuple[]',
                  },
                ],
                internalType: 'struct ValueArray',
                name: 'proved',
                type: 'tuple',
              },
              {
                internalType: 'bytes32',
                name: 'remainingHash',
                type: 'bytes32',
              },
            ],
            internalType: 'struct ValueStack',
            name: 'valueStack',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'enum ValueType',
                        name: 'valueType',
                        type: 'uint8',
                      },
                      {
                        internalType: 'uint256',
                        name: 'contents',
                        type: 'uint256',
                      },
                    ],
                    internalType: 'struct Value[]',
                    name: 'inner',
                    type: 'tuple[]',
                  },
                ],
                internalType: 'struct ValueArray',
                name: 'proved',
                type: 'tuple',
              },
              {
                internalType: 'bytes32',
                name: 'remainingHash',
                type: 'bytes32',
              },
            ],
            internalType: 'struct ValueStack',
            name: 'internalStack',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'enum ValueType',
                        name: 'valueType',
                        type: 'uint8',
                      },
                      {
                        internalType: 'uint256',
                        name: 'contents',
                        type: 'uint256',
                      },
                    ],
                    internalType: 'struct Value',
                    name: 'returnPc',
                    type: 'tuple',
                  },
                  {
                    internalType: 'bytes32',
                    name: 'localsMerkleRoot',
                    type: 'bytes32',
                  },
                  {
                    internalType: 'uint32',
                    name: 'callerModule',
                    type: 'uint32',
                  },
                  {
                    internalType: 'uint32',
                    name: 'callerModuleInternals',
                    type: 'uint32',
                  },
                ],
                internalType: 'struct StackFrame[]',
                name: 'proved',
                type: 'tuple[]',
              },
              {
                internalType: 'bytes32',
                name: 'remainingHash',
                type: 'bytes32',
              },
            ],
            internalType: 'struct StackFrameWindow',
            name: 'frameStack',
            type: 'tuple',
          },
          {
            internalType: 'bytes32',
            name: 'globalStateHash',
            type: 'bytes32',
          },
          {
            internalType: 'uint32',
            name: 'moduleIdx',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'functionIdx',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'functionPc',
            type: 'uint32',
          },
          {
            internalType: 'bytes32',
            name: 'modulesRoot',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Machine',
        name: 'mach',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'globalsMerkleRoot',
            type: 'bytes32',
          },
          {
            components: [
              {
                internalType: 'uint64',
                name: 'size',
                type: 'uint64',
              },
              {
                internalType: 'uint64',
                name: 'maxSize',
                type: 'uint64',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
            ],
            internalType: 'struct ModuleMemory',
            name: 'moduleMemory',
            type: 'tuple',
          },
          {
            internalType: 'bytes32',
            name: 'tablesMerkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'functionsMerkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'uint32',
            name: 'internalsOffset',
            type: 'uint32',
          },
        ],
        internalType: 'struct Module',
        name: 'mod',
        type: 'tuple',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
]
const _bytecode =
  '0x608060405234801561001057600080fd5b50612364806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063da78e7d114610030575b600080fd5b61004361003e3660046118ae565b61005a565b604051610051929190611ac0565b60405180910390f35b6100626117e3565b6040805160a0810182526000808252825160608082018552828252602080830184905282860184905284019190915292820181905291810182905260808101919091526100ae87611f63565b91506100bf36879003870187612066565b905060006100d060208701876120fd565b905061188c61ffff8216604514806100ec575061ffff82166050145b156100fa57506103096102eb565b604661ffff831610801590610122575061011660096046612137565b61ffff168261ffff1611155b1561013057506104226102eb565b606761ffff831610801590610158575061014c60026067612137565b61ffff168261ffff1611155b1561016657506105056102eb565b606a61ffff8316108015906101805750607861ffff831611155b1561018e575061056d6102eb565b605161ffff8316108015906101b657506101aa60096051612137565b61ffff168261ffff1611155b156101c4575061075a6102eb565b607961ffff8316108015906101ec57506101e060026079612137565b61ffff168261ffff1611155b156101fa57506107bf6102eb565b607c61ffff8316108015906102145750608a61ffff831611155b1561022257506108126102eb565b61ffff821660a7141561023857506109cd6102eb565b61ffff821660ac148061024f575061ffff821660ad145b1561025d57506109ee6102eb565b60c061ffff831610801590610277575060c461ffff831611155b156102855750610a426102eb565b60bc61ffff83161080159061029f575060bf61ffff831611155b156102ad5750610c576102eb565b60405162461bcd60e51b815260206004820152600e60248201526d494e56414c49445f4f50434f444560901b60448201526064015b60405180910390fd5b6102fc84848989898663ffffffff16565b5050965096945050505050565b60006103188660200151610de2565b9050604561032960208601866120fd565b61ffff16141561036a5760008151600681111561034857610348611991565b146103655760405162461bcd60e51b81526004016102e29061215d565b6103e7565b605061037960208601866120fd565b61ffff1614156103b55760018151600681111561039857610398611991565b146103655760405162461bcd60e51b81526004016102e29061217e565b60405162461bcd60e51b81526020600482015260076024820152662120a22fa2a8ad60c91b60448201526064016102e2565b60008160200151600014156103fe57506001610402565b5060005b61041961040e82610e07565b602089015190610e3a565b50505050505050565b60006104396104348760200151610de2565b610e4a565b9050600061044d6104348860200151610de2565b90506000604661046060208801886120fd565b61046a919061219f565b905060008061ffff831660021480610486575061ffff83166004145b80610495575061ffff83166006145b806104a4575061ffff83166008145b156104c4576104b284610ec1565b91506104bd85610ec1565b90506104d2565b505063ffffffff8083169084165b60006104df838386610eed565b90506104f86104ed82611096565b60208d015190610e3a565b5050505050505050505050565b60006105176104348760200151610de2565b90506000606761052a60208701876120fd565b610534919061219f565b9050600061054a8363ffffffff168360206110c9565b905061056361055882610e07565b60208a015190610e3a565b5050505050505050565b600061057f6104348760200151610de2565b905060006105936104348860200151610de2565b9050600080606a6105a760208901896120fd565b6105b1919061219f565b90508061ffff166003141561062f5763ffffffff841615806105e957508260030b637fffffff191480156105e957508360030b600019145b15610612578860025b9081600381111561060557610605611991565b8152505050505050610753565b8360030b8360030b81610627576106276121c2565b059150610737565b8061ffff166005141561066c5763ffffffff841661064f578860026105f2565b8360030b8360030b81610664576106646121c2565b079150610737565b8061ffff16600a141561068c5763ffffffff8316601f85161b9150610737565b8061ffff16600c14156106ac5763ffffffff8316601f85161c9150610737565b8061ffff16600b14156106ca57600383900b601f85161d9150610737565b8061ffff16600d14156106e8576106e1838561128d565b9150610737565b8061ffff16600e14156106ff576106e183856112cf565b6000806107198563ffffffff168763ffffffff1685611311565b915091508015610733575050600289525061075392505050565b5091505b61074e61074383610e07565b60208b015190610e3a565b505050505b5050505050565b600061077161076c8760200151610de2565b611497565b9050600061078561076c8860200151610de2565b90506000605161079860208801886120fd565b6107a2919061219f565b905060006107b1838584610eed565b905061074e61074382611096565b60006107d161076c8760200151610de2565b9050600060796107e460208701876120fd565b6107ee919061219f565b905060006107fe838360406110c9565b63ffffffff1690506105636105588261150e565b600061082461076c8760200151610de2565b9050600061083861076c8860200151610de2565b9050600080607c61084c60208901896120fd565b610856919061219f565b90508061ffff16600314156108bf576001600160401b038416158061089557508260070b677fffffffffffffff1914801561089557508360070b600019145b156108a2578860026105f2565b8360070b8360070b816108b7576108b76121c2565b0591506109c1565b8061ffff16600514156108ff576001600160401b0384166108e2578860026105f2565b8360070b8360070b816108f7576108f76121c2565b0791506109c1565b8061ffff16600a1415610922576001600160401b038316603f85161b91506109c1565b8061ffff16600c1415610945576001600160401b038316603f85161c91506109c1565b8061ffff16600b141561096357600783900b603f85161d91506109c1565b8061ffff16600d14156109815761097a8385611544565b91506109c1565b8061ffff16600e14156109985761097a8385611592565b60006109a5848684611311565b909350905080156109bf5750506002885250610753915050565b505b61074e6107438361150e565b60006109df61076c8760200151610de2565b90508061041961040e82610e07565b6000610a006104348760200151610de2565b9050600060ac610a1360208701876120fd565b61ffff161415610a2d57610a2682610ec1565b9050610a36565b5063ffffffff81165b61041961040e8261150e565b60008060c0610a5460208701876120fd565b61ffff161415610a6a5750600090506008610b41565b60c1610a7960208701876120fd565b61ffff161415610a8f5750600090506010610b41565b60c2610a9e60208701876120fd565b61ffff161415610ab45750600190506008610b41565b60c3610ac360208701876120fd565b61ffff161415610ad95750600190506010610b41565b60c4610ae860208701876120fd565b61ffff161415610afe5750600190506020610b41565b60405162461bcd60e51b8152602060048201526018602482015277494e56414c49445f455854454e445f53414d455f5459504560401b60448201526064016102e2565b600080836006811115610b5657610b56611991565b1415610b67575063ffffffff610b71565b506001600160401b035b6000610b808960200151610de2565b9050836006811115610b9457610b94611991565b81516006811115610ba757610ba7611991565b14610bf05760405162461bcd60e51b81526020600482015260196024820152784241445f455854454e445f53414d455f545950455f5459504560381b60448201526064016102e2565b6000610c03600160ff861681901b6121d8565b602083018051821690529050610c1a6001856121ef565b60ff166001901b826020015116600014610c3c57602082018051821985161790525b60208a0151610c4b9083610e3a565b50505050505050505050565b60008060bc610c6960208701876120fd565b61ffff161415610c7f5750600090506002610d2c565b60bd610c8e60208701876120fd565b61ffff161415610ca45750600190506003610d2c565b60be610cb360208701876120fd565b61ffff161415610cc95750600290506000610d2c565b60bf610cd860208701876120fd565b61ffff161415610cee5750600390506001610d2c565b60405162461bcd60e51b81526020600482015260136024820152721253959053125117d491525395115494149155606a1b60448201526064016102e2565b6000610d3b8860200151610de2565b9050816006811115610d4f57610d4f611991565b81516006811115610d6257610d62611991565b14610daa5760405162461bcd60e51b8152602060048201526018602482015277494e56414c49445f5245494e544552505245545f5459504560401b60448201526064016102e2565b80836006811115610dbd57610dbd611991565b90816006811115610dd057610dd0611991565b90525060208801516105639082610e3a565b60408051808201909152600080825260208201528151610e01906115e0565b92915050565b604080518082019091526000808252602082015250604080518082019091526000815263ffffffff909116602082015290565b8151610e4690826116f0565b5050565b60208101516000908183516006811115610e6657610e66611991565b14610e835760405162461bcd60e51b81526004016102e29061215d565b6401000000008110610e015760405162461bcd60e51b81526020600482015260076024820152662120a22fa4999960c91b60448201526064016102e2565b60006380000000821615610ee3575063ffffffff1667ffffffff000000001790565b5063ffffffff1690565b600061ffff8216610f1457826001600160401b0316846001600160401b031614905061108f565b61ffff821660011415610f3e57826001600160401b0316846001600160401b03161415905061108f565b61ffff821660021415610f5b578260070b8460070b12905061108f565b61ffff821660031415610f8457826001600160401b0316846001600160401b031610905061108f565b61ffff821660041415610fa1578260070b8460070b13905061108f565b61ffff821660051415610fca57826001600160401b0316846001600160401b031611905061108f565b61ffff821660061415610fe8578260070b8460070b1315905061108f565b61ffff82166007141561101257826001600160401b0316846001600160401b03161115905061108f565b61ffff821660081415611030578260070b8460070b1215905061108f565b61ffff82166009141561105a57826001600160401b0316846001600160401b03161015905061108f565b60405162461bcd60e51b815260206004820152600a6024820152690424144204952454c4f560b41b60448201526064016102e2565b9392505050565b604080518082019091526000808252602082015281156110ba57610e016001610e07565b610e016000610e07565b919050565b60008161ffff16602014806110e257508161ffff166040145b6111295760405162461bcd60e51b8152602060048201526018602482015277057524f4e4720555345204f462067656e65726963556e4f760441b60448201526064016102e2565b61ffff831661119a5761ffff82165b60008163ffffffff1611801561116d5750611154600182612212565b63ffffffff166001901b856001600160401b0316166000145b156111845761117d600182612212565b9050611138565b6111928161ffff8516612212565b91505061108f565b61ffff8316600114156111f35760005b8261ffff168163ffffffff161080156111d55750600163ffffffff82161b85166001600160401b0316155b156111ec576111e560018261222f565b90506111aa565b905061108f565b61ffff831660021415611259576000805b8361ffff168263ffffffff16101561125057600163ffffffff83161b86166001600160401b03161561123e5761123b60018261222f565b90505b816112488161224e565b925050611204565b915061108f9050565b60405162461bcd60e51b815260206004820152600960248201526804241442049556e4f760bc1b60448201526064016102e2565b600061129a602083612272565b91506112a7826020612212565b63ffffffff168363ffffffff16901c8263ffffffff168463ffffffff16901b17905092915050565b60006112dc602083612272565b91506112e9826020612212565b63ffffffff168363ffffffff16901b8263ffffffff168463ffffffff16901c17905092915050565b60008061ffff8316611329575050828201600061148f565b8261ffff1660011415611342575050818303600061148f565b8261ffff166002141561135b575050828202600061148f565b8261ffff16600414156113af576001600160401b038416611382575060009050600161148f565b836001600160401b0316856001600160401b0316816113a3576113a36121c2565b0460009150915061148f565b8261ffff1660061415611403576001600160401b0384166113d6575060009050600161148f565b836001600160401b0316856001600160401b0316816113f7576113f76121c2565b0660009150915061148f565b8261ffff166007141561141c575050828216600061148f565b8261ffff1660081415611435575050828217600061148f565b8261ffff166009141561144e575050828218600061148f565b60405162461bcd60e51b81526020600482015260166024820152750494e56414c49445f47454e455249435f42494e5f4f560541b60448201526064016102e2565b935093915050565b60208101516000906001835160068111156114b4576114b4611991565b146114d15760405162461bcd60e51b81526004016102e29061217e565b600160401b8110610e015760405162461bcd60e51b815260206004820152600760248201526610905117d24d8d60ca1b60448201526064016102e2565b60408051808201909152600080825260208201525060408051808201909152600181526001600160401b03909116602082015290565b6000611551604083612295565b915061155e8260406122af565b6001600160401b0316836001600160401b0316901c826001600160401b0316846001600160401b0316901b17905092915050565b600061159f604083612295565b91506115ac8260406122af565b6001600160401b0316836001600160401b0316901b826001600160401b0316846001600160401b0316901c17905092915050565b604080518082019091526000808252602082015281518051611604906001906121d8565b81518110611614576116146122cf565b602002602001015190506000600183600001515161163291906121d8565b6001600160401b0381111561164957611649611be8565b60405190808252806020026020018201604052801561168e57816020015b60408051808201909152600080825260208201528152602001906001900390816116675790505b50905060005b81518110156116e95783518051829081106116b1576116b16122cf565b60200260200101518282815181106116cb576116cb6122cf565b602002602001018190525080806116e1906122e5565b915050611694565b5090915290565b815151600090611701906001612300565b6001600160401b0381111561171857611718611be8565b60405190808252806020026020018201604052801561175d57816020015b60408051808201909152600080825260208201528152602001906001900390816117365790505b50905060005b8351518110156117b9578351805182908110611781576117816122cf565b602002602001015182828151811061179b5761179b6122cf565b602002602001018190525080806117b1906122e5565b915050611763565b508181846000015151815181106117d2576117d26122cf565b602090810291909101015290915250565b604080516101208101909152806000815260200161181860408051606080820183529181019182529081526000602082015290565b815260200161183e60408051606080820183529181019182529081526000602082015290565b8152602001611863604051806040016040528060608152602001600080191681525090565b815260006020820181905260408201819052606082018190526080820181905260a09091015290565b611894612318565b565b6000604082840312156118a857600080fd5b50919050565b6000806000806000808688036101a08112156118c957600080fd5b6118d38989611896565b965060408801356001600160401b03808211156118ef57600080fd5b90890190610120828c03121561190457600080fd5b81975060e0605f198401121561191957600080fd5b60608a01965061192d8b6101408c01611896565b95506101808a013592508083111561194457600080fd5b828a0192508a601f84011261195857600080fd5b823591508082111561196957600080fd5b5089602082840101111561197c57600080fd5b60208201935080925050509295509295509295565b634e487b7160e01b600052602160045260246000fd5b600481106119b7576119b7611991565b9052565b8051600781106119cd576119cd611991565b8252602090810151910152565b805160408084529051602084830181905281516060860181905260009392820191849160808801905b80841015611a2a57611a168286516119bb565b938201936001939093019290850190611a03565b509581015196019590955250919392505050565b8051604080845281518482018190526000926060916020918201918388019190865b82811015611aa9578451611a758582516119bb565b80830151858901528781015163ffffffff90811688870152908701511660808501529381019360a090930192600101611a60565b509687015197909601969096525093949350505050565b6000610100808352611ad581840186516119a7565b602085015161012084810152611aef6102208501826119da565b9050604086015160ff198086840301610140870152611b0e83836119da565b925060608801519150808684030161016087015250611b2d8282611a3e565b915050608086015161018085015260a0860151611b536101a086018263ffffffff169052565b5060c086015163ffffffff81166101c08601525060e086015163ffffffff81166101e08601525090850151610200840152905061108f60208301848051825260208101516001600160401b0380825116602085015280602083015116604085015250604081015160608401525060408101516080830152606081015160a083015263ffffffff60808201511660c08301525050565b634e487b7160e01b600052604160045260246000fd5b604080519081016001600160401b0381118282101715611c2057611c20611be8565b60405290565b604051602081016001600160401b0381118282101715611c2057611c20611be8565b604051608081016001600160401b0381118282101715611c2057611c20611be8565b60405161012081016001600160401b0381118282101715611c2057611c20611be8565b60405160a081016001600160401b0381118282101715611c2057611c20611be8565b604051606081016001600160401b0381118282101715611c2057611c20611be8565b604051601f8201601f191681016001600160401b0381118282101715611cf957611cf9611be8565b604052919050565b8035600481106110c457600080fd5b60006001600160401b03821115611d2957611d29611be8565b5060051b60200190565b600060408284031215611d4557600080fd5b611d4d611bfe565b9050813560078110611d5e57600080fd5b808252506020820135602082015292915050565b60006040808385031215611d8557600080fd5b611d8d611bfe565b915082356001600160401b0380821115611da657600080fd5b81850191506020808388031215611dbc57600080fd5b611dc4611c26565b833583811115611dd357600080fd5b80850194505087601f850112611de857600080fd5b83359250611dfd611df884611d10565b611cd1565b83815260069390931b84018201928281019089851115611e1c57600080fd5b948301945b84861015611e4257611e338a87611d33565b82529486019490830190611e21565b8252508552948501359484019490945250909392505050565b803563ffffffff811681146110c457600080fd5b60006040808385031215611e8257600080fd5b611e8a611bfe565b915082356001600160401b03811115611ea257600080fd5b8301601f81018513611eb357600080fd5b80356020611ec3611df883611d10565b82815260a09283028401820192828201919089851115611ee257600080fd5b948301945b84861015611f4b5780868b031215611eff5760008081fd5b611f07611c48565b611f118b88611d33565b815287870135858201526060611f28818901611e5b565b89830152611f3860808901611e5b565b9082015283529485019491830191611ee7565b50808752505080860135818601525050505092915050565b60006101208236031215611f7657600080fd5b611f7e611c6a565b611f8783611d01565b815260208301356001600160401b0380821115611fa357600080fd5b611faf36838701611d72565b60208401526040850135915080821115611fc857600080fd5b611fd436838701611d72565b60408401526060850135915080821115611fed57600080fd5b50611ffa36828601611e6f565b6060830152506080830135608082015261201660a08401611e5b565b60a082015261202760c08401611e5b565b60c082015261203860e08401611e5b565b60e082015261010092830135928101929092525090565b80356001600160401b03811681146110c457600080fd5b600081830360e081121561207957600080fd5b612081611c8d565b833581526060601f198301121561209757600080fd5b61209f611caf565b91506120ad6020850161204f565b82526120bb6040850161204f565b6020830152606084013560408301528160208201526080840135604082015260a084013560608201526120f060c08501611e5b565b6080820152949350505050565b60006020828403121561210f57600080fd5b813561ffff8116811461108f57600080fd5b634e487b7160e01b600052601160045260246000fd5b600061ffff80831681851680830382111561215457612154612121565b01949350505050565b6020808252600790820152662727aa2fa4999960c91b604082015260600190565b6020808252600790820152661393d517d24d8d60ca1b604082015260600190565b600061ffff838116908316818110156121ba576121ba612121565b039392505050565b634e487b7160e01b600052601260045260246000fd5b6000828210156121ea576121ea612121565b500390565b600060ff821660ff84168082101561220957612209612121565b90039392505050565b600063ffffffff838116908316818110156121ba576121ba612121565b600063ffffffff80831681851680830382111561215457612154612121565b600063ffffffff8083168181141561226857612268612121565b6001019392505050565b600063ffffffff80841680612289576122896121c2565b92169190910692915050565b60006001600160401b0380841680612289576122896121c2565b60006001600160401b03838116908316818110156121ba576121ba612121565b634e487b7160e01b600052603260045260246000fd5b60006000198214156122f9576122f9612121565b5060010190565b6000821982111561231357612313612121565b500190565b634e487b7160e01b600052605160045260246000fdfea264697066735822122022e2a965fb61e401d213278f6ec333a50aeb37672e5ca7f88f89d98e53ba249864736f6c63430008090033'
const isSuperArgs = xs => xs.length > 1
class OneStepProverMath__factory extends ethers_1.ContractFactory {
  constructor(...args) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
    this.contractName = 'OneStepProverMath'
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
exports.OneStepProverMath__factory = OneStepProverMath__factory
OneStepProverMath__factory.bytecode = _bytecode
OneStepProverMath__factory.abi = _abi
