#!/usr/bin/env node
'use strict'

const mri = require('mri')
const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: ['help', 'h', 'version', 'v']
})

if (argv.help || argv.h) {
	process.stdout.write(`\
echo 'my secret message' | self-decrypting-html-page >encrypted-message.html 2>key.txt
`)
	process.exit()
}

if (argv.version || argv.v) {
	process.stdout.write(pkg.name + ' ' + pkg.version + '\n')
	process.exit(0)
}

const encryption = require('sodium-encryption')
const {isatty} = require('tty')
const generateHTML = require('.')

const asBuf = (readable) => new Promise((resolve, reject) => {
	const bufs = []
	readable.once('error', reject)
	readable.on('data', (data) => {
		bufs.push(Buffer.isBuffer(data) ? data : Buffer.from(data))
	})
	readable.once('end', () => resolve(Buffer.concat(bufs)))
})

const onError = (err) => {
	console.error(err + '')
	process.exit(1)
}

const printKey = (key) => {
	const asHex = key.toString('hex')
	if (isatty(process.stderr.fd)) console.error('This is your key:\n' + asHex)
	else process.stderr.write(asHex)
}

asBuf(process.stdin)
.then((secretMessage) => {
	const key = encryption.key()
	printKey(key)

	const nonce = encryption.nonce()
	const encrypted = encryption.encrypt(secretMessage, nonce, key)

	const html = generateHTML(nonce, encrypted)
	process.stdout.write(html)
})
.catch(onError)
