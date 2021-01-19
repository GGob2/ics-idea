const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const abi = '[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"employees\",\"outputs\":[{\"name\":\"empNum\",\"type\":\"uint256\"},{\"name\":\"empName\",\"type\":\"string\"},{\"name\":\"empScore\",\"type\":\"uint256\"},{\"name\":\"empTrustScore\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"setEmp\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_empNum\",\"type\":\"uint256\"}],\"name\":\"getEmpScore\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_empNum\",\"type\":\"uint256\"}],\"name\":\"plusEmpTrustScore\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_issuingCmdEmpNum\",\"type\":\"uint256\"}],\"name\":\"setIssuingEmp\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_empNum\",\"type\":\"uint256\"}],\"name\":\"getEmpTrustScore\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_empNum\",\"type\":\"uint256\"}],\"name\":\"minusEmpTrustScore\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}]'


const CommandContractFactory = web3.eth.contract(JSON.parse(abi));

const CommandContractInstance = CommandContractFactory.new({
    from: web3.eth.accounts[0],
    data :
    '0x60806040523480156200001157600080fd5b506200002b62000032640100000000026401000000009004565b50620008f9565b60008060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b903100000000000000000000000000000000000000000000000000815250815260200160018152602001600081525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620000e99291906200084a565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b903200000000000000000000000000000000000000000000000000815250815260200160028152602001600181525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620001b79291906200084a565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac3100000000000000000000000000000000000000000000000000815250815260200160028152602001600281525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620002859291906200084a565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac3200000000000000000000000000000000000000000000000000815250815260200160038152602001600281525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620003539291906200084a565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea53100000000000000000000000000000000000000000000000000815250815260200160038152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620004219291906200084a565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea53200000000000000000000000000000000000000000000000000815250815260200160048152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620004ef9291906200084a565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017feab3bcec9ea50000000000000000000000000000000000000000000000000000815250815260200160058152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620005bd9291906200084a565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fed8c80ec9ea500000000000000000000000000000000000000000000000000008152508152602001600681526020016005815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906200068b9291906200084a565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600981526020017febb680ec82acec9ea50000000000000000000000000000000000000000000000815250815260200160078152602001600481525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620007599291906200084a565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fec82acec9ea50000000000000000000000000000000000000000000000000000815250815260200160098152602001600881525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190620008279291906200084a565b506040820151816002015560608201518160030155505050600080549050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200088d57805160ff1916838001178555620008be565b82800160010185558215620008be579182015b82811115620008bd578251825591602001919060010190620008a0565b5b509050620008cd9190620008d1565b5090565b620008f691905b80821115620008f2576000816000905550600101620008d8565b5090565b90565b610d2680620009096000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634739326b146100885780635ec027a21461014357806373022d1e1461016e57806399282767146101af578063b5cf5d49146101dc578063b8b934d014610209578063bb2bcb1c1461024a575b600080fd5b34801561009457600080fd5b506100b360048036038101908080359060200190929190505050610277565b6040518085815260200180602001848152602001838152602001828103825285818151815260200191508051906020019080838360005b838110156101055780820151818401526020810190506100ea565b50505050905090810190601f1680156101325780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b34801561014f57600080fd5b5061015861034e565b6040518082815260200191505060405180910390f35b34801561017a57600080fd5b5061019960048036038101908080359060200190929190505050610b52565b6040518082815260200191505060405180910390f35b3480156101bb57600080fd5b506101da60048036038101908080359060200190929190505050610b7b565b005b3480156101e857600080fd5b5061020760048036038101908080359060200190929190505050610bad565b005b34801561021557600080fd5b5061023460048036038101908080359060200190929190505050610bfa565b6040518082815260200191505060405180910390f35b34801561025657600080fd5b5061027560048036038101908080359060200190929190505050610c23565b005b60008181548110151561028657fe5b9060005260206000209060040201600091509050806000015490806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103385780601f1061030d57610100808354040283529160200191610338565b820191906000526020600020905b81548152906001019060200180831161031b57829003601f168201915b5050505050908060020154908060030154905084565b60008060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b903100000000000000000000000000000000000000000000000000815250815260200160018152602001600081525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610403929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fec82acec9b9032000000000000000000000000000000000000000000000000008152508152602001600281526020016001815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906104cf929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac310000000000000000000000000000000000000000000000000081525081526020016002815260200160028152509080600181540180825580915050906001820390600052602060002090600402016000909192909190915060008201518160000155602082015181600101908051906020019061059b929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017feb8c80eba6ac3200000000000000000000000000000000000000000000000000815250815260200160038152602001600281525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610667929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea53100000000000000000000000000000000000000000000000000815250815260200160038152602001600381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610733929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600781526020017fecb0a8ec9ea532000000000000000000000000000000000000000000000000008152508152602001600481526020016003815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906107ff929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017feab3bcec9ea500000000000000000000000000000000000000000000000000008152508152602001600581526020016003815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010190805190602001906108cb929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fed8c80ec9ea50000000000000000000000000000000000000000000000000000815250815260200160068152602001600581525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610997929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600981526020017febb680ec82acec9ea50000000000000000000000000000000000000000000000815250815260200160078152602001600481525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610a63929190610c55565b506040820151816002015560608201518160030155505050600060806040519081016040528060016000805490500181526020016040805190810160405280600681526020017fec82acec9ea50000000000000000000000000000000000000000000000000000815250815260200160098152602001600881525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001556020820151816001019080519060200190610b2f929190610c55565b506040820151816002015560608201518160030155505050600080549050905090565b60008082815481101515610b6257fe5b9060005260206000209060040201600201549050919050565b6001600082815481101515610b8c57fe5b90600052602060002090600402016003016000828254019250508190555050565b60008082815481101515610bbd57fe5b90600052602060002090600402016002018190555060008082815481101515610be257fe5b90600052602060002090600402016003018190555050565b60008082815481101515610c0a57fe5b9060005260206000209060040201600301549050919050565b6001600082815481101515610c3457fe5b90600052602060002090600402016003016000828254039250508190555050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610c9657805160ff1916838001178555610cc4565b82800160010185558215610cc4579182015b82811115610cc3578251825591602001919060010190610ca8565b5b509050610cd19190610cd5565b5090565b610cf791905b80821115610cf3576000816000905550600101610cdb565b5090565b905600a165627a7a72305820db67c9b2b2162892e28e73995f5f37f09a958390c68de5bb905d68cab6b07b100029',
    gas: '1000000000'
}, function (e,contract) {
    console.log(e, contract);
    if(typeof contract.address !== 'undefined') {
        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash)
    }
}
)
