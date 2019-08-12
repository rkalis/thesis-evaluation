const {Command, flags} = require('@oclif/command')
const { Sig } = require('cashscript')
const {bitbox, contractInstance} = require('../global')

class CarolCommand extends Command {
  // IMPLEMENT THIS FUNCTION
  async run() {
    try {
      const {flags} = this.parse(CarolCommand)

      const carol_keypair = bitbox.ECPair.fromWIF(flags.wif)
      const carol_tx = await contractInstance.functions.carol(new Sig(carol_keypair, 0x01), flags.preimage)
        .send(flags.to, flags.amount)
      await console.log("Transaction Details: ", carol_tx)
    } catch (err) {
      console.log(`Error: `, err)
    }
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
