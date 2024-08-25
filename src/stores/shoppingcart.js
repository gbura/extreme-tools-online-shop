import { defineStore } from 'pinia'
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth.js'
import { debounce } from '@/utils/debounce'

export const useShoppingCartStore = defineStore('shoppingCartStore', {
	state: () => ({
		userId: useAuthStore().userId,
		items: [],
	}),
	getters: {
		sumCartPrice(state) {
			return state.items.reduce((acc, item) => {
				return acc + parseFloat(item.price) * item.quantity
			}, 0)
		},
	},
	actions: {
		async fetchItems() {
			const authStore = useAuthStore()
			this.userId = authStore.userId
			const res = await instanceAxios.get('ad/cartItems')
			if (res) {
				this.items = res.data.data
			} else {
				this.items = []
			}
		},

		async addItem(item) {
			const existingItemIndex = this.items.findIndex(existingItem => existingItem.code === item.code)

			if (existingItemIndex !== -1) {
				const existingItem = this.items[existingItemIndex]
				existingItem.quantity = item.quantity
			} else {
				this.items.push(item)
			}

			await this.postItems()
			localStorage.setItem(`items_${this.userId}`, JSON.stringify(this.items))
		},

		async postItems() {
			const userId = this.userId
			const itemsData = this.items.map(item => ({
				code: item.code,
				ean: item.ean,
				partId: item.id.toString(),
				name: item.name,
				price: item.price,
				quantity: item.quantity.toString(),
			}))

			await instanceAxios.post('ad/cart', {
				userId: userId,
				items: itemsData.length > 0 ? itemsData : [],
			})

			const res = await instanceAxios.get('ad/cartItems')
			this.items = res.data.data
		},

		async removeItem(code) {
			this.items = this.items.filter(item => item.code !== code)

			await this.postItems()
			await instanceAxios.get('ad/cartItems')
			localStorage.setItem(`items_${this.userId}`, JSON.stringify(this.items))
		},

		async removeAllItems() {
			this.items.forEach(item => {
				item.quantity = ''
			})
			this.items = []
			localStorage.removeItem(`items_${this.userId}`)

			await this.postItems()
			await instanceAxios.get('ad/cartItems')
		},

		async purchase() {
			const orderItems = this.items
				.map(item => ({
					ean: item.ean,
					name: item.name,
					code: item.code,
					price: item.price,
					pieces: item.quantity.toString(),
				}))
				.sort((a, b) => a.name.localeCompare(b.name))
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

		async increaseItems(itemCode) {
			const itemToUpdate = this.items.find(item => item.code === itemCode)
			if (itemToUpdate) {
				itemToUpdate.quantity = parseInt(itemToUpdate.quantity, 10) + 1

				await this.postItems()
				await instanceAxios.get('ad/cartItems')
				localStorage.setItem(`items_${this.userId}`, JSON.stringify(this.items))
			}
		},

		async reduceItems(itemCode) {
			const itemToUpdate = this.items.find(item => item.code === itemCode)
			if (itemToUpdate && itemToUpdate.quantity > 1) {
				itemToUpdate.quantity = parseInt(itemToUpdate.quantity, 10) - 1

				await this.postItems()
				await instanceAxios.get('ad/cartItems')
				localStorage.setItem(`items_${this.userId}`, JSON.stringify(this.items))
			}
		},

		async generatePdf() {
			const orderItems = this.items
				.map(item => ({
					ean: item.ean,
					name: item.name,
					code: item.code,
					price: item.price,
					pieces: item.quantity.toString(),
				}))
				.sort((a, b) => a.name.localeCompare(b.name))

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
