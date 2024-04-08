<template>
	<div class="users-box">
		<h1>Lista kontrahentów:</h1>
		<p v-if="!usersStore.users.length">Brak kontrahentów na liście!</p>
		<table v-else>
			<thead>
				<th>NAZWA FIRMY</th>
				<th>LOGIN</th>
				<th>EMAIL</th>
				<th>PRZYPISANO</th>
				<th>CENNIK</th>
				<th>AKCJE</th>
			</thead>
			<tbody>
				<tr v-for="user in usersStore.users" :key="user.id">
					<td>{{ user.companyName }}</td>
					<td>{{ user.login }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.priceList }}</td>
					<td>
						<select v-model="user.priceList" @change="updatePriceList(user.id, user.priceList)">
							<option v-for="priceList in usersStore.priceLists" :key="priceList.id" :value="priceList.id">
								{{ priceList.name }}
							</option>
						</select>
					</td>
					<td>
						<button class="pass-reset-btn" @click="openModal(user.id)">Resetuj hasło</button>
						<button class="delete-contractor-btn" @click="deleteUser(user.id)">
							<img src="../../assets/images/icons/X.png" alt="" />
						</button>
					</td>
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
				console.error('Blad pobierania uzytkownikow:', error)
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
				setTimeout(() => {
					window.location.reload()
				}, 1000)
			} catch (error) {
				console.error('Blad przy aktualizacji cennika:', error)
			}
		},
		async deleteUser(userId) {
			try {
				await instanceAxios.delete(`bo/users/${userId}`)
				Swal.fire({
					title: 'Sukces!',
					text: 'Usunięto kontrahenta!',
					icon: 'success',
				})
				await this.usersStore.fetchUsers()
			} catch (error) {
				console.error('Blad usuwania kontrahenta', error)
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
	border-collapse: collapse;
	font-family: 'Arial', sans-serif;
	font-size: 1.4rem;
	font-weight: bold;
	text-align: center;
	padding: 0.5rem;
}
tr {
	border-bottom: 3px solid rgb(175, 106, 15);
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
.row-td {
	display: flex;
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
.delete-contractor-btn {
	margin-left: 1rem;
	padding: 0.8rem;
	border: none;
	border-radius: 5px;
	background: none;
	font-size: 1.5rem;
	font-weight: bold;
	color: white;
	cursor: pointer;
}
.delete-contractor-btn img {
	width: 20px;
	height: 20px;
}
select {
	width: 75%;
	border: none;
	outline: none;
	background-color: orange;
	padding: 0.5rem;
	border-radius: 8px;
	color: #fff;
	font-size: 1.6rem;
}
</style>
