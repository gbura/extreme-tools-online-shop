<template>
	<div class="prices-box">
		<h1>Dostępne cenniki:</h1>
		<div class="price-lists-container">
			<div class="price-list">
				<p v-if="!priceLists.length">Brak dostępnych cenników!</p>
				<ul v-else>
					<li v-for="priceList in priceLists" :key="priceList.id">
						<span>{{ priceList.name }}</span>
						<span class="created">| {{ formatCreatedAt(priceList.createdAt) }}</span>
						<button class="remove-item-btn" @click="removePriceList(priceList.id)">
							<img src="../../assets/images/icons/X.png" alt="" />
						</button>
						<router-link :to="'/admin-panel/price-lists/edit/' + priceList.id">EDYTUJ</router-link>
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
				<button class="add-price-list-btn" @click="uploadPriceList">
					<span v-if="isLoading">
						<div class="loader"></div>
					</span>
					<span v-else>Dodaj cennik</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import Swal from 'sweetalert2'
import instanceAxios from '@/axios'
import { useAuthStore } from '@/stores/auth.js'
export default {
	name: 'PriceLists',
	data() {
		return {
			priceLists: [],
			selectedFile: null,
			isLoading: false,
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
					this.priceLists = res.data.data.filter(priceList => priceList.active === 1)
				}
			} catch (error) {
				console.error('Błąd podczas pobierania danych:', error)
			}
		},
		async removePriceList(id) {
			try {
				await instanceAxios.delete(`bo/priceLists/${id}`)
				Swal.fire({
					title: 'Sukces!',
					text: 'Cennik został usunięty!',
					icon: 'success',
				})
				this.getPriceLists()
			} catch (error) {
				console.error('Błąd podczas usuwania cennika:', error)
			}
		},
		onFileSelected(event) {
			this.selectedFile = event.target.files[0]
		},
		async uploadPriceList(e) {
			const fd = new FormData()
			fd.append('file', this.selectedFile)
			try {
				this.isLoading = true
				Swal.fire({
					title: 'Proszę czekać...',
					html: 'Trwa przesyłanie danych...',
					allowOutsideClick: false,
					showConfirmButton: false,
					onBeforeOpen: () => {
						Swal.showLoading()
					},
				})
				const response = await instanceAxios.post('bo/priceLists', fd)

				this.isLoading = false
				Swal.close()
				this.getPriceLists()
				Swal.fire({
					title: 'Sukces!',
					text: 'Nowy cennik został dodany do listy!',
					icon: 'success',
				})

				document.getElementById('add-price-list-input').value = ''
			} catch (error) {
				console.error('Błąd podczas przesyłania cennika:', error)

				this.isLoading = false

				Swal.close()

				Swal.fire({
					title: 'Błąd!',
					text: 'Błąd wgrywania cennika!',
					icon: 'error',
				})
				document.getElementById('add-price-list-input').value = ''
			}
		},
		formatCreatedAt(createdAt) {
			const date = new Date(createdAt)
			const day = date.getDate().toString().padStart(2, '0')
			const month = (date.getMonth() + 1).toString().padStart(2, '0')
			const year = date.getFullYear()
			const hours = date.getHours().toString().padStart(2, '0')
			const minutes = date.getMinutes().toString().padStart(2, '0')

			return `${day}.${month}.${year} ${hours}:${minutes}`
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
.created {
	font-size: 1.2rem;
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
	align-items: center;
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
a {
	position: absolute;
	top: 2px;
	right: 30px;
	padding: 0.5rem;
	text-decoration: none;
	color: white;
	background-color: rgb(141, 165, 8);
	border-radius: 8px;
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
.remove-item-btn img {
	width: 15px;
	height: 15px;
}
.loader {
	border: 4px solid #f3f3f3;
	border-top: 4px solid #3498db;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	animation: spin 2s linear infinite;
	margin: auto;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
