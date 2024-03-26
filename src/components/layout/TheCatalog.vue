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
</template>

<script>
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'
export default {
	name: 'TheCatalog',
	data() {
		return {
			selectedFile: null,
		}
	},
	methods: {
		onFileSelected(event) {
			this.selectedFile = event.target.files[0]
		},
		onUpload() {
			const fd = new FormData()
			fd.append('file', this.selectedFile)
			instanceAxios
				.post('bo/catalogImages', fd)
				.then(res => {
					this.selectedFile = null
					document.getElementById('catalog-photo').value = ''
					Swal.fire({
						title: 'Sukces!',
						text: 'Ustawiono nowe zdjęcie!',
						icon: 'success',
					})
				})
				.catch(err => {
					console.error('Blad wysylania', err)
					Swal.fire({
						title: 'Błąd!',
						text: 'Wystąpił problem podczas aktualizacji zdjęcia!',
						icon: 'error',
					})
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
</style>
