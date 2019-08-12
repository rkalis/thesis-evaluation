const {Command, flags} = require('@oclif/command')
const {bitbox, contractInstance} = require('../global')
const {Sig} = require('cashscript')

// will suceed
// ./bin/run bob -t bchtest:qqsd2c2s4hdhelzprchggm27s3lt2ngmughvnhhj4f -a 1 -w=cVcmt7ZfnygxAuNuG15mTxfnK7cKeb3ziF6jTQKaApFc6EYqdWVs

class BobCommand extends Command {
  // IMPLEMENT THIS FUNCTION
  async run() {
    const {flags} = this.parse(BobCommand)

    const keypair = bitbox.ECPair.fromWIF(flags.wif);

    // Call the spend function with the owner's signature
    // And use it to send 0. 000 100 00 BCH back to the contract's address
    let tx;

    try {
      tx = await contractInstance.functions.bob(new Sig(keypair, 0x01)).send(contractInstance.address, 10000);
    } catch (err) {
      return console.error("Could not sent", err)
    }

    console.log('transaction details:', tx);
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
