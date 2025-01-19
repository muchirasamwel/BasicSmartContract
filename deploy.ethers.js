const dotenv = require('dotenv')
const ethers = require('ethers')
const { ContractFactory } = require('ethers')
const { bytecode, ABI } = require('./compile')

dotenv.config()

const deploy = async () => {
  const provider = await new ethers.JsonRpcProvider(
    // 'https://sepolia.drpc.org'
    // 'https://arbitrum-sepolia.infura.io/v3/' + process.env.INFURA_KEY
    'https://sepolia.infura.io/v3/' + process.env.INFURA_KEY
  )
  console.log('provider ready, getting the account ...')

  const account = await ethers.Wallet.fromPhrase(
    process.env.MNEMONIC,
    provider
  ).connect(provider)
  console.log('account ready, creating factory ...')

  const factory = await new ContractFactory(ABI, '0x' + bytecode, account)

  console.log('factory ready, deploying ...')

  const contract = await factory.deploy('Hello ethers')

  console.log('contract deployed', contract.target)
}

deploy()
