const dotenv = require('dotenv')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const { Web3 } = require('web3')
const { bytecode, ABI } = require('./compile')

dotenv.config()

const mnemonic = process.env.MNEMONIC

const provider = new HDWalletProvider(
  mnemonic,
  'https://sepolia.infura.io/v3/' + process.env.INFURA_KEY
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]

  const balanceWei = await web3.eth.getBalance(account)

  const balanceEther = web3.utils.fromWei(balanceWei, 'ether')

  console.log(`Balance for account ${account}: ${balanceEther} Ether`)

  console.log('Deploying contract...')
  const inboxContract = await new web3.eth.Contract(ABI)
    .deploy({
      data: '0x' + bytecode,
      arguments: ['Hello test network']
    })
    .send({
      from: account,
      gas: 1000000
    })

  console.log('inboxContract deployed..', inboxContract._address)
  provider.engine.stop()
}

deploy()
