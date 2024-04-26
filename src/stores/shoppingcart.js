import { defineStore } from 'pinia'
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'

export const useShoppingCartStore = defineStore('shoppingCartStore', {
	state: () => ({
		userId: localStorage.getItem('userId'),
		items: JSON.parse(localStorage.getItem(`items_${localStorage.getItem('userId')}`)) || [],
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

			localStorage.setItem(`items_${this.userId}`, JSON.stringify(this.items))
		},
		removeItem(id) {
			this.items = this.items.filter(item => item.code !== id)
			localStorage.setItem(`items_${this.userId}`, JSON.stringify(this.items))
		},
		removeAllItems() {
			this.items = []
			localStorage.removeItem(`items_${this.userId}`)
		},
		purchase() {
			const orderItems = this.items.map(item => ({
				ean: item.ean,
				name: item.name,
				code: item.code,
				price: item.price,
				pieces: item.quantity.toString(),
			}))
			const totalNet = parseFloat(this.sumCartPrice).toFixed(2).toString()
			const comment = document.getElementById('comment').value
			const orderData = {
				userId: this.userId,
				totalNet: totalNet,
				comment: comment,
				orderItems: orderItems,
			}
			instanceAxios
				.post('ad/makeOrder', orderData)
				.then(res => {
					Swal.fire({
						title: 'Zamówienie przyjęte!',
						text: 'Miłego dnia.',
						icon: 'success',
						customClass: {
							htmlContainer: 'green-subtext',
						},
					}).then(() => {
						window.location.reload()
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
			localStorage.setItem(`items_${this.userId}`, JSON.stringify(this.items))
		},
		reduceItems(itemCode) {
			const itemToUpdate = this.items.find(item => item.code === itemCode)
			if (itemToUpdate && itemToUpdate.quantity > 1) {
				itemToUpdate.quantity--
			}
			localStorage.setItem(`items_${this.userId}`, JSON.stringify(this.items))
		},
		generatePdf() {
			const orderItems = this.items.map(item => ({
				ean: item.ean,
				name: item.name,
				code: item.code,
				price: item.price,
				pieces: item.quantity.toString(),
			}))

			const comment = document.getElementById('comment').value
			const orderData = {
				userId: this.userId,
				comment: comment,
				orderItems: orderItems,
			}
			instanceAxios
				.post('ad/generatePdf', orderData, { responseType: 'blob' })
				.then(res => {
					const file = new Blob([res.data], { type: 'application/pdf' })
					const fileURL = URL.createObjectURL(file)
					window.open(fileURL, '_blank')
				})
				.catch(err => {
					console.error('Blad podczas pobierania PDF:', err)
				})
		},
	},
})
