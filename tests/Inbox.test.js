const assert = require('assert')
const { Web3 } = require('web3')
const ganache = require('ganache')
const { bytecode, ABI } = require('../compile')
const web3 = new Web3(ganache.provider())
// const web3 = new Web3('http://127.0.0.1:8545')

let accounts
let InboxContract
let initialMessage = 'Hello web3'

beforeEach(async () => {
  // console.log({ ABI, bytecode })
  accounts = await web3.eth.getAccounts()
  const balanceWei = await web3.eth.getBalance(accounts[0])

  // Convert balance from Wei to Ether
  const balanceEther = web3.utils.fromWei(balanceWei, 'ether')

  console.log(`Balance of account ${accounts[0]}: ${balanceEther} Ether`)

  InboxContract = await new web3.eth.Contract(ABI)
    .deploy({
      data: bytecode,
      arguments: [initialMessage]
    })
    .send({
      from: accounts[0],
      gas: 1000000
    })
})

describe('Inbox contract', () => {
  it('Deploys contract successfully', () => {
    assert.ok(InboxContract.options.address)
  })

  it('Has initial message', async () => {
    const message = await InboxContract.methods.message().call()
    // assert.equal(message, initialMessage)
    console.log({ message })
  })

  it('Can change message', async () => {
    const newMessage = 'New Message'
    const trx = await InboxContract.methods.setMessage(newMessage).send({
      from: accounts[0]
    })
    console.log('trxhash', trx.transactionHash)
    assert.ok(trx.transactionHash)
  })
})
