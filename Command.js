const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const abi = '[{\"constant\":false,\"inputs\":[],\"name\":\"trustScoreFeedback\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"sumOfVerifyingGroupTrustScore\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"lastOfVerifyingGroup\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"_emp\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"trustScoreMinusFeedback\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"sumOfVerifyingGroupScore\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"sumOfVerifyingScore\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"trustScoreAdapted\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"isVerified\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_numOfVerifyingGroup\",\"type\":\"uint256\"}],\"name\":\"verify\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"cmdScore\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"trustScorePlusFeedback\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"doubleOfCmdScore\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_empNum\",\"type\":\"uint256\"}],\"name\":\"issueCmd_1\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"randomNumList\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"constructor\"}]'

const emp_abi = '[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"employees\",\"outputs\":[{\"name\":\"empNum\",\"type\":\"uint256\"},{\"name\":\"empName\",\"type\":\"string\"},{\"name\":\"empScore\",\"type\":\"uint256\"},{\"name\":\"empTrustScore\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"setEmp\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_empNum\",\"type\":\"uint256\"}],\"name\":\"getEmpScore\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_empNum\",\"type\":\"uint256\"}],\"name\":\"plusEmpTrustScore\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_issuingCmdEmpNum\",\"type\":\"uint256\"}],\"name\":\"setIssuingEmp\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_empNum\",\"type\":\"uint256\"}],\"name\":\"getEmpTrustScore\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_empNum\",\"type\":\"uint256\"}],\"name\":\"minusEmpTrustScore\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"constructor\"}]'

