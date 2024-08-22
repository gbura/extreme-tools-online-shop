<template>
	<div v-if="open" class="backdrop" @click="$emit('close')"></div>
	<transition name="modal">
		<form v-if="open" @keyup.enter="resetPassword" @submit.prevent="resetPassword" class="reset-pass-form">
			<div class="form-item">
				<button class="close-btn" @click.prevent="$emit('close')">
					<img src="../../assets/images/icons/X.png" alt="" class="delete-btn-img" />
				</button>
				<label for="pass">Podaj nowe hasło:</label>
				<input type="text" id="pass" name="pass" v-model="password" autocomplete="off" />
			</div>
			<div class="form-item">
				<label for="confirm-pass">Potwierdź hasło:</label>
				<input type="text" id="confirm-pass" name="confirm-pass" v-model="passwordConfirm" autocomplete="off" />
			</div>
			<button class="confirm-changes-btn">Zmień hasło</button>
		</form>
	</transition>
</template>

<script>
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'
export default {
	name: 'ResetPassword',
	props: ['open', 'userId'],
	emits: ['close'],
	data() {
		return {
			password: '',
			passwordConfirm: '',
		}
	},
	methods: {
		async resetPassword() {
			if (!this.password || !this.passwordConfirm || this.password !== this.passwordConfirm) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Uzupełnij pola w poprawny sposób!',
					icon: 'error',
				})
			} else {
				try {
					await instanceAxios.post(`ad/users/${this.userId}`, {
						password: this.password,
						newPassword: this.passwordConfirm,
					})
					Swal.fire({
						title: 'Sukces!',
						text: 'Hasło zresetowane!',
						icon: 'success',
					})
					this.password = ''
					this.passwordConfirm = ''
				} catch (error) {
					console.error('Błąd resetowania hasła:', error)
					Swal.fire({
						title: 'Błąd!',
						text: 'Wystąpił błąd podczas resetowania hasła. Spróbuj ponownie później.',
						icon: 'error',
					})
				}
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

.reset-pass-form {
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
.reset-pass-form .form-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 2rem;
}
.form-item label {
	font-size: 1.8rem;
	color: #fff;
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
