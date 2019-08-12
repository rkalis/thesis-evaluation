const {Command} = require('@oclif/command')
const {bitbox, contractInstance} = require('../global')

class DetailsCommand extends Command {
  // IMPLEMENT THIS FUNCTION
  async run() {
	  // Retrieve contract instance address
	  console.log(contractInstance.address);

	  // Retrieve contract instance balance from address
	  console.log(await contractInstance.getBalance());
  }
}

DetailsCommand.description = 'Display the contract\'s address and balance'

module.exports = DetailsCommand
