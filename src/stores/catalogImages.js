import { defineStore } from 'pinia'
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'

export const useCatalogImagesStore = defineStore('catalogImagesStore', {
	state: () => ({
		photos: [],
	}),
	actions: {
		async getPhotos() {
			try {
				const response = await instanceAxios.get('bo/catalogImages')
				const data = response.data.data
				this.photos = data
			} catch (error) {
				console.error('Błąd pobierania danych', error)
			}
		},
		async deletePhoto(photoId) {
			try {
				const response = await instanceAxios.delete('bo/catalogImages', {
					data: {
						catalogImageIds: [photoId],
					},
				})
				if (response.status === 200) {
					Swal.fire({
						title: 'Sukces!',
						text: 'Usunięto zdjęcie!',
						icon: 'success',
					})
					this.getPhotos()
				} else {
					Swal.fire({
						title: 'Błąd!',
						text: 'Błąd podczas usuwania zdjęcia!',
						icon: 'error',
					})
				}
			} catch (error) {
				console.error('Błąd podczas usuwania zdjęcia', error)
			}
		},
	},
})
