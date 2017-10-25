'use strict'

const encryption = require('sodium-encryption')

const generateHTML = require('.')

const msg = Buffer.from(process.argv[2] || 'super secret message')
const key = encryption.key()
console.error('key:', key.toString('hex'))

const nonce = encryption.nonce()
const encrypted = encryption.encrypt(msg, nonce, key)
process.stdout.write(generateHTML(nonce, encrypted))
