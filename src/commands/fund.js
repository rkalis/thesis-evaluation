const {Command, flags} = require('@oclif/command')
const {bitbox, network, contractInstance} = require('../global')

class FundCommand extends Command {
  async run() {
    const {flags} = this.parse(FundCommand)

    const keypair = bitbox.ECPair.fromWIF(flags.wif)
    const address = bitbox.ECPair.toCashAddress(keypair)

    const txBuilder = new bitbox.TransactionBuilder(network)
    const outputs = [{to: contractInstance.address, amount: flags.amount}]
    const {utxos, change} = selectUtxos((await bitbox.Address.utxo(address)).utxos, outputs)

    utxos.forEach(utxo => {
      txBuilder.addInput(utxo.txid, utxo.vout)
    })

    outputs.forEach(output => {
      txBuilder.addOutput(output.to, output.amount)
    })

    if (change >= 546) {
      txBuilder.addOutput(address, change)
    }

    utxos.forEach((utxo, i) => {
      let redeemScript

      txBuilder.sign(
        i,
        keypair,
        redeemScript,
        txBuilder.hashTypes.SIGHASH_ALL,
        utxo.satoshis
      )
    })

    const tx = txBuilder.build()
    const txid = await bitbox.RawTransactions.sendRawTransaction(tx.toHex())
    this.log(txid)
  }
}

FundCommand.description = 'Send money to the contract'

FundCommand.flags = {
  amount: flags.integer({char: 'a', description: 'Amount of satoshis to send to the contract', required: true}),
  wif: flags.string({char: 'w', description: 'WIF for private key to use for signing the transaction', required: true}),
}

module.exports = FundCommand

function selectUtxos(utxos, outputs) {
  const initialFee = bitbox.BitcoinCash.getByteCount({}, {P2PKH: outputs.length + 1})
  let satsNeeded = outputs.reduce((acc, output) => acc + output.amount, initialFee)
  let satsAvailable = 0

  const selected = []
  for (const utxo of utxos) {
    selected.push(utxo)
    satsAvailable += utxo.satoshis
    satsNeeded += 150
    if (satsAvailable > satsNeeded) break
  }

  const change = satsAvailable - satsNeeded

  if (change < 0) {
    throw new Error(`Insufficient balance: available (${satsAvailable}) < needed (${satsNeeded}).`)
  }

  return {utxos: selected, change}
}
