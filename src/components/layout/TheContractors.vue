<template>
	<div class="users-box">
		<!-- <h1>Lista kontrahentów:</h1> -->
		<p v-if="!usersStore.getUsers.length">Brak kontrahentów na liście!</p>
		<table v-else>
			<thead>
				<th>ID</th>
				<th>EMAIL</th>
				<th>NAZWA FIRMY</th>
				<th>ADRES FIRMY</th>
				<th>CENNIK</th>
			</thead>
			<tbody>
				<tr v-for="user in usersStore.getUsers" :key="user.id">
					<td>{{ user.id }}.</td>
					<td>{{ user.email }}</td>
					<td>{{ user.companyName }}</td>
					<td>{{ user.companyAddress }}</td>
					<td>{{ user.priceList }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { useUsersStore } from '@/stores/users.js'

export default {
	name: 'TheContractors',
	setup() {
		const usersStore = useUsersStore()
		return { usersStore }
	},
	mounted() {
		this.showUsers()
	},
	methods: {
		async showUsers() {
			try {
				await this.usersStore.fetchUsers()
			} catch (error) {
				console.error('Error fetching users:', error)
			}
		},
	},
}
</script>

<style scoped>
.users-box {
	width: 100%;
	display: flex;
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

h1 {
	border-bottom: 1px solid white;
	margin-bottom: 1rem;
}
p {
	font-size: 3rem;
}
</style>
