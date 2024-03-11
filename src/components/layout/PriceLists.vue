<template>
	<div>
		<h1>Dostępne cenniki:</h1>
		<p v-if="!priceLists.length">Brak dostępnych cenników!</p>
		<ul v-else>
			<li v-for="priceList in priceLists" :key="priceList.id">
				<span>{{ priceList.id }}.</span>
				<span>{{ priceList.name }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'
export default {
	data() {
		return {
			priceLists: [],
		}
	},
	mounted() {
		this.getPriceLists()
	},
	methods: {
		async getPriceLists() {
			try {
				const authStore = useAuthStore()
				const token = authStore.token
				const res = await axios.get('http://127.0.0.1:8000/api/bo/priceLists', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				if (res.data) {
					this.priceLists = res.data.data
				}
			} catch (error) {
				console.error('Błąd podczas pobierania danych:', error)
			}
		},
	},
}
</script>

<style scoped>
h1 {
	border-bottom: 2px solid white;
}
p {
	padding: 1rem 0;
	text-align: center;
	font-size: 2rem;
}
ul {
	list-style-type: none;
	margin-top: 2rem;
}
li {
	display: flex;
	gap: 0.5rem;
	background-color: orange;
	padding: 1rem;
}
li:hover {
	background-color: rgb(226, 153, 17);
}
</style>
