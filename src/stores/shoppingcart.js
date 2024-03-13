import { defineStore } from 'pinia'
// import instaceAxios from '@/axios'

export const useShoppingCartStore = defineStore('shoppingCartStore', {
	state: () => ({
		items: JSON.parse(localStorage.getItem('items')) || [],
	}),
	getters: {
		sumCartPrice(state) {
			return state.items.reduce((acc, item) => {
				return acc + parseFloat(item.price) * item.quantity
			}, 0)
		},
	},
	actions: {
		addItem(item) {
			this.items.push(item)
			localStorage.setItem('items', JSON.stringify(this.items))
		},
		removeItem(id) {
			this.items.filter(item => item.kod !== id)
			localStorage.setItem('items', JSON.stringify(this.items))
		},
		removeAllItems() {
			this.items = []
			localStorage.removeItem('items')
		},
	},
})
