'use strict'

const fs = require('fs')
const path = require('path')
const withCustomHtml = require('./custom-html')

const html = fs.readFileSync(path.join(__dirname, '..', 'decrypt.html'), 'utf8')

const generateSelfCrypting = withCustomHtml(html)
module.exports = generateSelfCrypting
