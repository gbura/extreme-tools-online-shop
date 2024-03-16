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
					@keydown.tab.prevent="focusNextRow(item.code, index)"
					@click="handleRowClick(item.code, index)"
					:class="{ 'selected-row': activeRowIndex === index }"
					:key="index">
					<td class="ean-code">{{ item.ean }}</td>
					<td class="bar-code">{{ item.name }}</td>
					<td class="product-code">{{ item.code }}</td>
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
		<shopping-cart :open="this.isOpenShoppingCart" @close="closeShoppingCart">
			<h2 class="shopping-cart-header" v-if="!this.shoppingCartStore.items.length">Twój koszyk jest pusty!</h2>
			<h2 v-else>koszyk</h2>
			<ul class="shopping-items-container">
				<li v-for="card in this.shoppingCartStore.items" :key="card.code">
					<div class="item-container">
						<button class="delete-item-btn" @click="this.shoppingCartStore.removeItem(card.code)">X</button>
						<div>
							<b>{{ card.name }}</b>
						</div>
						<div>Sztuk: {{ card.quantity }}</div>
						<div>Cena netto: {{ card.price }}zł</div>
						<div>Suma: {{ (card.price * card.quantity).toFixed(2) }}zł</div>
					</div>
				</li>
			</ul>
			<div class="buttons-container">
				<button class="shopping-cart-btn delete-all-items-btn" @click="this.shoppingCartStore.removeAllItems">
					Usuń wszystko z koszyka
				</button>
				<button class="shopping-cart-btn purchase-items-btn" @click="purchase">Złóż zamówienie</button>
			</div>
		</shopping-cart>
	</div>
</template>

<script>
import axios from 'axios'
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

				const res = await axios.get('http://127.0.0.1:8000/api/bo/priceLists/1', {
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
		handleRowClick(productCode, index) {
			this.activeRowIndex = index
			this.$emit('row-click', productCode)
		},
		focusNextRow(productCode, index) {
			this.activeRowIndex = index + 1
			this.$emit('next-tab-click', productCode)
		},
		// handleRowClick(productImage, index) {
		// 	this.activeRowIndex = index
		// 	this.$emit('row-click', productImage)
		// },
		// focusNextRow(productImage, index) {
		// 	this.activeRowIndex = index + 1
		// 	this.$emit('next-tab-click', productImage)
		// },

		// TODO w tbody -> tr do zdjęć
		// @keydown.tab.prevent="focusNextRow(item.image, index)"
		// @click="handleRowClick(item.image, index)"
		deleteInputValue(filterName) {
			this.filters[filterName] = ''
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
		},
		purchase() {
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
	margin-top: 1.2rem;
}

.shopping-cart-btn {
	padding: 1rem;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	width: 150px;
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
/* tr:hover {
	background-color: rgb(255, 101, 1);
} */

.product-code,
.ean-code,
.product-price {
	text-align: center;
}

.selected-row {
	background-color: rgb(255, 101, 1);
}
</style>
