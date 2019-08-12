const {Command, flags} = require('@oclif/command')
const {bitbox, contractInstance} = require('../global')

// Add dependency on cashscript.
const { Contract, Instance, Sig } = require('cashscript');

class CarolCommand extends Command {
  // IMPLEMENT THIS FUNCTION
  async run() {
    const {flags} = this.parse(CarolCommand)
	 // Make a keypair from the WIF.
	 const keypair = bitbox.ECPair.fromWIF(flags.wif)
	 
	 console.log(flags);
	 console.log('Sending:', await contractInstance.functions.carol(new Sig(keypair, 0x01), Buffer.from(flags.preimage, 'hex')).send(flags.to, flags.amount));
  }
}

CarolCommand.description = `Send money out of the contract by providing Carol's WIF and the correct data preimage
Uses the contract's 'carol' function`

CarolCommand.flags = {
  to: flags.string({char: 't', description: 'Recipient of the funds', required: true}),
  amount: flags.integer({char: 'a', description: 'Amount of satoshis to send out of the contract', required: true}),
  wif: flags.string({char: 'w', description: 'WIF for private key to use for signing the transaction', required: true}),
  preimage: flags.string({char: 'p', description: 'Preimage of the stored data hash', required: true}),
}

module.exports = CarolCommand
