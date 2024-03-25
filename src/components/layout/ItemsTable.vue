<template>
	<div class="table-box">
		<table>
			<thead>
				<th class="search-header">
					<div class="search-header-box">
						<input
							type="text"
							class="input-searchbar"
							placeholder="Wyszukaj produkt"
							v-model="searchQuery"
							@input="search" />
					</div>
				</th>
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
							<input type="text" v-model="filters.code" placeholder="Kod produktu" />
							<button class="delete-input-btn" @click="deleteInputValue('code')">X</button>
						</div>
					</th>
					<th class="price-header">Cena<br />PLN</th>
					<th class="shopping-header" @click="showShoppingCart">
						<div>
							<img src="../../assets/images/icons/shopping-bag.svg" alt="" />
							<span>Suma netto: {{ this.shoppingCartStore.sumCartPrice.toFixed(2) }}zł</span>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, index) in filteredItems"
					:key="index"
					@keydown.tab.prevent="focusNextRow(item.image, index)"
					@click="handleRowClick(item.image, index)"
					:class="{ 'selected-row': activeRowIndex === index }">
					<td class="ean-code">{{ item.ean }}</td>
					<td class="bar-code">{{ item.name }}</td>
					<td class="product-code">{{ item.code }}</td>
					<td class="product-price">{{ Number(item.price).toFixed(2) }}</td>
					<td>
						<input
							v-if="activeRowIndex === index"
							:id="item.id"
							type="number"
							class="quantity"
							v-model="item.quantity"
							@input="updateCost"
							min="1" />
						<span v-else>{{ item.quantity }}</span>
					</td>
				</tr>
			</tbody>
		</table>
		<shopping-cart :open="this.isOpenShoppingCart" @close="closeShoppingCart">
			<h2 class="shopping-cart-header" v-if="!this.shoppingCartStore.items.length">Twój koszyk jest pusty!</h2>
			<h2 v-else>koszyk</h2>
			<ul class="shopping-items-container">
				<li v-for="card in this.shoppingCartStore.items" :key="card.id">
					<div class="item-container">
						<button class="delete-item-btn" @click="this.shoppingCartStore.removeItem(card.code)">X</button>
						<div>
							<b>{{ card.name }}</b>
						</div>
						<div>Sztuk: {{ card.quantity }}</div>
						<div>Cena netto: {{ card.price }}zł</div>
						<div>Suma: {{ (card.price * card.quantity).toFixed(2) }}zł</div>
						<div class="quantity-btns-box">
							<button @click="this.shoppingCartStore.reduceItems(card.code)">-</button>
							<button @click="this.shoppingCartStore.increaseItems(card.code)">+</button>
						</div>
					</div>
				</li>
			</ul>
			<div class="buttons-container">
				<button class="shopping-cart-btn delete-all-items-btn" @click="this.shoppingCartStore.removeAllItems">
					Usuń wszystko z koszyka
				</button>
				<button class="shopping-cart-btn purchase-items-btn" @click="purchase">Złóż zamówienie</button>
				<p class="total-price">Razem netto: {{ this.shoppingCartStore.sumCartPrice.toFixed(2) }}zł</p>
			</div>
		</shopping-cart>
	</div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth.js'
import { useShoppingCartStore } from '@/stores/shoppingcart.js'
import ShoppingCart from './ShoppingCart.vue'

