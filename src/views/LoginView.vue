<template>
	<div class="container">
		<div class="form-box">
			<form @submit.prevent="handleRegister" v-if="!isRegistered">
				<div class="form-header">
					<h2>Zarejestruj się</h2>
				</div>
				<div class="form-body">
					<label for="register-email">Adres e-mail:</label>
					<input type="email" id="register-email" name="register-email" v-model="rEmail" autocomplete="off" />
					<label for="register-password">Hasło:</label>
					<input
						type="password"
						id="register-password"
						name="register-password"
						v-model="rPassword"
						autocomplete="off" />
					<label for="register-name">Imie:</label>
					<input type="text" id="register-name" name="register-name" v-model="rName" autocomplete="off" />
					<base-button>Zarejestruj</base-button>
				</div>
			</form>
		</div>
		<div class="form-box">
			<form @submit.prevent="handleLogin">
				<div class="form-header">
					<h2>Zaloguj się</h2>
				</div>
				<div class="form-body">
					<label for="login-email">Adres e-mail:</label>
					<input type="text" id="login-email" name="login-email" v-model="lEmail" autocomplete="off" />
					<label for="login-password">Hasło:</label>
					<input type="password" id="login-password" name="login-password" v-model="lPassword" autocomplete="off" />
					<base-button>Zaloguj</base-button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue'
import { useAuthStore } from '@/stores/auth.js'
import Swal from 'sweetalert2'

export default {
	name: 'LoginView',
	components: { BaseButton },
	data() {
		return {
			lEmail: '',
			lPassword: '',
			rEmail: '',
			rPassword: '',
			rName: '',
			isRegistered: false,
		}
	},
	setup() {
		const authstore = useAuthStore()
		return { authstore }
	},
	methods: {
		async handleLogin() {
			if (this.lEmail && this.lPassword) {
				await this.authstore.login(this.lEmail, this.lPassword)
				this.$router.push('/home')
			} else {
				Swal.fire({
					title: 'Błąd!',
					text: 'Podałeś błędne dane!',
					icon: 'error',
				})
			}
		},
		async handleRegister() {
			if (!this.rEmail || !this.rPassword || !this.rName) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Proszę wypełnić wszystkie pola!',
					icon: 'error',
				})
				return
			}

			const response = await this.authstore.register(this.rEmail, this.rPassword, this.rName)
			if (response.success) {
				Swal.fire({
					title: 'Sukces!',
					text: 'Udało się zarejestrować! Potwierdź adres e-mail na swojej skrzynce w celu kontynuacji.',
					icon: 'success',
				})
				this.isRegistered = true
			}
		},
	},
}
</script>

<style scoped>
.form-box {
	width: 100%;
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 4rem;
	color: white;
}
form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: linear-gradient(#ecaf2bd7, #b37604);
	border-radius: 4px;
	overflow: hidden;
	width: 100%;
}
.form-header {
	background-color: rgb(255, 101, 1);
	width: 100%;
	text-align: center;
	padding: 1rem;
}
.form-body {
	display: flex;
	flex-direction: column;
	padding: 2rem;
	width: 100%;
}
.form-body label {
	margin-bottom: 0.5rem;
}
.form-body input {
	margin-bottom: 2rem;
	padding: 1.5rem;
	width: 100%;
	outline: none;
	border: none;
	border-radius: 4px;
}

@media (min-width: 768px) {
	.container {
		flex-direction: row;
	}
}
</style>
