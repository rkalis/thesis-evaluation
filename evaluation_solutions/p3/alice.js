const {Command, flags} = require('@oclif/command')
const {bitbox, contractInstance} = require('../global')
const { Sig } = require('cashscript')

class AliceCommand extends Command {
  async run() {
    const {flags} = this.parse(AliceCommand)
    const tx = await contractInstance.functions
      .alice(new Sig(bitbox.ECPair.fromWIF(flags.wif), 0x41))
      .send(flags.to, flags.amount)
      .catch(console.error)
    console.log(tx)
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
