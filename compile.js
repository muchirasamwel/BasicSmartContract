const path = require('path')
const fs = require('fs')
const solc = require('solc')

const contractPath = path.resolve(__dirname, 'contracts', 'InboxContract.sol')

const source = fs.readFileSync(contractPath, 'utf8')

var input = {
  language: 'Solidity',
  sources: {
    'test.sol': {
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

//   console.log(output)
for (var contractName in output.contracts['test.sol']) {
  console.log(
    contractName,
    output.contracts['test.sol'][contractName].evm.bytecode.object
  )
  console.log('ABI', output.contracts['test.sol'][contractName].abi)
}
// const res = solc.compile(source,1)
