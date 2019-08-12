const {Command, flags} = require('@oclif/command')
const {bitbox, contractInstance} = require('../global')
const {Sig} = require('cashscript')

// will succeed:
// ./bin/run alice -t bchtest:qqftvzhuqj6z56phh3vsasq8atmchrnneu7ufc6ej5 -a 1 -w=cSU1aiAuMCc4xsSaRiuSscLQmc4uqs8bHv2riopVXiC8Wqgws7FS

// will fail:
// ./bin/run alice -t bchtest:qqftvzhuqj6z56phh3vsasq8atmchrnneu7ufc6ej5 -a 1 -w=cVcmt7ZfnygxAuNuG15mTxfnK7cKeb3ziF6jTQKaApFc6EYqdWVs

class AliceCommand extends Command {
  // IMPLEMENT THIS FUNCTION
  async run() {
    const {flags} = this.parse(AliceCommand)

    const keypair = bitbox.ECPair.fromWIF(flags.wif);

    // Call the spend function with the owner's signature
    // And use it to send 0. 000 100 00 BCH back to the contract's address
    let tx;

    try {
      tx = await contractInstance.functions.alice(new Sig(keypair, 0x01)).send(contractInstance.address, 10000);
    } catch (err) {
      return console.error("Could not sent", err)
    }

    console.log('transaction details:', tx);
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
