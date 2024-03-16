<template>
	<div>
		<label for="main-image">Zmień zdjęcie na stronie głównej:</label>
		<input
			type="file"
			id="main-image"
			name="main-image"
			accept="image/png, image/jpeg, image/jpg"
			multiple
			@change="onFileSelected" />
		<button @click="onUpload">Zaaktualizuj</button>
	</div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'
export default {
	name: 'ChangeMainSite',
	setup() {
		const authStore = useAuthStore()
		return { authStore }
	},
	data() {
		return {
			selectedFile: null,
		}
	},
	methods: {
		onFileSelected(event) {
			this.selectedFile = event.target.files[0]
			console.log(this.selectedFile)
		},
		onUpload() {
			// do poprawy, error 401 (auth)
			const fd = new FormData()
			const token = this.authStore.token
			fd.append('file', this.selectedFile)
			// 422
			console.log(fd)
			axios
				.post('http://127.0.0.1:8000/api/bo/mainPhotos', fd, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then(res => {
					console.log(res)
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
#price-list {
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
