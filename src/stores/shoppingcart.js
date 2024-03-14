import { defineStore } from 'pinia'
import instaceAxios from '@/axios'
import Swal from 'sweetalert2'

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
			this.items = this.items.filter(item => item.code !== id)
			localStorage.setItem('items', JSON.stringify(this.items))
		},
		removeAllItems() {
			this.items = []
			localStorage.removeItem('items')
		},
		purchase() {
			// do poprawy, do zrobienia z API
			Swal.fire({
				title: 'Sukces!',
				text: 'Złożono zamówienie!',
				icon: 'success',
			})
			this.items = []
			localStorage.removeItem('items')
		},
	},
})
