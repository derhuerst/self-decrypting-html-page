'use strict'

const {decrypt} = require('sodium-encryption')

const hintEl = document.getElementById('hint')
const keyEl = document.getElementById('key')
const submitEl = document.getElementById('submit')
const messageEl = document.getElementById('message')

const resetForm = () => {
	hintEl.classList.add('hidden')
	keyEl.classList.remove('error')
	submitEl.classList.remove('error')
	messageEl.innerText = ''
}
const showError = (el, message) => {
	el.classList.add('error')
	hintEl.innerText = message
	hintEl.classList.remove('hidden')
}

const onSubmit = () => {
	resetForm()

	try {
		if (keyEl.value.length === 0) {
			return showError(keyEl, 'Please enter a key.')
		}
		const key = Buffer.from(keyEl.value, 'hex')
		const msg = decrypt(encrypted, nonce, key)

		messageEl.innerText = 'The message is:\n' + msg.toString('utf8')
		messageEl.classList.remove('hidden')
	} catch (err) {
		console.error(err)
		return showError(submitEl, 'The key seems to be wrong.')
	}
}

const nonceEl = document.getElementById('nonce')
const encryptedEl = document.getElementById('encrypted')
let encrypted = null, nonce = null
if (nonceEl && nonceEl.innerText && encryptedEl && encryptedEl.innerText) {
	nonce = Buffer.from(nonceEl.innerText, 'hex')
	encrypted = Buffer.from(encryptedEl.innerText, 'hex')
	submitEl.addEventListener('click', onSubmit, false)
} else {
	showError(submitEl, 'Encrypted data missing.')
	keyEl.disabled = nonceEl.disabled = submitEl.disabled = true
}
