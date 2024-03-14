import { defineStore } from 'pinia'
import instanceAxios from '@/axios'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: localStorage.getItem('BearerToken') || null,
		userId: localStorage.getItem('userId') || null,
	}),
	getters: {
		isAuthenticated: state => !!state.token,
	},
	actions: {
		async login(email, password) {
			const response = await instanceAxios.post('authenticate', { email, password })
			const token = await response.data.data.token
			const userId = await response.data.data.user.id
			this.token = token
			this.userId = userId
			localStorage.setItem('BearerToken', token)
			localStorage.setItem('userId', userId)
		},
		async logout() {
			localStorage.removeItem('BearerToken')
			localStorage.removeItem('userId')
			this.token = null
			this.userId = null
		},
		async register(email, password, companyName, companyAddress) {
			const response = await instanceAxios.post('bo/users', {
				email,
				password,
				companyName,
				companyAddress,
			})
			return response.data
		},
	},
})
