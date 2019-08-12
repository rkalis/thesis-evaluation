const {Command, flags} = require('@oclif/command')
const {bitbox, contractInstance} = require('../global')
const {Sig} = require('cashscript')

// will fail;
// ./bin/run carol -t bchtest:qrr49yxr30rzukvrf6gqettwr8m5qjxhnyvcrtrsn5 -a 1 -w=cVLe9DA9SNBpbJFxPc64sWqNFXn8ANReNotXpjyMLpXj5zcoM1SZ -p 123

// will succeed;
// ./bin/run carol -t bchtest:qrr49yxr30rzukvrf6gqettwr8m5qjxhnyvcrtrsn5 -a 1 -w=cVLe9DA9SNBpbJFxPc64sWqNFXn8ANReNotXpjyMLpXj5zcoM1SZ -p 43617368536372697074

class CarolCommand extends Command {
  // IMPLEMENT THIS FUNCTION
  async run() {
    const {flags} = this.parse(CarolCommand)

    const keypair = bitbox.ECPair.fromWIF(flags.wif);

    // Call the carol function with the owner's signature
    // And use it to send 0. 000 100 00 BCH back to the contract's address
    let tx;

    try {
      tx = await contractInstance.functions.carol(new Sig(keypair, 0x01), flags.preimage)
      .send(contractInstance.address, 10000);
    } catch (err) {
      return console.error("Could not sent", err)
    }


    console.log('transaction details:', tx);
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
