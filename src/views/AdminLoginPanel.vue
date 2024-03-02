<template>
	<div class="container">
		<div class="form-box">
			<form @submit.prevent="handleLogin">
				<div class="form-header">
					<h2>Zaloguj się do panelu admina</h2>
				</div>
				<div class="form-body">
					<label for="admin-email">Adres e-mail:</label>
					<input type="text" id="admin-email" name="admin-email" v-model="adminEmail" autocomplete="off" />
					<label for="admin-password">Hasło:</label>
					<input type="password" id="admin-password" name="admin-password" v-model="adminPassword" autocomplete="off" />
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
	name: 'AdminLoginPanel',
	components: { BaseButton },
	setup() {
		const authstore = useAuthStore()
		return { authstore }
	},
	data() {
		return {
			adminEmail: 'admin@admin.pl',
			adminPassword: 'adminADMIN',
		}
	},
	methods: {
		async handleLogin() {
			if (this.adminEmail && this.adminPassword) {
				await this.authstore.login(this.adminEmail, this.adminPassword)
				this.$router.push('/admin-panel')
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
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 4rem;
	color: white;
}
.form-box {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: linear-gradient(#ecaf2bd7, #b37604);
	border-radius: 4px;
	overflow: hidden;
	width: 50%;
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
</style>
