<template>
	<div class="container">
		<div class="left-section">
			<img src="../assets/images/auroraLogo.png" alt="Logo AURORA z narzędziami" class="logo" />
			<ContactList />
			<div class="login-btn-box">
				<router-link to="/login">
					<img src="../assets/images/loginImage.png" alt="" class="login-img" />
				</router-link>
			</div>
		</div>
		<div class="right-section">
			<img :src="imageUrl" alt="Zdjęcia narzędzi oraz loga" />
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'
import ContactList from '@/components/layout/ContactList.vue'
export default {
	name: 'WelcomeView',
	components: { ContactList },
	data() {
		return {
			imageUrl: '',
		}
	},
	// mounted() {
	// 	// do poprawy, brak autoryzacji
	// 	axios
	// 		.get('http://127.0.0.1:8000/api/bo/mainPhotos')
	// 		.then(response => {
	// 			this.imageUrl = response.data.data.url
	// 		})
	// 		.catch(error => {
	// 			console.error('Błąd pobierania obrazka z API:', error)
	// 		})
	// },
	mounted() {
		const authStore = useAuthStore()
		const token = authStore.token
		// do poprawy, nie ma dostepu do lok. pliku
		axios
			.get('http://127.0.0.1:8000/api/bo/mainPhotos', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				this.imageUrl = response.data.data.url
				console.log(this.imageUrl)
			})
			.catch(error => {
				console.error('Błąd pobierania obrazka z API:', error)
			})
	},
}
</script>

<style scoped>
.container {
	margin-top: 6rem;
	display: flex;
	justify-content: space-between;
	width: 100%;
}

.left-section,
.right-section {
	width: 50%;
}

.logo {
	width: 90%;
	max-width: 450px;
}

.login-btn-box {
	width: 80%;
	max-width: 300px;
}

.login-img {
	width: 100%;
}

.right-section img {
	width: 100%;
	height: 80vh;
}
</style>