const bin = '0x60806040526005600055600a60015561014060405190810160405280600060ff168152602001600160ff168152602001600260ff168152602001600360ff168152602001600460ff168152602001600560ff168152602001600660ff168152602001600760ff168152602001600860ff168152602001600960ff16815250600290600a6200008f92919062000479565b506000600760006101000a81548160ff0219169083151502179055506000600760016101000a81548160ff021916908315150217905550620000d0620004d0565b604051809103906000f080158015620000ed573d6000803e3d6000fd5b50600760026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200014960036200014f640100000000026401000000009004565b62000509565b600080600080600093505b6002805490508410156200028a57836002805490500342604051602001808281526020019150506040516020818303038152906040526040518082805190602001908083835b602083101515620001c75780518252602082019150602081019050602083039250620001a0565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040518091039020600190048115156200020257fe5b06840192506002838154811015156200021757fe5b906000526020600020015491506002848154811015156200023457fe5b90600052602060002001546002848154811015156200024f57fe5b9060005260206000200181905550816002858154811015156200026e57fe5b906000526020600020018190555083806001019450506200015a565b600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b5cf5d49600187036040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b1580156200031f57600080fd5b505af115801562000334573d6000803e3d6000fd5b50505050600090505b60058110156200044d57600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166373022d1e6002838154811015156200039557fe5b90600052602060002001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b158015620003f357600080fd5b505af115801562000408573d6000803e3d6000fd5b505050506040513d60208110156200041f57600080fd5b810190808051906020019092919050505060036000828254019250508190555080806001019150506200033d565b6001546003541015156200046957600460058190555062000472565b60066005819055505b5050505050565b828054828255906000526020600020908101928215620004bd579160200282015b82811115620004bc578251829060ff169055916020019190600101906200049a565b5b509050620004cc9190620004e1565b5090565b60405161162180620010bf83390190565b6200050691905b8082111562000502576000816000905550600101620004e8565b5090565b90565b610ba680620005196000396000f3006080604052600436106100db576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630282cbdc146100e05780631c85d978146100ea5780632b1e0a33146101155780635234d92c1461014057806358ef3555146101975780636194813c146101a157806371e2e5e4146101cc578063762ce417146101f757806380007e83146102265780638753367f146102555780638d084c171461028d5780639d82a2f5146102b8578063a71b684f146102c2578063bf6239fe146102ed578063ce9a4baa1461030d575b600080fd5b6100e861034e565b005b3480156100f657600080fd5b506100ff610382565b6040518082815260200191505060405180910390f35b34801561012157600080fd5b5061012a610388565b6040518082815260200191505060405180910390f35b34801561014c57600080fd5b5061015561038e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61019f6103b4565b005b3480156101ad57600080fd5b506101b6610496565b6040518082815260200191505060405180910390f35b3480156101d857600080fd5b506101e161049c565b6040518082815260200191505060405180910390f35b34801561020357600080fd5b5061020c6104a2565b604051808215151515815260200191505060405180910390f35b34801561023257600080fd5b5061023b6104b5565b604051808215151515815260200191505060405180910390f35b610273600480360381019080803590602001909291905050506104c8565b604051808215151515815260200191505060405180910390f35b34801561029957600080fd5b506102a2610752565b6040518082815260200191505060405180910390f35b6102c0610758565b005b3480156102ce57600080fd5b506102d761083a565b6040518082815260200191505060405180910390f35b61030b60048036038101908080359060200190929190505050610840565b005b34801561031957600080fd5b5061033860048036038101908080359060200190929190505050610b57565b6040518082815260200191505060405180910390f35b60011515600760019054906101000a900460ff161515141561037757610372610758565b610380565b61037f6103b4565b5b565b60065481565b60055481565b600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008090505b60055481101561049357600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb2bcb1c60028381548110151561041157fe5b90600052602060002001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b15801561046e57600080fd5b505af1158015610482573d6000803e3d6000fd5b5050505080806001019150506103ba565b50565b60035481565b60045481565b600760009054906101000a900460ff1681565b600760019054906101000a900460ff1681565b600080600381905550600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166373022d1e60028481548110151561051e57fe5b90600052602060002001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b15801561057b57600080fd5b505af115801561058f573d6000803e3d6000fd5b505050506040513d60208110156105a557600080fd5b8101908080519060200190929190505050600460008282540192505081905550600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b8b934d060028481548110151561061257fe5b90600052602060002001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b15801561066f57600080fd5b505af1158015610683573d6000803e3d6000fd5b505050506040513d602081101561069957600080fd5b8101908080519060200190929190505050600660008282540192505081905550600154600654101580156106e0575060001515600760009054906101000a900460ff161515145b156107125760016004600082825401925050819055506001600760006101000a81548160ff0219169083151502179055505b60005460045410151561073b576001600760016101000a81548160ff0219169083151502179055505b600760019054906101000a900460ff169050919050565b60005481565b60008090505b60055481101561083757600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663992827676002838154811015156107b557fe5b90600052602060002001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b15801561081257600080fd5b505af1158015610826573d6000803e3d6000fd5b50505050808060010191505061075e565b50565b60015481565b600080600080600093505b60028054905084101561097257836002805490500342604051602001808281526020019150506040516020818303038152906040526040518082805190602001908083835b6020831015156108b55780518252602082019150602081019050602083039250610890565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040518091039020600190048115156108ef57fe5b068401925060028381548110151561090357fe5b9060005260206000200154915060028481548110151561091f57fe5b906000526020600020015460028481548110151561093957fe5b90600052602060002001819055508160028581548110151561095757fe5b9060005260206000200181905550838060010194505061084b565b600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b5cf5d49600187036040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b158015610a0657600080fd5b505af1158015610a1a573d6000803e3d6000fd5b50505050600090505b6005811015610b2d57600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166373022d1e600283815481101515610a7957fe5b90600052602060002001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b158015610ad657600080fd5b505af1158015610aea573d6000803e3d6000fd5b505050506040513d6020811015610b0057600080fd5b81019080805190602001909291905050506003600082825401925050819055508080600101915050610a23565b600154600354101515610b47576004600581905550610b50565b60066005819055505b5050505050565b600281815481101515610b6657fe5b9060005260206000200160009150905054815600a165627a7a72305820b89bd7afa0f7d16f4423aca1efa9c31911e57bd70003e122e93396db261952e2002960806040526200001d62000024640100000000026401000000009004565b50620008eb565b60008060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b903100000000000000000000000000000000000000000000000000815250815260200160018152602001600081525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620000db9291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b903200000000000000000000000000000000000000000000000000815250815260200160028152602001600181525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620001a99291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac3100000000000000000000000000000000000000000000000000815250815260200160028152602001600281525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620002779291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac3200000000000000000000000000000000000000000000000000815250815260200160038152602001600281525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620003459291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea53100000000000000000000000000000000000000000000000000815250815260200160038152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620004139291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea53200000000000000000000000000000000000000000000000000815250815260200160048152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620004e19291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017feab3bcec9ea50000000000000000000000000000000000000000000000000000815250815260200160058152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620005af9291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fed8c80ec9ea500000000000000000000000000000000000000000000000000008152508152602001600681526020016005815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906200067d9291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600981526020017febb680ec82acec9ea500000000000000000000000000000000000000000000008152508152602001600781526020016004815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906200074b9291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fec82acec9ea50000000000000000000000000000000000000000000000000000815250815260200160098152602001600881525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620008199291906200083c565b506040820151816002015560608201518160030155505050600080549050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200087f57805160ff1916838001178555620008b0565b82800160010185558215620008b0579182015b82811115620008af57825182559160200191906001019062000892565b5b509050620008bf9190620008c3565b5090565b620008e891905b80821115620008e4576000816000905550600101620008ca565b5090565b90565b610d2680620008fb6000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634739326b146100885780635ec027a21461014357806373022d1e1461016e57806399282767146101af578063b5cf5d49146101dc578063b8b934d014610209578063bb2bcb1c1461024a575b600080fd5b34801561009457600080fd5b506100b360048036038101908080359060200190929190505050610277565b6040518085815260200180602001848152602001838152602001828103825285818151815260200191508051906020019080838360005b838110156101055780820151818401526020810190506100ea565b50505050905090810190601f1680156101325780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b34801561014f57600080fd5b5061015861034e565b6040518082815260200191505060405180910390f35b34801561017a57600080fd5b5061019960048036038101908080359060200190929190505050610b52565b6040518082815260200191505060405180910390f35b3480156101bb57600080fd5b506101da60048036038101908080359060200190929190505050610b7b565b005b3480156101e857600080fd5b5061020760048036038101908080359060200190929190505050610bad565b005b34801561021557600080fd5b5061023460048036038101908080359060200190929190505050610bfa565b6040518082815260200191505060405180910390f35b34801561025657600080fd5b5061027560048036038101908080359060200190929190505050610c23565b005b60008181548110151561028657fe5b9060005260206000209060040201600091509050806000015490806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103385780601f1061030d57610100808354040283529160200191610338565b820191906000526020600020905b81548152906001019060200180831161031b57829003601f168201915b5050505050908060020154908060030154905084565b60008060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b903100000000000000000000000000000000000000000000000000815250815260200160018152602001600081525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610403929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b9032000000000000000000000000000000000000000000000000008152508152602001600281526020016001815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906104cf929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac310000000000000000000000000000000000000000000000000081525081526020016002815260200160028152509080600181540180825580915050906001820390600052602060002090600402016000909192909190915060008201518160000155602082015181600101908051906020019061059b929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac3200000000000000000000000000000000000000000000000000815250815260200160038152602001600281525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610667929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea53100000000000000000000000000000000000000000000000000815250815260200160038152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610733929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea532000000000000000000000000000000000000000000000000008152508152602001600481526020016003815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906107ff929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017feab3bcec9ea500000000000000000000000000000000000000000000000000008152508152602001600581526020016003815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906108cb929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fed8c80ec9ea50000000000000000000000000000000000000000000000000000815250815260200160068152602001600581525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610997929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600981526020017febb680ec82acec9ea50000000000000000000000000000000000000000000000815250815260200160078152602001600481525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610a63929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fec82acec9ea50000000000000000000000000000000000000000000000000000815250815260200160098152602001600881525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610b2f929190610c55565b506040820151816002015560608201518160030155505050600080549050905090565b60008082815481101515610b6257fe5b9060005260206000209060040201600201549050919050565b6001600082815481101515610b8c57fe5b90600052602060002090600402016003016000828254019250508190555050565b60008082815481101515610bbd57fe5b90600052602060002090600402016002018190555060008082815481101515610be257fe5b90600052602060002090600402016003018190555050565b60008082815481101515610c0a57fe5b9060005260206000209060040201600301549050919050565b6001600082815481101515610c3457fe5b90600052602060002090600402016003016000828254039250508190555050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610c9657805160ff1916838001178555610cc4565b82800160010185558215610cc4579182015b82811115610cc3578251825591602001919060010190610ca8565b5b509050610cd19190610cd5565b5090565b610cf791905b80821115610cf3576000816000905550600101610cdb565b5090565b905600a165627a7a72305820c6678719867c2a6d380fa5c2946fb4635c79f04129bb26e4af82690f8cd7211a0029'


