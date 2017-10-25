'use strict'

const {decrypt} = require('sodium-encryption')

const hintEl = document.getElementById('hint')
const keyEl = document.getElementById('key')
const nonceEl = document.getElementById('nonce')
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

	if (keyEl.value.length === 0) {
		return showError(keyEl, 'Please enter a key.')
	}
	const key = Buffer.from(keyEl.value, 'hex')
	console.log('key', key) // todo

	if (nonceEl.value.length === 0) {
		return showError(nonceEl, 'Please enter a nonce.')
	}
	const nonce = Buffer.from(nonceEl.value, 'hex')
	console.log('nonce', nonce) // todo

	try {
		// todo
	} catch (err) {
		const msg = decrypt(encrypted, nonce, key)
		console.log('msg', msg) // todo

		// return showError(submitEl, 'The password seems to be wrong.')
		return showError(submitEl, err.message || err + '')
	}
}

const encryptedEl = document.getElementById('encrypted')
let encrypted = null
if (encryptedEl && encryptedEl.innerText) {
	encrypted = Buffer.from(encryptedEl.innerText, 'hex')
	submitEl.addEventListener('click', onSubmit, false)
} else {
	showError(submitEl, 'Encrypted data missing.')
	keyEl.disabled = nonceEl.disabled = submitEl.disabled = true
}
