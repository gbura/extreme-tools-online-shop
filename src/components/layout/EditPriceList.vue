<template>
	<div>
		<table>
			<thead>
				<tr>
					<th class="id-header">ID</th>
					<th class="ean-code-header">Kod EAN</th>
					<th class="name-header">NAZWA</th>
					<th class="code-header">KOD PRODUKTU</th>
					<th class="price-header">CENA</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in items" :key="item.id">
					<td>{{ item.id }}</td>
					<td>{{ item.ean }}</td>
					<td>{{ item.name }}</td>
					<td>{{ item.code }}</td>
					<td>
						<input type="number" class="quantity" v-model="item.price" min="1" />
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
		}
	},
	mounted() {
		this.getTableItems()
	},
    computed: {
        priceListId() {
            return this.$route.params.id
        }
    },
	methods: {
		async getTableItems() {
			try {
				const authStore = useAuthStore()
				const token = authStore.token

				const res = await axios.get(`http://127.0.0.1:8000/api/bo/priceLists/${this.priceListId}`, {
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
	},
}
</script>

<style scoped>
div {
	width: 100%;
	max-height: 600px;
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
input {
	width: 100%;
	outline: none;
	border: none;
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
</style>
