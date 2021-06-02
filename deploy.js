const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compile = require('./compile');
const abi = compile.abi;
const bytecode = compile.evm.bytecode.object;

const provider = new HDWalletProvider(
    'scatter bone develop unit fun other away spring light nurse expose impulse',
    'https://ropsten.infura.io/v3/b6339512b5064fd2830e3d26f9a3c0bb'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(abi)
    .deploy({
        data: bytecode,
        arguments: ['Isabel']
    })
    .send({ from: accounts[0], gas: '1000000'});
    console.log(result)
}
deploy();