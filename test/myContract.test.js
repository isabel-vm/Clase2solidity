const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compile = require('../compile');
const abi = compile.abi;
const bytecode = compile.evm.bytecode.object;

let accounts;
let contractInstance;

beforeEach(async () => {
    accounts = await new web3.eth.getAccounts();
    contractInstance = await new web3.eth.Contract(abi)
    .deploy({
        data: bytecode,
        arguments: ['Isabel']
    })
    .send({ from: accounts[0], gas: '1000000'})
});

describe('StorageName', () => {
    it('deploys a contract', () => {
        console.log(contractInstance._address);
        console.log(accounts);
    });
    it('Origin name', async () => {
        const name = await contractInstance.methods.getName().call();
        assert.strictEqual('Isabel', name)
    });
    it('Can change name', async () => {
        await contractInstance.methods.setName('María').send({from: accounts[0]});
        const name = await contractInstance.methods.getName().call();
        assert.strictEqual('María', name);
    });
});