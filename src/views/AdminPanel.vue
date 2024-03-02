<template>
	<div class="container">
		<div class="form-box">
			<form @submit.prevent="handleRegister">
				<div class="form-header">
					<h2>Zarejestruj nowego kontrahenta</h2>
				</div>
				<div class="form-body">
					<label for="contractor-email">Adres e-mail:</label>
					<input
						type="email"
						id="contractor-email"
						name="contractor-email"
						v-model="contractorEmail"
						autocomplete="off" />
					<label for="contractor-password">Hasło:</label>
					<input
						type="password"
						id="contractor-password"
						name="contractor-password"
						v-model="contractorPassword"
						autocomplete="off" />
					<label for="contractor-name">Nazwa firmy:</label>
					<input type="text" id="contractor-name" name="contractor-name" v-model="contractorName" autocomplete="off" />
					<label for="contractor-nip">NIP:</label>
					<input type="text" id="contractor-nip" name="contractor-nip" v-model="contractorNip" autocomplete="off" />
					<label for="contractor-address">Adres firmy:</label>
					<input
						type="text"
						id="contractor-address"
						name="contractor-address"
						v-model="contractorAddress"
						autocomplete="off" />
					<label for="description">Notatka:</label>
					<input type="text" id="description" name="description" v-model="description" autocomplete="off" />
					<base-button>Stwórz nowego kontrahenta</base-button>
				</div>
			</form>
		</div>
		<div class="users-box">
			<TheContractors :users="authstore.users.data" />
		</div>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import Swal from 'sweetalert2'
import BaseButton from '@/components/ui/BaseButton.vue'
import TheContractors from '@/components/layout/TheContractors.vue'
export default {
	name: 'AdminPanel',
	components: { BaseButton, TheContractors },
	setup() {
		const authstore = useAuthStore()
		return { authstore }
	},
	data() {
		return {
			contractorEmail: '',
			contractorName: '',
			contractorPassword: '',
			contractorNip: '',
			contractorAddress: '',
			description: '',
		}
	},
	mounted() {
		this.showUsers()
	},
	methods: {
		async handleRegister() {
			if (
				!this.contractorEmail ||
				!this.contractorPassword ||
				!this.contractorName ||
				!this.contractorNip ||
				!this.contractorAddress
			) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Proszę wypełnić wszystkie pola!',
					icon: 'error',
				})
				return
			}

			const response = await this.authstore.register(this.contractorEmail, this.contractorPassword, this.contractorName)
			if (response.success) {
				Swal.fire({
					title: 'Sukces!',
					text: 'Udało się stworzyć nowego kontrahenta!',
					icon: 'success',
				})
				this.contractorEmail = ''
				this.contractorPassword = ''
				this.contractorName = ''
				this.contractorNip = ''
				this.contractorAddress = ''
			}
		},
		async showUsers() {
			try {
				await this.authstore.fetchUsers()
			} catch (error) {
				console.error('Error fetching users:', error)
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
	margin-top: 5rem;
}
.form-box {
	display: flex;
	justify-content: start;
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

.users-box {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

@media (min-width: 768px) {
	.container {
		flex-direction: row;
	}
}
</style>
