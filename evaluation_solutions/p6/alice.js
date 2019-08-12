const {Command, flags} = require('@oclif/command')
const { Sig } = require('cashscript')
const {bitbox, contractInstance} = require('../global')

class AliceCommand extends Command {
  // IMPLEMENT THIS FUNCTION
  async run() {
    try {
      const {flags} = this.parse(AliceCommand)

      const alice_keypair = bitbox.ECPair.fromWIF(flags.wif)
      const alice_tx = await contractInstance.functions.alice(new Sig(alice_keypair, 0x01))
      .send(flags.to, flags.amount)
      await console.log("Transaction Details: ", alice_tx)
    } catch (err) {
      console.log(`Error: `, err)
    }
  }
}

AliceCommand.description = `Send money out of the contract by providing Alice's WIF
Uses the contract's 'alice' function`

AliceCommand.flags = {
  to: flags.string({char: 't', description: 'Recipient of the funds', required: true}),
  amount: flags.integer({char: 'a', description: 'Amount of satoshis to send out of the contract', required: true}),
  wif: flags.string({char: 'w', description: 'WIF for private key to use for signing the transaction', required: true}),
}

module.exports = AliceCommand
