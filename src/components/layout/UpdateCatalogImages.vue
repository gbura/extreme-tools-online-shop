<template>
	<div v-if="open" class="backdrop" @click="$emit('close')"></div>
	<transition name="modal">
		<div v-if="open" class="image-form">
			<div class="form-item">
				<button class="close-btn" @click="$emit('close')">
					<img src="../../assets/images/icons/X.png" alt="" />
				</button>
				<label for="photo">Dodaj zdjęcia do katalogu:</label>
				<input
					type="file"
					id="photo"
					name="photo"
					accept="image/png, image/jpg, image/jpeg"
					@change="onFileSelected"
					multiple />
			</div>
			<button class="confirm-changes-btn" @click="onUpload">Dodaj</button>
		</div>
	</transition>
</template>
<script>
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'
import { useCatalogImagesStore } from '@/stores/catalogImages.js'
export default {
	name: 'UpdateImage',
	props: ['open'],
	emits: ['close'],
	setup() {
		const catalogImagesStore = useCatalogImagesStore()
		return { catalogImagesStore }
	},
	data() {
		return {
			selectedFiles: [],
			duplicatedPhotos: [],
		}
	},
	methods: {
		onFileSelected(event) {
			this.selectedFiles = event.target.files
		},
		onUpload() {
			if (this.selectedFiles.length === 0) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Wybierz co najmniej jedno zdjęcie!',
					icon: 'error',
				})
				return
			}

			const fd = new FormData()
			const existingPhotos = this.catalogImagesStore.photos.map(photo => photo.name)

			for (let i = 0; i < this.selectedFiles.length; i++) {
				if (existingPhotos.includes(this.selectedFiles[i].name)) {
					this.duplicatedPhotos.push(this.selectedFiles[i].name)
				} else {
					fd.append('catalogImages[]', this.selectedFiles[i])
				}
			}
			if (this.duplicatedPhotos.length > 0) {
				Swal.fire({
					title: 'Błąd!',
					text: `Zdjęcia ${this.duplicatedPhotos.join(', ')} już istnieją!`,
					icon: 'error',
				})
				return
			}

			instanceAxios
				.post('bo/catalogImages', fd)
				.then(res => {
					this.selectedFiles = []
					document.getElementById('photo').value = ''
					Swal.fire({
						title: 'Sukces!',
						text: 'Dodano nowe zdjęcia!',
						icon: 'success',
					})
					this.catalogImagesStore.getPhotos()
				})
				.catch(err => {
					console.error('Błąd wysyłania', err)
				})
		},
	},
}
</script>

<style scoped>
.backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 10;
	background-color: rgba(0, 0, 0, 0.75);
}

.image-form {
	position: fixed;
	top: 50%;
	width: 50%;
	height: 45%;
	left: 50%;
	margin: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	border-radius: 12px;
	padding: 2rem 1rem;
	background-color: orange;
	border: none;
	transform: translate(-50%, -50%);
	z-index: 100;
}
.image-form .form-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	margin-bottom: 2rem;
}
.form-item .close-btn {
	position: absolute;
	top: 5px;
	right: 5px;
	border: none;
	background: none;
	cursor: pointer;
}
.close-btn img {
	width: 15px;
	height: 15px;
}
.form-item label {
	font-size: 2.4rem;
	margin-bottom: 2rem;
}
.form-item input {
	position: absolute;
	top: 50%;
	left: 37%;
	transform: translateY(-50%);
	padding: 1rem;
	width: 100%;
}
.confirm-changes-btn {
	display: block;
	margin: 0 auto;
	padding: 1rem;
	border: none;
	background-color: green;
	color: white;
	font-weight: bold;
	font-size: 2rem;
	border-radius: 8px;
	cursor: pointer;
}
.confirm-changes-btn:hover {
	background-color: rgb(3, 160, 3);
}
.modal-enter-active {
	animation: modal 0.3s ease-out;
}

.modal-leave-active {
	animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>
