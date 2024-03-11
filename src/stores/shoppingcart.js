import { defineStore } from 'pinia'
import instaceAxios from '@/axios'

export const shoppingCartStore = defineStore('shoppingCartStore', {
	state: () => ({
		items: localStorage.getItem('shoppingItem') || null,
	}),
})
