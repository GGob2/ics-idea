const Web3 = require('web3');
let web3 = new Web3('ws://localhost:8546');
const accounts = web3.eth.getAccounts()
console.log(accounts)

