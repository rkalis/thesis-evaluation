const {Command} = require('@oclif/command')
const {bitbox, contractInstance} = require('../global')

class DetailsCommand extends Command {
  // IMPLEMENT THIS FUNCTION
  async run() {
    console.log("Address " + contractInstance.address);
    console.log("Balance " + await contractInstance.getBalance());
  }
}

DetailsCommand.description = 'Display the contract\'s address and balance'

module.exports = DetailsCommand