const emp_bin = '0x60806040526200001d62000024640100000000026401000000009004565b50620008eb565b60008060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b903100000000000000000000000000000000000000000000000000815250815260200160018152602001600081525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620000db9291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b903200000000000000000000000000000000000000000000000000815250815260200160028152602001600181525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620001a99291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac3100000000000000000000000000000000000000000000000000815250815260200160028152602001600281525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620002779291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac3200000000000000000000000000000000000000000000000000815250815260200160038152602001600281525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620003459291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea53100000000000000000000000000000000000000000000000000815250815260200160038152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620004139291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea53200000000000000000000000000000000000000000000000000815250815260200160048152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620004e19291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017feab3bcec9ea50000000000000000000000000000000000000000000000000000815250815260200160058152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620005af9291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fed8c80ec9ea500000000000000000000000000000000000000000000000000008152508152602001600681526020016005815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906200067d9291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600981526020017febb680ec82acec9ea500000000000000000000000000000000000000000000008152508152602001600781526020016004815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906200074b9291906200083c565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fec82acec9ea50000000000000000000000000000000000000000000000000000815250815260200160098152602001600881525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620008199291906200083c565b506040820151816002015560608201518160030155505050600080549050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200087f57805160ff1916838001178555620008b0565b82800160010185558215620008b0579182015b82811115620008af57825182559160200191906001019062000892565b5b509050620008bf9190620008c3565b5090565b620008e891905b80821115620008e4576000816000905550600101620008ca565b5090565b90565b610d2680620008fb6000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634739326b146100885780635ec027a21461014357806373022d1e1461016e57806399282767146101af578063b5cf5d49146101dc578063b8b934d014610209578063bb2bcb1c1461024a575b600080fd5b34801561009457600080fd5b506100b360048036038101908080359060200190929190505050610277565b6040518085815260200180602001848152602001838152602001828103825285818151815260200191508051906020019080838360005b838110156101055780820151818401526020810190506100ea565b50505050905090810190601f1680156101325780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b34801561014f57600080fd5b5061015861034e565b6040518082815260200191505060405180910390f35b34801561017a57600080fd5b5061019960048036038101908080359060200190929190505050610b52565b6040518082815260200191505060405180910390f35b3480156101bb57600080fd5b506101da60048036038101908080359060200190929190505050610b7b565b005b3480156101e857600080fd5b5061020760048036038101908080359060200190929190505050610bad565b005b34801561021557600080fd5b5061023460048036038101908080359060200190929190505050610bfa565b6040518082815260200191505060405180910390f35b34801561025657600080fd5b5061027560048036038101908080359060200190929190505050610c23565b005b60008181548110151561028657fe5b9060005260206000209060040201600091509050806000015490806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103385780601f1061030d57610100808354040283529160200191610338565b820191906000526020600020905b81548152906001019060200180831161031b57829003601f168201915b5050505050908060020154908060030154905084565b60008060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b903100000000000000000000000000000000000000000000000000815250815260200160018152602001600081525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610403929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b9032000000000000000000000000000000000000000000000000008152508152602001600281526020016001815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906104cf929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac310000000000000000000000000000000000000000000000000081525081526020016002815260200160028152509080600181540180825580915050906001820390600052602060002090600402016000909192909190915060008201518160000155602082015181600101908051906020019061059b929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac3200000000000000000000000000000000000000000000000000815250815260200160038152602001600281525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610667929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea53100000000000000000000000000000000000000000000000000815250815260200160038152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610733929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea532000000000000000000000000000000000000000000000000008152508152602001600481526020016003815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906107ff929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017feab3bcec9ea500000000000000000000000000000000000000000000000000008152508152602001600581526020016003815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906108cb929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fed8c80ec9ea50000000000000000000000000000000000000000000000000000815250815260200160068152602001600581525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610997929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600981526020017febb680ec82acec9ea50000000000000000000000000000000000000000000000815250815260200160078152602001600481525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610a63929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fec82acec9ea50000000000000000000000000000000000000000000000000000815250815260200160098152602001600881525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610b2f929190610c55565b506040820151816002015560608201518160030155505050600080549050905090565b60008082815481101515610b6257fe5b9060005260206000209060040201600201549050919050565b6001600082815481101515610b8c57fe5b90600052602060002090600402016003016000828254019250508190555050565b60008082815481101515610bbd57fe5b90600052602060002090600402016002018190555060008082815481101515610be257fe5b90600052602060002090600402016003018190555050565b60008082815481101515610c0a57fe5b9060005260206000209060040201600301549050919050565b6001600082815481101515610c3457fe5b90600052602060002090600402016003016000828254039250508190555050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610c9657805160ff1916838001178555610cc4565b82800160010185558215610cc4579182015b82811115610cc3578251825591602001919060010190610ca8565b5b509050610cd19190610cd5565b5090565b610cf791905b80821115610cf3576000816000905550600101610cdb565b5090565b905600a165627a7a72305820c6678719867c2a6d380fa5c2946fb4635c79f04129bb26e4af82690f8cd7211a0029'

const CommandContractFactory = web3.eth.contract(JSON.parse(abi));
const CommandContractFactory_emp = web3.eth.contract(JSON.parse(emp_abi));

const CommandContractInstance = CommandContractFactory.new({
    from: web3.eth.accounts[0],
    data : bin,
    value:'1000000000',
    gas: '3000000'
}, function (e,contract) {
    console.log(e, contract);
     
    // Contract가 정상적으로 web3에 deploy되지 않는 문제 발생 중..(01/15)
    if(typeof contract.address !== 'undefined') {  
        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash)
    }
}

)

const CommandContractInstance_emp = CommandContractFactory_emp.new({
    from: web3.eth.accounts[0],
    data : emp_bin,
    value:'1000000000',
    gas: '1000000000'
}, function (e,contract) {
    console.log(e, contract);
     
    // Contract가 정상적으로 web3에 deploy되지 않는 문제 발생 중..(01/15)
    if(typeof contract.address !== 'undefined') {  
        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash)
    }
}

)
