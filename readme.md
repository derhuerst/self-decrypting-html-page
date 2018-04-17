# self-decrypting-html-page

**Generate a standalone HTML page that decrypts an encrypted message.** Used by [`html-vault`](https://github.com/derhuerst/html-vault#html-vault-).

[![npm version](https://img.shields.io/npm/v/self-decrypting-html-page.svg)](https://www.npmjs.com/package/self-decrypting-html-page)
[![build status](https://img.shields.io/travis/derhuerst/self-decrypting-html-page.svg)](https://travis-ci.org/derhuerst/self-decrypting-html-page)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/self-decrypting-html-page.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)

The idea is two have a tool that encrypts any message/secret and generates something that can decrypt itself. I see two advantages of the HTML-based solution over others:

- **low entry-barrier**: Everyone has a web browser. Everyone with a reasonably modern browser will be able to use the tool, without installing anything. It is also more platform-independent than other solutions.
- **self-contained**: The generated self-decrypting page contains all the logic it needs to decrypt the encrypted messages it contains. It can be easily stored as a file.

With `self-decrypting-html-page`, you can use this functionality anywhere. Consider the example below.


## Installing

```shell
npm install self-decrypting-html-page
```


## Usage

```js
const encryption = require('sodium-encryption')
const generateHTML = require('self-decrypting-html-page')

const msg = Buffer.from('super secret message')
const key = encryption.key()
console.log('key:', key.toString('hex'))

const nonce = encryption.nonce()
const encrypted = encryption.encrypt(msg, nonce, key)
const html = generateHTML(nonce, encrypted)
```


## How it works

- [`lib/decrypt.js`](lib/decrypt.js) contains the logic to decrypt the message, using the nonce and the password entered by the user.
- [`lib/decrypt.js` gets bundled with all its dependencies and stored in `decrypt.js`](https://github.com/derhuerst/self-decrypting-html-page/blob/546b4d9a6d9694df4fe498bdc53288216fa224a0/package.json#L36), using [Browserify](http://browserify.org).
- Then, using [brfs](https://www.npmjs.com/package/brfs), [the generated bundle will be inserted](https://github.com/derhuerst/self-decrypting-html-page/blob/546b4d9a6d9694df4fe498bdc53288216fa224a0/package.json#L37) into another JS file `generate.js`. The version of `self-decrypting-html-page` published to npm already contains it.
- When you call `generateHTML(nonce, encrypted)`, it will replace placeholders in the HTML (that already contains the code to decrypt) and give the final string back to you.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/self-decrypting-html-page/issues).
