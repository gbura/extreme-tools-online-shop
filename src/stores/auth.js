import { defineStore } from 'pinia'
import instaceAxios from '@/axios'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: localStorage.getItem('BearerToken') || null,
		users: [],
	}),
	getters: {
		isAuthenticated: state => !!state.token,
		getUsers: state => state.users,
	},
	actions: {
		async login(email, password) {
			const response = await instaceAxios.post('authenticate', { email, password })
			const token = await response.data.data.token
			this.token = token
			localStorage.setItem('BearerToken', token)
		},
		async logout() {
			localStorage.removeItem('BearerToken')
			this.token = null
		},
		async register(email, password, name) {
			const response = await instaceAxios.post('users', {
				email,
				password,
				name,
			})
			return response.data
		},
		async fetchUsers() {
			try {
				const response = await instaceAxios.get('bo/users')
				if (response && response.data && response.data.data) {
					this.users = response.data.data
				}
			} catch (error) {
				console.error('Error fetching users:', error)
			}
		},
	},
})
