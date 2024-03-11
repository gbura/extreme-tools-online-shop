import { defineStore } from 'pinia'
import instanceAxios from '@/axios'

export const useUsersStore = defineStore('users', {
	state: () => ({
		users: [],
	}),
	getters: {
		getUsers: state => state.users,
	},
	actions: {
		async fetchUsers() {
			try {
				const response = await instanceAxios.get('bo/users')
				if (response && response.data && response.data.data) {
					this.users = response.data.data.data
				}
			} catch (error) {
				console.error('Error fetching users:', error)
			}
		},
	},
})
