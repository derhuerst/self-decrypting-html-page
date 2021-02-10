# self-decrypting-html-page

**Generate a standalone HTML page that decrypts an encrypted message.** Used by [`html-vault`](https://github.com/derhuerst/html-vault#html-vault-).

[![npm version](https://img.shields.io/npm/v/self-decrypting-html-page.svg)](https://www.npmjs.com/package/self-decrypting-html-page)
[![build status](https://img.shields.io/travis/derhuerst/self-decrypting-html-page.svg)](https://travis-ci.org/derhuerst/self-decrypting-html-page)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/self-decrypting-html-page.svg)
[![support me via GitHub Sponsors](https://img.shields.io/badge/support%20me-donate-fa7664.svg)](https://github.com/sponsors/derhuerst)
[![chat with me on Twitter](https://img.shields.io/badge/chat%20with%20me-on%20Twitter-1da1f2.svg)](https://twitter.com/derhuerst)

The idea is two have a tool that encrypts any message/secret and generates something that can *decrypt itself*. I see two advantages of the HTML-based solution over others:

- **low entry-barrier**: Everyone has a web browser. Everyone with a reasonably modern browser will be able to use the tool, without installing anything. It is also more platform-independent than other solutions.
- **self-contained**: The generated page has all the logic built-in that it needs to decrypt the encrypted message. It can be stored as a standalone file.

With `self-decrypting-html-page`, you can use this functionality anywhere. Consider the examples below.


## Usage from the command line

There are three ways to install this tool:

- standalone binaries from the [releases page](/derhuerst/self-decrypting-html-page/releases)
- installing globally using [npm](https://docs.npmjs.com/cli/npm): `npm install -g self-decrypting-html-page`
- temporarily installing it into a temp directory and running it, using [npx](https://npmjs.com/package/npx): `npx self-decrypting-html-page`

```shell
# basic usage
echo 'my secret message' | npx self-decrypting-html-page >encrypted-message.html
# This is your key:
# 964d87e28a7f468afe33c255e689d2baa5d67dabc43d6262971a5efd18917929

# write decryption key to file
echo 'my secret message' | npx self-decrypting-html-page >encrypted-message.html 2>key.txt
cat key.txt
# 964d87e28a7f468afe33c255e689d2baa5d67dabc43d6262971a5efd18917929
```


## Usage with JS

```shell
npm i self-decrypting-html-page
```

```js
const encryption = require('sodium-encryption')
const generateHTML = require('self-decrypting-html-page')

const msg = Buffer.from('super secret message')
const key = encryption.key()
console.log('key:', key.toString('hex'))

const nonce = encryption.nonce()
const encrypted = encryption.encrypt(msg, nonce, key)
const html = generateHTML(nonce, encrypted)
// write this HTML to a file, open in the browser
```


## Usage with custom HTML template

Write the template for self-decrypting HTML page. Check [`decrypt.html`](decrypt.html) for the necessary elements.

Generating a custom self-decrypting HTML page from the command line:

```shell
echo 'my secret message' | npx self-decrypting-html-page --html path/to/template.html >encrypted-message.html
```

Generating a it using JS:

```js
const {readFileSync} = require('fs')
const {join} = require('path')
const generateHTML = require('self-decrypting-html-page/custom-html')

const template = readFileSync(join(__dirname, 'template.html'))
const html = generateHTML(nonce, encrypted, template)
```


## How it works

- [`lib/decrypt.js`](lib/decrypt.js) contains the logic to decrypt the message, using the nonce and the password entered by the user.
- [`lib/decrypt.js` gets bundled with all its dependencies and stored in `decrypt.js`](https://github.com/derhuerst/self-decrypting-html-page/blob/546b4d9a6d9694df4fe498bdc53288216fa224a0/package.json#L36), using [Browserify](http://browserify.org).
- Then, using [brfs](https://www.npmjs.com/package/brfs), [the generated bundle will be inserted](https://github.com/derhuerst/self-decrypting-html-page/blob/546b4d9a6d9694df4fe498bdc53288216fa224a0/package.json#L37) into another JS file `generate.js`. The version of `self-decrypting-html-page` published to npm already contains it.
- When you call `generateHTML(nonce, encrypted)` or run it from the command line, it will replace placeholders in the HTML (that already contains the code to decrypt) and give the final string back to you.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/self-decrypting-html-page/issues).
