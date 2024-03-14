import { defineStore } from 'pinia'
import axios from 'axios'

export const useEmailsStore = defineStore('emailsStore', {
	state: () => ({
		emails: [],
	}),
	actions: {
		addNewEmail(email) {
			this.emails.push(email)
			axios.post('http://127.0.0.1:8000/api/bo/emails', {})
		},
		removeEmail(email) {
			this.emails = this.emails.filter(item => item.email !== email)
		},
	},
})
