<template>
	<div class="prices-box">
		<h1>Dostępne cenniki:</h1>
		<div class="price-lists-container">
			<div class="price-list">
				<p v-if="!priceLists.length">Brak dostępnych cenników!</p>
				<ul v-else>
					<li v-for="priceList in priceLists" :key="priceList.id">
						<span>{{ priceList.id }}.</span>
						<span>{{ priceList.name }}</span>
						<button class="remove-item-btn" @click="removePriceList(priceList.id)">X</button>
					</li>
				</ul>
			</div>
			<div class="add-price-list-container">
				<input
					type="file"
					id="add-price-list-input"
					multiple
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					@change="onFileSelected" />
				<button class="add-price-list-btn" @click="uploadPriceList">Dodaj cennik</button>
			</div>
		</div>
	</div>
</template>

<script>
import Swal from 'sweetalert2'
import instanceAxios from '@/axios'
import { useAuthStore } from '@/stores/auth.js'
export default {
	data() {
		return {
			priceLists: [],
			selectedFile: null,
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
				const res = await instanceAxios.get('bo/priceLists', {
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
		async removePriceList(id) {
			try {
				await instanceAxios.delete(`bo/priceLists/${id}`)
				this.priceLists = this.priceLists.filter(priceList => priceList.id !== id)
			} catch (error) {
				console.error('Błąd podczas usuwania cennika:', error)
			}
		},
		onFileSelected(event) {
			this.selectedFile = event.target.files[0]
			console.log(this.selectedFile)
		},
		async uploadPriceList(e) {
			const fd = new FormData()
			fd.append('file', this.selectedFile)

			const fileExists = this.priceLists.some(priceList => priceList.name === this.selectedFile.name)
			if (fileExists) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Cennik o takiej nazwie już istnieje!',
					icon: 'error',
				})
			} else {
				try {
					await instanceAxios.post('bo/priceLists', fd)
					this.getPriceLists()
				} catch (error) {
					console.error('Błąd podczas przesyłania cennika:', error)
				}
			}
		},
	},
}
</script>

<style scoped>
.prices-box {
	width: 100%;
}
.price-lists-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}
.price-list,
.add-price-list-container {
	width: 600px;
	margin-top: 2rem;
}
.price-list {
	background-color: orange;
}
.add-price-list-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	background-color: orange;
	padding: 1rem 0;
	border-radius: 8px;
	width: 40%;
}
.add-price-list-btn {
	padding: 0.5rem;
	border: none;
	background-color: rgb(255, 108, 11);
	border-radius: 8px;
	font-size: 2rem;
	color: white;
	cursor: pointer;
}
.add-price-list-btn:hover {
	background-color: rgb(250, 121, 35);
}
h1 {
	border-bottom: 2px solid white;
	text-align: center;
}
p {
	padding: 1rem 0;
	text-align: center;
	font-size: 2rem;
}
ul {
	list-style-type: none;
	max-height: 300px;
	overflow-y: hidden;
}

li {
	position: relative;
	display: flex;
	gap: 0.5rem;
	background-color: orange;
	padding: 1rem;
}
li:hover {
	background-color: rgb(226, 153, 17);
}
span {
	font-size: 2rem;
}
.remove-item-btn {
	position: absolute;
	top: 0;
	right: 0;
	padding: 0.5rem;
	font-size: 1.5rem;
	border: none;
	background: none;
	color: red;
	cursor: pointer;
}
</style>
