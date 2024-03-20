import { defineStore } from 'pinia'
import instanceAxios from '@/axios'
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
			const existingItemIndex = this.items.findIndex(existingItem => existingItem.code === item.code)
			if (existingItemIndex !== -1) {
				this.items[existingItemIndex].quantity += item.quantity
			} else {
				this.items.push(item)
			}
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
			const userId = Number(localStorage.getItem('userId'))
			const orderItems = this.items.map(item => ({
				ean: item.ean,
				name: item.name,
				code: item.code,
				price: item.price,
				pieces: item.quantity.toString(),
			}))
			const totalNet = parseFloat(this.sumCartPrice).toFixed(2).toString()
			const orderData = {
				userId: userId,
				totalNet: totalNet,
				orderItems: orderItems,
			}
			instanceAxios
				.post('ad/makeOrder', orderData)
				.then(res => {
					Swal.fire({
						title: 'Sukces!',
						text: 'Złożono zamówienie!',
						icon: 'success',
					}).then(() => {
						window.location.reload()
						// reload strony po udanym zamowieniu
					})
					this.removeAllItems()
				})
				.catch(err => {
					console.error('Blad podczas skladania zamowienia:', err)
				})
		},
		increaseItems(itemCode) {
			const itemToUpdate = this.items.find(item => item.code === itemCode)
			if (itemToUpdate) {
				itemToUpdate.quantity++
			}
			localStorage.setItem('items', JSON.stringify(this.items))
		},
		reduceItems(itemCode) {
			const itemToUpdate = this.items.find(item => item.code === itemCode)
			if (itemToUpdate && itemToUpdate.quantity > 1) {
				itemToUpdate.quantity--
			}
			localStorage.setItem('items', JSON.stringify(this.items))
		},
	},
})
