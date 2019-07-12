const {BITBOX} = require('bitbox-sdk')

const network = 'testnet'
const bitbox = new BITBOX({restURL: 'https://trest.bitcoin.com/v2/'})

const alicePk = Buffer.from('021ed9d1795a0c4a10fabb9f4678c70015b6d4ee7a39fa2d9e5eec3b6465d6eeb0', 'hex')
const bobPk = Buffer.from('028ba2eb3ccd6aabdd381844f6eda1bb8968bc7f433b8028ab5cd3e3a80476c521', 'hex')
const carolPk = Buffer.from('028ee1e748dff218e8b4072251e61851ef1045f2e43509b91c8b986f27409f31e0', 'hex')

const dataHash = bitbox.Crypto.sha256(Buffer.from('43617368536372697074', 'hex'))
const timeout = 1000000

const contractInstance = createContractInstance(alicePk, bobPk, carolPk, dataHash, timeout, network)

// IMPLEMENT THIS FUNCTION
function createContractInstance(alicePk, bobPk, carolPk, dataHash, timeout, network) {
  return undefined
}

module.exports = {
  network,
  bitbox,
  contractInstance,
}
