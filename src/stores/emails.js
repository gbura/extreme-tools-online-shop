import { defineStore } from 'pinia'
import axios from 'axios'

export const useEmailsStore = defineStore('emailsStore', {
	state: () => ({
		emails: [],
	}),
    actions: {
        addNewEmail(email) {
            this.emails.push(email)
        }
    }
})
