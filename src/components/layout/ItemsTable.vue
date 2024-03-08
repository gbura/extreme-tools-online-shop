<template>
	<table>
		<thead>
			<tr>
				<th class="ean-header">
					<div>
						<input type="text" v-model="filters.eanCode" placeholder="Kod EAN" />
					</div>
				</th>
				<th class="item-name-header">
					<div>
						<input type="text" v-model="filters.barCode" placeholder="Nazwa towaru" />
					</div>
				</th>
				<th class="product-code-header">
					<div>
						<input type="text" v-model="filters.productCode" placeholder="Kod produktu" />
					</div>
				</th>
				<th class="price-header">
					Cena<br />
					PLN
				</th>
				<th class="shopping-header">
					<div>
						<img src="../../assets/images/icons/shopping-bag.svg" alt="" />
					</div>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="item in filteredItems"
				:key="item.eanCode"
				@click="handleRowClick(item.productCode, item)"
				:class="{ 'selected-row': selectedItem === item }">
				<td class="ean-code">{{ item.eanCode }}</td>
				<td class="bar-code">{{ item.barCode }}</td>
				<td class="product-code">{{ item.productCode }}</td>
				<td class="product-price">{{ item.pricePLN }}</td>
				<td><input type="number" class="quantity" /></td>
			</tr>
		</tbody>
	</table>
	<!-- <base-button class="purchase-btn" @click="purchase">Zamów</base-button> -->
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue'
import Swal from 'sweetalert2'
export default {
	name: 'ItemsTable',
	components: { BaseButton },
	emits: ['row-click'],
	data() {
		return {
			items: [
				{
					eanCode: '5903332981120',
					barCode: 'Pistolet do piany No.00212 SILVER Extremetools',
					productCode: 'No.00115',
					pricePLN: '48,36',
				},
				{
					eanCode: '5903332981137',
					barCode: 'Pistolet do piany No.00213 HOBBY Extremetools',
					productCode: 'No.00212',
					pricePLN: '48,36',
				},
				{
					eanCode: '5903332981045',
					barCode: 'Pistolet do piany No.00214 SMART Extremetools',
					productCode: 'No.00213',
					pricePLN: '52,53',
				},
				{
					eanCode: '5903332981052',
					barCode: 'Pistolet do piany No.00215 COSMO Extremetools',
					productCode: 'No.00214',
					pricePLN: '78,99',
				},
				{
					eanCode: '5903332981946',
					barCode: 'Pistolet do piany No.00216 FIN SHARK Extremetools*',
					productCode: 'No.00216',
					pricePLN: '62,50',
				},
				{
					eanCode: '5903332981946',
					barCode: 'Pistolet do piany No.00216 FIN SHARK Extremetools*',
					productCode: 'No.00217',
					pricePLN: '62,50',
				},
				{
					eanCode: '5903332981946',
					barCode: 'Pistolet do piany No.00216 FIN SHARK Extremetools*',
					productCode: 'No.00217',
					pricePLN: '62,50',
				},
				{
					eanCode: '5903332981946',
					barCode: 'Pistolet do piany No.00216 FIN SHARK Extremetools*',
					productCode: 'No.00217',
					pricePLN: '62,50',
				},
				{
					eanCode: '5903332981946',
					barCode: 'Pistolet do piany No.00216 FIN SHARK Extremetools*',
					productCode: 'No.00217',
					pricePLN: '62,50',
				},
				{
					eanCode: '5903332981946',
					barCode: 'Pistolet do piany No.00216 FIN SHARK Extremetools*',
					productCode: 'No.00217',
					pricePLN: '62,50',
				},
				{
					eanCode: '5903332981946',
					barCode: 'Pistolet do piany No.00216 FIN SHARK Extremetools*',
					productCode: 'No.00217',
					pricePLN: '62,50',
				},
				{
					eanCode: '5903332981946',
					barCode: 'Pistolet do piany No.00216 FIN SHARK Extremetools*',
					productCode: 'No.00217',
					pricePLN: '62,50',
				},
				{
					eanCode: '5903332981946',
					barCode: 'Pistolet do piany No.00216 FIN SHARK Extremetools*',
					productCode: 'No.00217',
					pricePLN: '62,50',
				},
			],
			filters: {
				eanCode: '',
				barCode: '',
				productCode: '',
			},
			selectedItem: null,
		}
	},
	computed: {
		filteredItems() {
			return this.items.filter(item => {
				return (
					item.eanCode.includes(this.filters.eanCode) &&
					item.barCode.toLowerCase().includes(this.filters.barCode.toLowerCase()) &&
					item.productCode.toLowerCase().includes(this.filters.productCode.toLowerCase())
				)
			})
		},
	},
	methods: {
		handleRowClick(productCode, item) {
			this.selectedItem = item
			this.$emit('row-click', productCode)
		},
		purchase() {
			Swal.fire({
				title: 'Sukces!',
				text: 'Twoje zamówienie do nas trafiło.',
				icon: 'success',
			})
		},
	},
}
</script>

<style scoped>
table,
th,
td {
	border: 2px solid black;
	border-collapse: collapse;
	font-family: 'Arial', sans-serif;
	font-size: 1rem;
	font-weight: bold;
	padding: 0.5rem;
}

thead th {
	font-size: 1.5rem;
}

.ean-header {
	width: 100px;
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

.shopping-header,
.quantity {
	width: 50px;
}

tbody {
	background-color: white;
}

th {
	padding: 0;
	background-color: rgb(255, 101, 1);
}

th input {
	width: 100%;
	height: 35px;
	padding: 0.5rem;
}
input {
	outline: none;
	border: none;
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
