const { Command } = require('@oclif/command');
const { bitbox, contractInstance } = require('../global');

class DetailsCommand extends Command {
	async run() {
		const contractBalance = await contractInstance.getBalance();
		console.log('contract address:', contractInstance.address);
		console.log('contract balance:', contractBalance);
	}
}

DetailsCommand.description = "Display the contract's address and balance";

module.exports = DetailsCommand;
