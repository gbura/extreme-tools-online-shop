import { defineStore } from 'pinia'
import instanceAxios from '@/axios'

export const usePhotosStore = defineStore('photosStore', {
	state: () => ({
		photos: [],
	}),
	actions: {
		async getPhotos() {
			try {
				const response = await instanceAxios.get('bo/images')
				const data = response.data.data
				this.photos = data
				console.log(this.photos)
			} catch (error) {
				console.error('Błąd pobierania danych', error)
			}
		},
	},
})
