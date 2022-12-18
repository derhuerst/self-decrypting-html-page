'use strict'

const fs = require('fs')
const path = require('path')

const js = fs.readFileSync(path.join(__dirname, '..', 'decrypt.js'), 'utf8')

const withCustomHtml = (html) => {
	if ('string' !== typeof html) throw new Error('html must be a string.')

	const generateSelfDecrypting = (nonce, encrypted) => {
		if (!Buffer.isBuffer(nonce)) throw new Error('nonce must be a Buffer.')
		if (!Buffer.isBuffer(encrypted)) throw new Error('encrypted must be a Buffer.')

		return html
		.replace('{{nonce-script}}', `<script id="nonce" type="text/plain" nonce="{{nonce}}">${nonce.toString('hex')}</script>`)
		.replace('{{encrypted}}', `<script id="encrypted" type="text/plain" nonce="{{nonce}}">${encrypted.toString('hex')}</script>`)
		.replace('{{js}}', `<script nonce="{{nonce}}">${js}</script>`)
		.replaceAll('{{nonce}}', `${nonce.toString('hex')}`)
	}

	return generateSelfDecrypting
}

module.exports = withCustomHtml
