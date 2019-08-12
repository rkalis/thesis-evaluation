const {Command} = require('@oclif/command')
const {bitbox, contractInstance} = require('../global')

class DetailsCommand extends Command {
  // IMPLEMENT THIS FUNCTION
  async run() {
    const contractAddress = contractInstance.address
    const contractBalance = await contractInstance.getBalance()
    this.log("Contract Address: ", contractAddress)
    this.log("Contract Balance: ", contractBalance, "sat")
  }
}

DetailsCommand.description = 'Display the contract\'s address and balance'

module.exports = DetailsCommand
