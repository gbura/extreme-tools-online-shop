<template>
	<div class="container-box">
		<div class="table-box" @scroll="onScroll">
			<table>
				<thead>
					<tr>
						<th class="ean-code-header">Kod EAN</th>
						<th class="name-header">NAZWA</th>
						<th class="code-header">KOD PRODUKTU</th>
						<th class="price-header">CENA</th>
					</tr>
				</thead>
				<tbody ref="tableBody">
					<tr v-for="item in items" :key="item.id">
						<td>{{ item.ean }}</td>
						<td class="item-name">{{ item.name }}</td>
						<td>{{ item.code }}</td>
						<td>
							<input type="number" class="quantity" v-model="item.price" min="1" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="button-box">
			<button class="save-btn" @click="confirmChangePrices">Zapisz zmiany</button>
		</div>
	</div>
</template>

<script>
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth.js'

export default {
	name: 'EditPriceList',
	data() {
		return {
			items: [],
			priceListId: null,
			originalPrices: {},
		}
	},
	mounted() {
		this.priceListId = this.$route.params.id
		this.getTableItems()
	},
	methods: {
		async getTableItems() {
			try {
				const authStore = useAuthStore()
				const token = authStore.token

				const res = await instanceAxios.get(`bo/priceLists/${this.priceListId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				if (res.data && res.data.data) {
					this.items = res.data.data.parts

					this.items.forEach(item => {
						this.originalPrices[item.id] = item.price
					})
				}
			} catch (error) {
				console.error('Błąd podczas pobierania danych:', error)
			}
		},
		async confirmChangePrices() {
			try {
				const authStore = useAuthStore()
				const token = authStore.token

				const updatedParts = this.items
					.filter(item => {
						return item.price !== this.originalPrices[item.id]
					})
					.map(item => {
						return {
							id: item.id,
							ean: item.ean,
							name: item.name,
							code: item.code,
							price: parseFloat(item.price).toFixed(2).toString(),
						}
					})

				if (updatedParts.length === 0) {
					Swal.fire({
						title: 'Błąd!',
						text: 'Nie dokonano zmian w cenniku!',
						icon: 'error',
					})
					return
				}

				const res = await instanceAxios.put(
					`bo/priceLists/${this.priceListId}`,
					{
						parts: updatedParts,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)

				if (res.data && res.data.success) {
					this.getTableItems()
					Swal.fire({
						title: 'Sukces!',
						text: 'Ustawiono nowe ceny!',
						icon: 'success',
					})
				}
			} catch (error) {
				console.error('Błąd przy wysyłaniu zmian:', error)
				alert('Wystąpił błąd podczas zapisywania zmian.')
			}
		},
		onScroll(event) {
			const tableBody = this.$refs.tableBody
			if (tableBody && tableBody.rows.length > 0) {
				const rowHeight = tableBody.rows[0].clientHeight
				const scrollTop = event.target.scrollTop

				const rowIndex = Math.round(scrollTop / rowHeight)
				const newScrollTop = rowIndex * rowHeight

				event.target.scrollTop = newScrollTop
			}
		},
	},
}
</script>

<style scoped>
.container-box {
	width: 100%;
	margin-top: 8rem;
}
.quantity {
	text-align: right;
	padding-right: 0.5rem;
}

.table-box {
	width: 100%;
	max-height: 600px;
	overflow-y: auto;
	margin-bottom: 1rem;
}
table,
th,
td {
	border: 2px solid black;
	border-collapse: collapse;
	font-family: 'Arial', sans-serif;
	font-size: 1rem;
	font-weight: bold;
}

table {
	width: 100%;
}

thead {
	position: sticky;
	top: -1px;
	background-color: rgb(255, 101, 1);
	z-index: 1;
}

thead tr {
	border-bottom: 1px solid black;
}

thead th {
	height: 40px;
	font-size: 1rem;
	padding: 0;
	background-color: rgb(255, 101, 1);
}
.id-header {
	width: 5%;
}
.ean-code-header {
	width: 15%;
}
.name-header {
	width: 55%;
}
.code-header {
	width: 15%;
}
.price-header {
	width: 10%;
}
.item-name {
	text-align: left;
	padding-left: 2rem;
}
input {
	width: 100%;
	outline: none;
	border: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

tbody {
	background-color: white;
}

tbody td {
	color: black;
	text-align: center;
}
tr:not(thead tr) {
	cursor: pointer;
}
.button-box {
	display: flex;
	justify-content: flex-end;
}
.save-btn {
	padding: 1.5rem;
	border: none;
	background: orange;
	font-size: 2rem;
	color: #fff;
	border-radius: 8px;
	cursor: pointer;
}

@media (min-width: 500px) {
	.container-box {
		margin-top: 15rem;
	}
}
</style>
