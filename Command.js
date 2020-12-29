const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const account2 = web3.eth.accounts[1];

const source = fs.readFileSync('C:\Users\MyungJoe Kang\Desktop\private_net\ics-idea\1_New_Command.sol', 'utf-8');

const compiledContract = solc.compile(source, 1);
const abi = compiledContract.contracts
