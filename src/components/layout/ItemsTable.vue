<template>
	<div class="table-box">
		<table>
			<thead>
				<tr>
					<th class="ean-header">
						<div>
							<input type="text" v-model="filters.ean" placeholder="Kod EAN" />
							<button class="delete-input-btn" @click="deleteInputValue('ean')">X</button>
						</div>
					</th>
					<th class="item-name-header">
						<div>
							<input type="text" v-model="filters.name" placeholder="Nazwa towaru" />
							<button class="delete-input-btn" @click="deleteInputValue('name')">X</button>
						</div>
					</th>
					<th class="product-code-header">
						<div>
							<input type="text" v-model="filters.kod" placeholder="Kod produktu" />
							<button class="delete-input-btn" @click="deleteInputValue('kod')">X</button>
						</div>
					</th>
					<th class="price-header">Cena<br />PLN</th>
					<th class="shopping-header">
						<div>
							<img src="../../assets/images/icons/shopping-bag.svg" alt="" />
							<span>Suma netto: {{ cost }}zł</span>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, index) in filteredItems"
					@keydown.tab.prevent="focusNextRow(item.kod, index)"
					@click="handleRowClick(item.kod, index)"
					:class="{ 'selected-row': activeRowIndex === index }"
					:key="index">
					<td class="ean-code">{{ item.ean }}</td>
					<td class="bar-code">{{ item.name }}</td>
					<td class="product-code">{{ item.kod }}</td>
					<td class="product-price">{{ Number(item.price).toFixed(2) }}</td>
					<td>
						<input
							v-if="activeRowIndex === index"
							type="number"
							class="quantity"
							v-model="item.quantity"
							@input="updateCost"
							min="1" />
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'

export default {
	name: 'ItemsTable',
	data() {
		return {
			items: [],
			filters: {
				ean: '',
				name: '',
				kod: '',
			},
			selectedItem: null,
			cost: '0',
			activeRowIndex: null,
		}
	},
	mounted() {
		this.getTableItems()
	},
	methods: {
		async getTableItems() {
			try {
				const authStore = useAuthStore()
				const token = authStore.token

				const res = await axios.get('http://127.0.0.1:8000/api/ad/priceList', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				if (res.data && res.data.data) {
					this.items = res.data.data.data
				}
			} catch (error) {
				console.error('Błąd podczas pobierania danych:', error)
			}
		},
		handleRowClick(productCode, index) {
			this.activeRowIndex = index
			this.$emit('row-click', productCode)
			console.log(index)
		},
		focusNextRow(productCode, index) {
			this.activeRowIndex = index + 1
			this.$emit('next-tab-click', productCode)
		},
		deleteInputValue(filterName) {
			this.filters[filterName] = ''
		},
		updateCost() {
			let sum = 0

			this.filteredItems.forEach(item => {
				const quantity = parseFloat(item.quantity)
				const price = parseFloat(item.price)

				if (!isNaN(quantity) && quantity > 0 && !isNaN(price) && price > 0) {
					sum += quantity * price
				}
			})
			this.cost = sum.toFixed(2)
		},
	},
	computed: {
		filteredItems() {
			if (this.items && this.items.length > 0) {
				return this.items.filter(
					item =>
						item.ean.includes(this.filters.ean) &&
						item.name.toLowerCase().includes(this.filters.name.toLowerCase()) &&
						item.kod.toLowerCase().includes(this.filters.kod.toLowerCase())
				)
			} else {
				return []
			}
		},
	},
}
</script>

<style scoped>
.table-box {
	max-height: 495px;
	overflow-y: auto;
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

th input {
	height: 40px;
	padding: 0 0.5rem;
}
input {
	width: 100%;
	outline: none;
	border: none;
}

.ean-header {
	width: 120px;
}

.item-name-header {
	width: 600px;
	max-width: 600px;
}

.product-code-header {
	width: 150px;
}

.price-header {
	padding: 0 1rem;
}
.shopping-header {
	width: 100px;
	cursor: pointer;
}

.shopping-header div {
	display: flex;
	flex-direction: column;
	border: none;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.quantity {
	width: 100%;
}

thead div {
	position: relative;
}

thead div .delete-input-btn {
	position: absolute;
	top: 50%;
	right: 2px;
	transform: translateY(-50%);
	border: 1px solid red;
	background: none;
	cursor: pointer;
}

tbody {
	background-color: white;
}

tr:not(thead tr) {
	cursor: pointer;
}
tr:hover {
	background-color: rgb(255, 101, 1);
}

.product-code,
.ean-code,
.product-price {
	text-align: center;
}

.selected-row {
	background-color: rgb(255, 101, 1);
}
</style>
