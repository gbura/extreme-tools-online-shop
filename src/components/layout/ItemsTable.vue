<template>
	<table>
		<thead>
			<tr>
				<th>
					<div>
						<img src="../../assets/images/icons/search.svg" alt="" /><input
							type="text"
							v-model="filters.eanCode"
							placeholder="Kod EAN" />
					</div>
				</th>
				<th>
					<div>
						<img src="../../assets/images/icons/search.svg" alt="" /><input
							type="text"
							v-model="filters.barCode"
							placeholder="Nazwa towaru" />
					</div>
				</th>
				<th>
					<div>
						<img src="../../assets/images/icons/search.svg" alt="" /><input
							type="text"
							v-model="filters.productCode"
							placeholder="Kod produktu" />
					</div>
				</th>
				<th>Cena PLN</th>
				<th><img src="../../assets/images/icons/shopping-bag.svg" alt="" /></th>
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
	<base-button class="purchase-btn" @click="purchase">Zamów</base-button>
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
}
table {
	font-weight: bold;
	font-size: 1.3rem;
}

tbody {
	background-color: white;
}
th {
	background-color: rgb(255, 101, 1);
	padding: 1rem;
}
th div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

tr:not(thead tr) {
	cursor: pointer;
}
tr:hover {
	background-color: rgb(255, 101, 1);
}
th img {
	width: 20px;
}
th input {
	padding: 1rem 1rem;
	border: none;
	width: 100%;
}
input {
	outline: none;
}
td {
	padding: 0.5rem;
}
.selected-row {
	background-color: rgb(255, 101, 1);
}
.purchase-btn {
	position: absolute;
	bottom: 0px;
	right: 0;
	width: 200px;
}
</style>
