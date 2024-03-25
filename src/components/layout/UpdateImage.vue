<template>
	<div v-if="open" class="backdrop" @click="$emit('close')"></div>
	<transition name="modal">
		<form v-if="open" @submit.prevent="onUpload" class="image-form">
			<div class="form-item">
				<label for="photo">Aktualizuj zdjęcie:</label>
				<input type="file" id="photo" name="photo" accept="image/png, image/jpg, image/jpeg" @change="onFileSelected" />
			</div>
			<button class="confirm-changes-btn">Zaaktualizuj</button>
		</form>
	</transition>
</template>
<script>
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'
export default {
	name: 'UpdateImage',
	props: ['open'],
	emits: ['close'],
	data() {
		return {
			selectedFile: null,
			selectedFileCode: '',
		}
	},
	methods: {
		onFileSelected(event) {
			this.selectedFile = event.target.files[0]
			const fileName = event.target.files[0].name
			this.selectedFileCode = fileName.slice(0, -4)
			console.log(this.selectedFile)
			console.log(this.selectedFileCode)
		},
		onUpload() {
			const fd = new FormData()
			fd.append('file', this.selectedFile)
			fd.append('code', this.selectedFileCode)
			console.log(fd)
			instanceAxios
				.post('bo/images', fd)
				.then(res => {
					console.log(res)
					this.selectedFile = null
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
