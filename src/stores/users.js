import { defineStore } from 'pinia'
import instanceAxios from '@/axios'

export const useUsersStore = defineStore('users', {
	state: () => ({
		users: [],
		priceLists: [],
		selectedPriceListId: null,
	}),
	// getters: {
	// 	getUsers: state => state.users,
	// },
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
		async fetchPriceLists() {
			try {
				const response = await instanceAxios.get('bo/priceLists')
				if (response.data.success) {
					this.priceLists = response.data.data
				}
			} catch (error) {
				console.error('Error fetching price lists:', error)
			}
		},
		async updatePriceList(userId, priceListId) {
			try {
				const response = await instanceAxios.post(`bo/priceLists/${priceListId}/attachUser/${userId}`)
				if (response.data.success) {
					// Aktualizacja magazynu po poprawnym przypisaniu cennika do użytkownika
					this.users.find(user => user.id === userId).priceList = priceListId
				}
			} catch (error) {
				console.error('Error updating price list:', error)
			}
		},
	},
})
