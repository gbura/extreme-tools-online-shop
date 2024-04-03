<template>
	<div>
		<label for="catalog-photo">Dodaj nowe zdjęcia do katalogu:</label>
		<input
			type="file"
			id="catalog-photo"
			name="catalog-photo"
			accept="image/png, image/jpg, image/jpeg"
			multiple
			@change="onFileSelected" />
		<button @click="onUpload">Wrzuć</button>
	</div>
	<div>
		<label for="delete-catalog-photo">Usuń zdjęcia z katalogu:</label>
		<input
			type="text"
			id="delete-catalog-photo"
			name="delete-catalog-photo"
			placeholder="Podaj numer lub numery zdjęć, np. 1,2,3"
			class="delete-catalog-photo-input"
			v-model="selectedNumbers" />
		<button @click="onDelete">Usuń</button>
	</div>
</template>

<script>
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'
export default {
	name: 'TheCatalog',
	data() {
		return {
			selectedFile: null,
			selectedNumbers: '',
			photosData: [],
		}
	},
	mounted() {
		this.getPhotosData()
	},
	methods: {
		onFileSelected(event) {
			if (event.target.files.length > 0) {
				this.selectedFiles = event.target.files
			} else {
				this.selectedFiles = null
			}
		},
		onUpload() {
			if (!this.selectedFiles || this.selectedFiles.length === 0) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Wybierz co najmniej jedno zdjęcie!',
					icon: 'error',
				})
				return
			}

			const fd = new FormData()
			for (let i = 0; i < this.selectedFiles.length; i++) {
				fd.append('catalogImages[]', this.selectedFiles[i])
			}

			instanceAxios
				.post('bo/catalogImages', fd)
				.then(res => {
					this.selectedFiles = null
					document.getElementById('catalog-photo').value = ''
					Swal.fire({
						title: 'Sukces!',
						text: 'Ustawiono nowe zdjęcia!',
						icon: 'success',
					})
				})
				.catch(err => {
					console.error('Błąd wysyłania', err)
				})
		},
		getPhotosData() {
			instanceAxios.get('bo/catalogImages').then(res => {
				this.photosData = res.data.data
			})
		},
		onDelete() {
			const idsToDelete = this.selectedNumbers.split(',').map(id => parseInt(id.trim()))
			if (idsToDelete.some(isNaN) || idsToDelete.length === 0) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Podaj poprawne numery zdjęć do usunięcia!',
					icon: 'error',
				})
				return
			}
			const allIdsExist = idsToDelete.every(id => this.photosData.some(photo => photo.id === id))
			if (!allIdsExist) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Nie można odnaleźć wszystkich zdjęć do usunięcia!',
					icon: 'error',
				})
				return
			}

			instanceAxios
				.delete('bo/catalogImages', {
					data: {
						catalogImageIds: idsToDelete,
					},
				})
				.then(res => {
					Swal.fire({
						title: 'Sukces!',
						text: 'Usunięto wybrane zdjęcia!',
						icon: 'success',
					})
					this.selectedNumbers = ''
					this.getPhotosData()
				})
				.catch(err => {
					console.error('Błąd podczas usuwania zdjęć', err)
				})
		},
	},
}
</script>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	width: 500px;
	height: 300px;
	padding: 3rem;
	background-color: orange;
	border-radius: 15px;
}
#catalog-photo {
	display: block;
	margin: 0 auto;
	width: 50%;
}
label {
	font-size: 2rem;
	margin-bottom: 1rem;
	border-bottom: 1px solid white;
}
button {
	width: 150px;
	padding: 1rem;
	border: none;
	background-color: rgb(141, 93, 5);
	border-radius: 15px;
	color: white;
	font-size: 2rem;
	cursor: pointer;
}
button:hover {
	background-color: rgb(104, 71, 10);
}
.delete-catalog-photo-input {
	padding: 1rem 2rem;
	width: 100%;
	outline: none;
	border: none;
	border-radius: 8px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
