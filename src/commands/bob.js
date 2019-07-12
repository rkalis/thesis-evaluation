const {Command, flags} = require('@oclif/command')
const {bitbox, contractInstance} = require('../global')

class BobCommand extends Command {
  // IMPLEMENT THIS FUNCTION
  async run() {
    const {flags} = this.parse(BobCommand)
  }
}

BobCommand.description = `Send money out of the contract by providing Bob's WIF after the timeout block
Uses the contract's 'bob' function`

BobCommand.flags = {
  to: flags.string({char: 't', description: 'Recipient of the funds', required: true}),
  amount: flags.integer({char: 'a', description: 'Amount of satoshis to send out of the contract', required: true}),
  wif: flags.string({char: 'w', description: 'WIF for private key to use for signing the transaction', required: true}),
}

module.exports = BobCommand
