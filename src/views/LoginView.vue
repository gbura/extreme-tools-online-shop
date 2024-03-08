<template>
	<div class="container">
		<div class="form-box">
			<form @submit.prevent="handleLogin">
				<div class="form-header">
					<h2>Zaloguj się</h2>
				</div>
				<div class="form-body">
					<label for="login-email">Adres e-mail:</label>
					<input type="text" id="login-email" name="login-email" v-model="email" autocomplete="off" />
					<label for="login-password">Hasło:</label>
					<input type="password" id="login-password" name="login-password" v-model="password" autocomplete="off" />
				</div>
				<base-button>Logowanie</base-button>
			</form>
		</div>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import BaseButton from '../components/ui/BaseButton.vue'
import Swal from 'sweetalert2'

export default {
	name: 'LoginView',
	components: { BaseButton },
	data() {
		return {
			email: '',
			password: '',
		}
	},
	setup() {
		const authstore = useAuthStore()
		return { authstore }
	},
	methods: {
		async handleLogin() {
			if (this.email && this.password) {
				await this.authstore.login(this.email, this.password)
				this.$router.push('/home')
			} else {
				Swal.fire({
					title: 'Błąd!',
					text: 'Podałeś błędne dane!',
					icon: 'error',
				})
			}
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
</style>
