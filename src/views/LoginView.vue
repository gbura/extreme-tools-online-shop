<template>
	<div class="container">
		<div class="form-box">
			<form @submit.prevent="handleLogin">
				<div class="form-header">
					<h2>Zaloguj się</h2>
				</div>
				<div class="form-body">
					<label for="login">Login:</label>
					<input type="text" id="login" name="login" v-model="login" autocomplete="off" />
					<label for="login-password">Hasło:</label>
					<input type="password" id="login-password" name="login-password" v-model="password" autocomplete="off" />
				</div>
				<base-button>Logowanie</base-button>
			</form>
			<button class="forgot-pass-btn" @click="openPopup">Zapomniałem hasła</button>
		</div>
		<ForgotPassword :open="isPopupOpen" @close="closePopup" />
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import BaseButton from '../components/ui/BaseButton.vue'
import Swal from 'sweetalert2'
import ForgotPassword from '@/components/layout/ForgotPassword.vue'

export default {
	name: 'LoginView',
	components: { BaseButton, ForgotPassword },
	data() {
		return {
			login: '',
			password: '',
			isPopupOpen: false,
		}
	},
	setup() {
		const authstore = useAuthStore()
		return { authstore }
	},
	methods: {
		async handleLogin() {
			if (this.login && this.password) {
				try {
					await this.authstore.login(this.login, this.password)
					if (this.authstore.isAdmin) {
						this.$router.push('/admin-panel')
					} else {
						this.$router.push('/dashboard')
					}
				} catch {
					Swal.fire({
						title: 'Błąd!',
						text: 'Wystąpił błąd podczas logowania!',
						icon: 'error',
					})
				}
			} else {
				Swal.fire({
					title: 'Błąd!',
					text: 'Pola login i hasło są wymagane!',
					icon: 'error',
				})
			}
		},
		openPopup() {
			this.isPopupOpen = true
		},
		closePopup() {
			this.isPopupOpen = false
		},
	},
}
</script>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	width: 100%;
}
form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 600px;
	padding-bottom: 2rem;
	background: linear-gradient(rgb(221, 137, 80), #eca41e);
	border-radius: 4px;
	overflow: hidden;
}
.form-header {
	width: 100%;
	padding: 2rem;
	text-align: center;
	background-color: rgb(248, 118, 31);
}
.form-body {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 2rem;
}
.form-body label {
	margin-bottom: 0.5rem;
	font-size: 2rem;
}
.form-body input {
	width: 100%;
	margin-bottom: 1rem;
	padding: 2rem;
	outline: none;
	border: none;
	border-radius: 4px;
	font-size: 1.8rem;
}
.forgot-pass-btn {
	border: none;
	background: none;
	font-size: 1.6rem;
	color: white;
	cursor: pointer;
	margin-top: 0.5rem;
	transition: color 0.3s ease;
}
.forgot-pass-btn:hover {
	color: rgb(219, 218, 218);
}
</style>
