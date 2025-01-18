const path = require('path')
const fs = require('fs')
const solc = require('solc')

const contractPath = path.resolve(__dirname, 'contracts', 'InboxContract.sol')

const source = fs.readFileSync(contractPath, 'utf8')

var input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

var output = JSON.parse(solc.compile(JSON.stringify(input)))

// console.log(output)
// for (var contractName in output.contracts['Inbox.sol']) {
//   // console.log(
//   //   contractName,
//   //   output.contracts['Inbox.sol'][contractName].evm.bytecode.object
//   // )
//   console.log(output.contracts['Inbox.sol'][contractName].evm)
// }
// const res = solc.compile(source,1)
module.exports = {
  bytecode: '0x0' + output.contracts['Inbox.sol'].Inbox.evm.bytecode.object,
  ABI: output.contracts['Inbox.sol'].Inbox.abi
}
