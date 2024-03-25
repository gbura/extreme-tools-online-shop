<template>
	<div class="users-box">
		<h1>Lista kontrahentów:</h1>
		<p v-if="!usersStore.users.length">Brak kontrahentów na liście!</p>
		<table v-else>
			<thead>
				<th>EMAIL</th>
				<th>NAZWA FIRMY</th>
				<th>ADRES FIRMY</th>
				<th>CENNIK</th>
				<th>AKCJE</th>
			</thead>
			<tbody>
				<tr v-for="user in usersStore.users" :key="user.id">
					<td>{{ user.email }}</td>
					<td>{{ user.companyName }}</td>
					<td>{{ user.companyAddress }}</td>
					<td>
						Przypisano: {{ user.priceList }}
						<select v-model="user.priceList" @change="updatePriceList(user.id, user.priceList)">
							<option v-for="priceList in usersStore.priceLists" :key="priceList.id" :value="priceList.id">
								{{ priceList.name }}
							</option>
						</select>
					</td>
					<td><button class="pass-reset-btn" @click="openModal(user.id)">Resetuj hasło</button></td>
				</tr>
			</tbody>
		</table>
		<ResetPassword :open="isResetOpen" :userId="resetUserId" @close="closeModal" />
	</div>
</template>

<script>
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'
import { useUsersStore } from '@/stores/users.js'
import ResetPassword from '@/components/layout/ResetPassword.vue'

export default {
	name: 'TheContractors',
	components: { ResetPassword },
	setup() {
		const usersStore = useUsersStore()
		return { usersStore }
	},
	data() {
		return {
			isResetOpen: false,
			resetUserId: null,
		}
	},
	mounted() {
		this.showUsers()
	},
	methods: {
		async showUsers() {
			try {
				await this.usersStore.fetchUsers()
				await this.usersStore.fetchPriceLists()
			} catch (error) {
				console.error('Error fetching users:', error)
			}
		},
		async openModal(userId) {
			this.isResetOpen = true
			this.resetUserId = userId
		},
		closeModal() {
			this.isResetOpen = false
			this.resetUserId = null
		},
		async updatePriceList(userId, priceListId) {
			try {
				await instanceAxios.post(`bo/priceLists/${priceListId}/attachUser/${userId}`)
				Swal.fire({
					title: 'Sukces!',
					text: 'Ustawiono nowy cennik!',
					icon: 'success',
				})
			} catch (error) {
				console.error('Error updating price list:', error)
			}
		},
	},
}
</script>

<style scoped>
.users-box {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

table,
th,
td {
	border: 3px solid rgb(175, 106, 15);
	border-collapse: collapse;
	font-family: 'Arial', sans-serif;
	font-size: 1.4rem;
	font-weight: bold;
	text-align: center;
	padding: 1.5rem;
}

th {
	background-color: orange;
	color: rgb(255, 255, 255);
	font-size: 1.8rem;
}

table {
	width: 1200px;
}

tbody {
	background-color: rgba(51, 50, 50, 0.514);
}

h1 {
	border-bottom: 1px solid white;
	margin-bottom: 1rem;
}
p {
	font-size: 3rem;
}
.pass-reset-btn {
	padding: 0.8rem;
	border: none;
	border-radius: 5px;
	background-color: orange;
	font-size: 1.5rem;
	font-weight: bold;
	color: white;
	cursor: pointer;
}
select {
	width: 100%;
	border: none;
	outline: none;
	background-color: orange;
	padding: 0.5rem;
	border-radius: 8px;
	color: #fff;
	font-size: 1.6rem;
}
</style>
