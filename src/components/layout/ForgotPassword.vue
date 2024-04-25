<template>
	<div v-if="open" class="backdrop" @click="$emit('close')"></div>
	<transition name="modal">
		<form v-if="open" @submit.prevent="forgotPassword" class="forgot-pass-form">
			<div class="form-item">
				<button class="close-btn" @click.prevent="$emit('close')">
					<img src="../../assets/images/icons/X.png" alt="" class="delete-btn-img" />
				</button>
				<label for="login">Podaj login:</label>
				<input type="text" id="login" name="login" v-model="login" autocomplete="off" />
			</div>
			<button class="confirm-changes-btn">Wyślij nowe hasło</button>
		</form>
	</transition>
</template>

<script>
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'
export default {
	name: 'ForgotPassword',
	props: ['open'],
	emits: ['close'],
	data() {
		return {
			login: '',
		}
	},
	methods: {
		async forgotPassword() {
			if (!this.login) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Podaj poprawny login!',
					icon: 'error',
				})
				return
			}

			try {
				await instanceAxios.post('forgotPassword', { login: this.login })
				Swal.fire({
					title: 'Sukces!',
					text: 'Wiadomość z resetem hasła została wysłana!',
					icon: 'success',
				})
				this.login = ''
			} catch (error) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Wystąpił błąd podczas wysyłania wiadomości resetującej hasło!',
					icon: 'error',
				})
			}
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

.forgot-pass-form {
	position: fixed;
	top: 50%;
	width: 30%;
	height: 25%;
	left: 50%;
	margin: 0;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	border-radius: 12px;
	padding: 2rem 1rem;
	background-color: rgb(255, 101, 1);
	border: none;
	transform: translate(-50%, -50%);
	z-index: 100;
}
.forgot-pass-form .form-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 2rem;
}
.form-item label {
	font-size: 1.8rem;
}
.form-item input {
	outline: none;
	border: none;
	padding: 1rem;
	width: 80%;
}
.confirm-changes-btn {
	display: block;
	margin: 0 auto;
	padding: 0.5rem;
	border: none;
	background-color: green;
	color: white;
	font-weight: bold;
	font-size: 1.6rem;
	border-radius: 8px;
	cursor: pointer;
}
.confirm-changes-btn:hover {
	background-color: rgb(3, 160, 3);
}
.close-btn {
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
