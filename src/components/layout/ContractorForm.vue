<template>
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
				<label for="contractor-address">Adres firmy:</label>
				<input
					type="text"
					id="contractor-address"
					name="contractor-address"
					v-model="contractorAddress"
					autocomplete="off" />
				<base-button>Stwórz nowego kontrahenta</base-button>
			</div>
		</form>
	</div>
</template>

<script>
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth.js'
import BaseButton from '@/components/ui/BaseButton.vue'
export default {
	name: 'ContractorForm',
	components: { BaseButton },
	setup() {
		const authstore = useAuthStore()
		return { authstore }
	},
	data() {
		return {
			contractorEmail: '',
			contractorName: '',
			contractorPassword: '',
			contractorAddress: '',
		}
	},

	methods: {
		async handleRegister() {
			if (!this.contractorEmail || !this.contractorPassword || !this.contractorName || !this.contractorAddress) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Proszę wypełnić wszystkie pola!',
					icon: 'error',
				})
				return
			}

			const response = await this.authstore.register(
				this.contractorEmail,
				this.contractorPassword,
				this.contractorName,
				this.contractorAddress
			)
			if (response.success) {
				Swal.fire({
					title: 'Sukces!',
					text: 'Udało się stworzyć nowego kontrahenta!',
					icon: 'success',
				})
				this.contractorEmail = ''
				this.contractorPassword = ''
				this.contractorName = ''
				this.contractorAddress = ''
			}
		},
	},
}
</script>

<style scoped>
.form-box {
	display: flex;
	justify-content: start;
	align-items: center;
	width: 50%;
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
</style>
