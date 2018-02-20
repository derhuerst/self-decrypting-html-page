# self-decrypting-html-page

**Generate a standalone HTML page that decrypts an encrypted message.** Used by [`html-vault`](https://github.com/derhuerst/html-vault#html-vault-). See [#1](https://github.com/derhuerst/self-decrypting-html-page/issues/1) for more details.

[![npm version](https://img.shields.io/npm/v/self-decrypting-html-page.svg)](https://www.npmjs.com/package/self-decrypting-html-page)
[![build status](https://img.shields.io/travis/derhuerst/self-decrypting-html-page.svg)](https://travis-ci.org/derhuerst/self-decrypting-html-page)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/self-decrypting-html-page.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


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


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/self-decrypting-html-page/issues).
