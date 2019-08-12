const {Command} = require('@oclif/command')
const {contractInstance} = require('../global')

class DetailsCommand extends Command {
  // IMPLEMENT THIS FUNCTION
  async run() {
      // Get contract balance & output address + balance
      const contractBalance = await contractInstance.getBalance();

      this.log('contract address:' + contractInstance.address);
      this.log('contract address:' +contractBalance);
  }
}

DetailsCommand.description = 'Display the contract\'s address and balance'

module.exports = DetailsCommand