export default {
	name: 'ItemsTable',
	components: { ShoppingCart },
	setup() {
		const shoppingCartStore = useShoppingCartStore()
		return { shoppingCartStore }
	},
	data() {
		return {
			items: [],
			filters: {
				ean: '',
				name: '',
				code: '',
			},
			searchQuery: '',
			selectedItem: null,
			activeRowIndex: null,
			cost: 0,
			isOpenShoppingCart: false,
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
				const res = await axios.get('http://127.0.0.1:8000/api/ad/priceList/', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				if (res.data && res.data.data) {
					this.items = res.data.data.parts
				}
			} catch (error) {
				console.error('Błąd podczas pobierania danych:', error)
			}
		},
		handleRowClick(productImage, index) {
			this.activeRowIndex = index
			this.$emit('row-click', productImage)
		},
		focusNextRow(productImage, index) {
			this.activeRowIndex = index + 1
			this.$emit('next-tab-click', productImage)
		},
		deleteInputValue(filterName) {
			this.filters[filterName] = ''
		},
		search() {
			const searchValue = this.searchQuery.toLowerCase().trim()
			const rows = document.querySelectorAll('tbody tr')
			let nextRowIndex = -1

			rows.forEach((row, index) => {
				const cells = row.querySelectorAll('td')

				cells.forEach(cell => {
					const cellText = cell.textContent.trim()
					const markRegex = new RegExp(searchValue, 'gi')
					const markedText = cellText.replace(markRegex, match => `<mark>${match}</mark>`)
					cell.innerHTML = markedText !== cellText ? markedText : cellText

					if (markedText !== cellText && nextRowIndex === -1) {
						nextRowIndex = index
					}
				})
			})

			if (nextRowIndex !== -1) {
				const nextRow = rows[nextRowIndex]
				nextRow.scrollIntoView({ behavior: 'smooth', block: 'center' })
			}
		},
		updateCost() {
			this.filteredItems.forEach(item => {
				if (!isNaN(item.quantity) && item.quantity > 0 && !isNaN(item.price) && item.price > 0) {
					if (!this.shoppingCartStore.items.includes(item)) {
						this.shoppingCartStore.addItem(item)
					}
				}
			})
		},
		showShoppingCart() {
			this.isOpenShoppingCart = true
		},
		closeShoppingCart() {
			this.isOpenShoppingCart = false
			this.items.forEach(item => {
				item.quantity = ''
			})
			this.updateItemsFromLocalStorage()
		},
		updateItemsFromLocalStorage() {
			const localStorageItems = JSON.parse(localStorage.getItem('items'))
			if (localStorageItems) {
				this.shoppingCartStore.items = localStorageItems
			}
		},
		purchase() {
			if (this.shoppingCartStore.items.length === 0) {
				Swal.fire({
					title: 'Błąd!',
					text: 'Nie możesz złożyć zamówienia, ponieważ twój koszyk jest pusty!',
					icon: 'error',
				})
				return
			}

			this.shoppingCartStore.purchase()
			this.closeShoppingCart()
		},
	},
	computed: {
		filteredItems() {
			if (this.items && this.items.length > 0) {
				return this.items.filter(
					item =>
						item.ean.includes(this.filters.ean) &&
						item.name.toLowerCase().includes(this.filters.name.toLowerCase()) &&
						item.code.toLowerCase().includes(this.filters.code.toLowerCase())
				)
			} else {
				return []
			}
		},
	},
}
</script>

<style scoped>
th.search-header {
	height: 42px;
}
.search-header-box {
	position: absolute;
	top: -5px;
	left: 0;
	width: 100%;
	z-index: 2;
	border: 1px solid black;
}
.search-header input {
	width: 100%;
}

.shopping-items-container {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: 85%;
	overflow-y: auto;
	list-style-type: none;
	background-color: #fff;
	padding: 1rem;
}
.shopping-cart-header {
	text-align: center;
	margin-bottom: 0.5rem;
	color: #fff;
	font-weight: bold;
	text-transform: uppercase;
	border-bottom: 1px solid white;
}

.buttons-container {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin-top: 2rem;
}
.total-price {
	color: #fff;
	font-weight: bold;
	background-color: rgb(104, 104, 13);
	padding: 1rem;
	border-radius: 8px;
	width: 250px;
	text-align: center;
	font-size: 1.5rem;
}

.shopping-cart-btn {
	padding: 1rem;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	width: 250px;
	color: #fff;
	font-size: 1.5rem;
	font-weight: bold;
}
.delete-all-items-btn {
	background-color: red;
}
.delete-all-items-btn:hover {
	background-color: rgb(211, 3, 3);
}

.purchase-items-btn {
	background-color: green;
}

.purchase-items-btn:hover {
	background-color: rgb(0, 109, 0);
}

.item-container {
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 0.5rem;
	border: 2px solid rgb(255, 145, 0);
	border-radius: 8px;
	font-size: 1.5rem;
	transition: background-color 0.1s ease-in;
}
.item-container:hover {
	background-color: rgb(199, 194, 194);
}

.quantity-btns-box {
	position: absolute;
	top: 50%;
	right: 20%;
	display: flex;
	justify-content: space-between;
	width: 80px;
	transform: translateY(-50%);
}

.quantity-btns-box button {
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid gray;
	background-color: orange;
	width: 30px;
	height: 30px;
	font-weight: bold;
	font-size: 2rem;
	cursor: pointer;
}
.quantity-btns-box button:hover {
	background-color: rgb(250, 179, 48);
}

.delete-item-btn {
	position: absolute;
	right: 5px;
	padding: 0.5rem;
	border: none;
	background: none;
	cursor: pointer;
	color: red;
}

.table-box {
	max-height: 495px;
	overflow-y: auto;
}

h2 {
	font-size: 3rem;
	text-align: center;
	text-transform: uppercase;
	color: white;
	border-bottom: 2px solid white;
	margin-bottom: 0.5rem;
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
	top: 0px;
	width: 100%;
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
	height: 48px;
	padding: 0 0.5rem;
	box-shadow: 0px 1px 2px rgb(0, 0, 0);
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

.product-code,
.ean-code,
.product-price {
	text-align: center;
}

.selected-row {
	background-color: rgb(255, 101, 1);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
