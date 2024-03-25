import { defineStore } from 'pinia'
import instanceAxios from '@/axios'

export const usePhotosStore = defineStore('photosStore', {
	state: () => ({
		paginate: {
			currentPage: 1,
			totalPages: 1,
			perPage: 15,
		},
		photos: [],
	}),
	actions: {
		async getPhotos() {
			try {
				const response = await instanceAxios.get(
					`bo/images?page=${this.paginate.currentPage}&perPage=${this.paginate.perPage}`
				)
				const data = response.data.data
				this.photos = data.data
				this.paginate = data.paginate
			} catch (error) {
				console.error('Błąd pobierania danych', error)
			}
		},
		nextPage() {
			if (this.paginate.currentPage < this.paginate.totalPages) {
				this.paginate.currentPage++
				this.getPhotos()
			}
		},
		previousPage() {
			if (this.paginate.currentPage > 1) {
				this.paginate.currentPage--
				this.getPhotos()
			}
		},
	},
})
