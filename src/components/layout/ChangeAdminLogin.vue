<template>
	<div v-if="open" class="backdrop" @click="$emit('close')"></div>
	<transition name="modal">
		<form v-if="open" @submit.prevent="changeLogin" class="change-admin-login-form">
			<div class="form-item">
				<button class="close-btn" @click.prevent="$emit('close')">
					<img src="../../assets/images/icons/X.png" alt="" class="delete-btn-img" />
				</button>
				<label for="admin-login">Podaj nowy login:</label>
				<input type="text" id="admin-login" name="admin-login" v-model="login" autocomplete="off" />
				<label for="new-login">Powtórz nowy login:</label>
				<input type="text" id="new-login" name="new-login" v-model="newLogin" autocomplete="off" />
			</div>
			<button class="confirm-changes-btn">Zmień login</button>
		</form>
	</transition>
</template>

<script>
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth.js'

export default {
	name: 'ChangeAdminLogin',
	props: ['open', 'userId'],
	emits: ['close'],
	setup() {
		const authstore = useAuthStore()
		return { authstore }
	},
	data() {
		return {
			login: '',
			newLogin: '',
		}
	},
	methods: {
		async changeLogin() {
			if ((!this.login && !this.newLogin) || this.login !== this.newLogin) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Uzupełnij pola w poprawny sposób!',
					icon: 'error',
				})
			} else {
				try {
					await instanceAxios.post(`bo/users/${this.userId}/setNewLogin`, {
						login: this.login,
						newLogin: this.newLogin,
					})
					Swal.fire({
						title: 'Sukces!',
						text: 'Ustawiono nowy login!',
						icon: 'success',
					})
					this.login = ''
					this.newLogin = ''
					this.authstore.logout()
					this.$router.push('/login')
					this.$emit('close')
				} catch (error) {
					console.error('Błąd podczas ustawiania loginu:', error)
					Swal.fire({
						title: 'Błąd!',
						text: 'Wystąpił błąd podczas ustawiania loginu. Spróbuj ponownie później.',
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

.change-admin-login-form {
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
.change-admin-login-form .form-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
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
