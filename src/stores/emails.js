import { defineStore } from 'pinia'
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'

export const useEmailsStore = defineStore('emailsStore', {
	state: () => ({
		emails: [],
	}),
	actions: {
		async fetchEmails() {
			try {
				const response = await instanceAxios.get('bo/emails')
				this.emails = response.data.data.data
			} catch (error) {
				console.error('Blad pobierania emaili z bazy danych', error)
			}
		},
		async addEmail(email) {
			try {
				const response = await instanceAxios.post('bo/emails', { email })
				this.emails.push(response.data.data)
				Swal.fire({
					title: 'Sukces!',
					text: 'Dodałeś nowy adres e-mail!',
					icon: 'success',
				})
			} catch (error) {
				console.error('Błąd dodawania', error)
				Swal.fire({
					title: 'Błąd!',
					text: 'Wystąpił błąd podczas dodawania adresu e-mail!',
					icon: 'error',
				})
			}
		},
		async removeEmail(emailId) {
			try {
				await instanceAxios.delete(`bo/emails/${emailId}`)
				this.emails = this.emails.filter(email => email.email !== emailId)
				Swal.fire({
					title: 'Sukces!',
					text: 'Usunięto adres e-mail!',
					icon: 'success',
				})
			} catch (error) {
				console.error('Błąd usuwania', error)
				Swal.fire({
					title: 'Błąd!',
					text: 'Wystąpił błąd podczas usuwania adresu e-mail!',
					icon: 'error',
				})
			}
		},
	},
})
