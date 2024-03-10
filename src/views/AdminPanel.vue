<template>
	<div class="container">
		<div class="form-box">
			<ContractorForm />
		</div>
		<div class="users-box">
			<TheContractors :users="usersStore.users.data" />
		</div>
	</div>
</template>

<script>
import { useUsersStore } from '@/stores/users.js'
import ContractorForm from '@/components/layout/ContractorForm.vue'
import TheContractors from '@/components/layout/TheContractors.vue'
export default {
	name: 'AdminPanel',
	components: { ContractorForm, TheContractors },
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
.container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 4rem;
	color: white;
	margin-top: 5rem;
}
.form-box {
	display: flex;
	justify-content: start;
	align-items: center;
	width: 100%;
}

.users-box {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

@media (min-width: 768px) {
	.container {
		flex-direction: row;
	}
}
</style>
