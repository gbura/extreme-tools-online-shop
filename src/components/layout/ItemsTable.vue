<template>
	<div class="table-box">
		<table>
			<thead>
				<th class="search-header">
					<div class="search-header-box">
						<input
							type="text"
							v-model="searchQuery"
							placeholder="Szukaj: Nazwa towaru..."
							@input="search"
							@blur="this.searchQuery = ''"
							@focus="clearIfNotEmpty('searchQuery')" />
						<img src="../../assets/images/icons/search.png" alt="" class="searchbar-icon" />
						<button @click="this.searchQuery = ''" class="delete-input-btn">
							<img src="../../assets/images/icons/X.png" alt="" />
						</button>
					</div>
				</th>
				<tr>
					<th class="ean-header">
						<div>
							<input
								type="text"
								v-model="filters.ean"
								placeholder="EAN"
								maxlength="13"
								@focus="clearIfNotEmpty('filters.ean')" />
							<img src="../../assets/images/icons/search.png" alt="" class="searchbar-icon" />
							<button class="delete-input-btn" @click="deleteInputValue('ean')">
								<img src="../../assets/images/icons/X.png" alt="" />
							</button>
						</div>
					</th>
					<th class="item-name-header">
						<div>
							<input
								type="text"
								v-model="filters.name"
								placeholder="Filtruj: Nazwa lub kod towaru..."
								@focus="clearIfNotEmpty('filters.name')" />
							<img src="../../assets/images/icons/search.png" alt="" class="searchbar-icon" />
							<button class="delete-input-btn" @click="deleteInputValue('name')">
								<img src="../../assets/images/icons/X.png" alt="" />
							</button>
						</div>
					</th>
					<th class="product-code-header">
						<div>
							<input type="text" v-model="filters.code" placeholder="KOD" @focus="clearIfNotEmpty('filters.code')" />
							<img src="../../assets/images/icons/search.png" alt="" class="searchbar-icon" />
							<button class="delete-input-btn" @click="deleteInputValue('code')">
								<img src="../../assets/images/icons/X.png" alt="" />
							</button>
						</div>
					</th>
					<th class="price-header">Cena<br />netto</th>
					<th class="shopping-header" @click="showShoppingCart">
						<div>
							<span class="bag-and-price">
								<img src="../../assets/images/icons/shoppingCart.png" alt="" />
								{{ this.shoppingCartStore.sumCartPrice.toFixed(2) }},-
							</span>
							<span class="quantity-text">ilość</span>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, index) in filteredItems"
					:key="index"
					@keydown.up.prevent="handleKeyDown($event, index)"
					@keydown.down.prevent="handleKeyDown($event, index)"
					@keydown.enter.prevent="handleKeyDown($event, index)"
					tabindex="0"
					ref="tableRows"
					@click="handleRowClick(item.image, index)"
					:class="{ 'selected-row': activeRowIndex === index }">
					<td class="ean-code">{{ item.ean }}</td>
					<td class="bar-code">{{ item.name }}</td>
					<td class="product-code">{{ item.code }}</td>
					<td class="product-price">{{ Number(item.price).toFixed(2) }}</td>
					<td>
						<input
							:id="item.id"
							type="number"
							class="quantity"
							v-model="item.quantity"
							@input="updateCost"
							min="1"
							tabindex="0" />
					</td>
				</tr>
			</tbody>
		</table>
		<shopping-cart :open="this.isOpenShoppingCart" @close="closeShoppingCart">
			<h2 class="shopping-cart-header" v-if="!this.shoppingCartStore.items.length">Twój koszyk jest pusty!</h2>
			<h2 v-else>koszyk</h2>
			<ul class="shopping-items-container">
				<li v-for="card in sortedShoppingCartItems" :key="card.id">
					<div class="item-container">
						<button class="delete-item-btn" @click="this.shoppingCartStore.removeItem(card.code)">
							<img src="../../assets/images/icons/X.png" alt="" />
						</button>
						<div class="shop-card-name">
							<b>{{ card.name }}</b>
						</div>
						<div class="shop-row-item">
							<div>Sztuk: {{ card.quantity }}</div>
							<div>Cena netto: {{ card.price }}zł</div>
							<div>Suma: {{ (card.price * card.quantity).toFixed(2) }}zł</div>
						</div>

						<div class="quantity-btns-box">
							<button @click="this.shoppingCartStore.reduceItems(card.code)">-</button>
							<button @click="this.shoppingCartStore.increaseItems(card.code)">+</button>
						</div>
					</div>
				</li>
				<div>
					<textarea id="purchase-info" placeholder="Uwagi, pytania do zamówienia..."></textarea>
				</div>
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
import instanceAxios from '@/axios'
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
				const res = await instanceAxios.get('ad/priceList', {
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
			const rows = document.querySelectorAll('tbody tr')
			rows.forEach((row, i) => {
				if (i === index) {
					row.classList.add('selected-row')
				} else {
					row.classList.remove('selected-row')
				}
			})
		},
		handleKeyDown(event, index) {
			if (event.key === 'ArrowUp' && index > 0) {
				this.focusNextRow(index - 1)
				this.scrollTable(-1)
			} else if (event.key === 'ArrowDown' && index < this.filteredItems.length - 1) {
				this.focusNextRow(index + 1)
				this.scrollTable(1)
			} else if (event.key === 'Enter') {
				this.focusQuantityInput(index)
			}
		},
		scrollTable(direction) {
			const rows = document.querySelectorAll('tbody tr')
			const rowHeight = rows[0].offsetHeight
			const table = document.querySelector('.table-box')
			const currentScroll = table.scrollTop
			table.scrollTop = currentScroll + direction * rowHeight
		},
		focusNextRow(index) {
			this.activeRowIndex = index
			const productImage = this.filteredItems[index].image
			this.$emit('next-tab-click', productImage)
			const nextRow = this.$refs.tableRows[this.activeRowIndex]
			if (nextRow) {
				nextRow.focus()
			}
		},
		focusQuantityInput(index) {
			const selectedRow = this.filteredItems[index]
			if (selectedRow) {
				this.$nextTick(() => {
					const quantityInput = this.$refs.tableRows[index].querySelector('.quantity')
					if (quantityInput) {
						quantityInput.focus()
					}
				})
			}
		},
		deleteInputValue(filterName) {
			this.filters[filterName] = ''
		},
		clearIfNotEmpty(filterRef) {
			for (let key in this.filters) {
				if (key !== filterRef && this.filters[key] !== '') {
					this.filters[key] = ''
				}
			}
		},
		search() {
			const searchValue = this.searchQuery.trim().toLowerCase()
			const rows = document.querySelectorAll('tbody tr')
			let nextRowIndex = -1

			rows.forEach((row, index) => {
				const cellText = row.querySelector('.bar-code').textContent.trim().toLowerCase()
				if (cellText.startsWith(searchValue) && nextRowIndex === -1) {
					nextRowIndex = index
				}
			})

			if (nextRowIndex !== -1) {
				const nextRow = rows[nextRowIndex]
				setTimeout(() => {
					nextRow.scrollIntoView({ behavior: 'smooth', block: 'center' })
				}, 700)
			}
		},
		updateCost() {
			this.filteredItems.forEach(item => {
				if (!isNaN(item.quantity) && item.quantity > 0 && !isNaN(item.price)) {
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
		sortedShoppingCartItems() {
			return this.shoppingCartStore.items.slice().sort((a, b) => {
				return a.name.localeCompare(b.name)
			})
		},
	},
}
</script>

<style scoped>
#purchase-info {
	padding: 1rem;
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	min-height: 100px;
	max-height: 100px;
	resize: none;
	border-radius: 8px;
	border: 1px solid orange;
	outline: none;
}
.shop-card-name {
	max-width: 600px;
}
.shop-row-item {
	display: flex;
	gap: 2rem;
	max-width: 600px;
}
.shop-row-item div:first-child {
	border-right: 1px solid black;
	padding-right: 2rem;
}
.shop-row-item div:nth-child(2) {
	border-right: 1px solid black;
	padding-right: 2rem;
}
th.search-header {
	height: 25px;
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
.delete-item-btn img {
	width: 15px;
	height: 15px;
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
	height: 100%;
	font-size: 1rem;
	padding: 0;
	background-color: rgb(255, 101, 1);
}

th input {
	position: relative;
	height: 30px;
	padding: 0 0.5rem 0 1.6rem;
	box-shadow: 0px 1px 2px rgb(0, 0, 0);
}
.searchbar-icon {
	position: absolute;
	top: 50%;
	left: 1px;
	transform: translateY(-50%);
	width: 12px;
	height: 12px;
}
input {
	width: 100%;
	outline: none;
	border: none;
	font-family: 'Arial', sans-serif;
	font-size: 1rem;
}

.ean-header {
	width: 160px;
}

.item-name-header {
	width: 700px;
	max-width: 700px;
}

.product-code-header {
	width: 140px;
}

.price-header {
	padding: 0 1rem;
}
.shopping-header {
	width: 60px;
	cursor: pointer;
}

.shopping-header div {
	border: none;
}

.shopping-header div .bag-and-price {
	display: flex;
	justify-content: space-between;
	align-items: start;
}

.quantity {
	width: 100%;
	padding-right: 0.5rem;
	text-align: right;
	font-weight: 900;
	color: #800000;
	caret-color: #800000;
}

thead div {
	position: relative;
}

thead div .delete-input-btn {
	position: absolute;
	top: 4px;
	right: 2px;
	border: none;
	background: none;
	cursor: pointer;
	width: 12px;
	height: 12px;
}
.delete-input-btn img {
	width: 100%;
	height: 100%;
}

tbody {
	background-color: white;
}

tr:not(thead tr) {
	cursor: pointer;
}

.product-code,
.ean-code {
	text-align: center;
}
.product-price {
	text-align: right;
}

.selected-row {
	background-color: rgb(255, 101, 1);
}
.selected-row input.quantity {
	background-color: rgb(255, 101, 1);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
