<template>
	<nav class="navbar">
		<div class="wrapper">
			<div class="container">
				<template v-if="isAuthenticated()">
					<router-link to="/" class="navbar-brand">Strona główna</router-link>
				</template>
				<template v-else>
					<router-link to="/dashboard" class="navbar-brand">Panel zakupowy</router-link>
				</template>

				<ul class="navbar-nav">
					<template v-if="isAuthenticated()">
						<li class="nav-item">
							<router-link to="/login" class="nav-link">Zaloguj się</router-link>
						</li>
					</template>
					<template v-else>
						<li class="nav-item buttons-wrapper">
							<button @click="handleLogOut" class="logout-btn">Wyloguj się</button>
							<button class="change-pass-btn" @click="changePassword">Zmień hasło</button>
							<template v-if="isAdmin">
								<router-link to="/admin-panel" class="nav-link admin-link">Panel admina</router-link>
							</template>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</nav>
	<UserResetPass :open="isResetOpen" :userId="resetUserId" @close="closeModal" />
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import UserResetPass from '@/components/layout/UserResetPass.vue'

export default {
	name: 'TheHeader',
	setup() {
		const authstore = useAuthStore()
		return { authstore }
	},
	data() {
		return {
			resetUserId: localStorage.getItem('userId'),
			isResetOpen: false,
		}
	},
	components: { UserResetPass },
	methods: {
		isAuthenticated() {
			return !this.authstore.isAuthenticated
		},
		handleLogOut() {
			this.authstore.logout()
			this.$router.push('/')
		},
		openModal() {
			this.isResetOpen = true
		},
		closeModal() {
			this.isResetOpen = false
		},
		changePassword() {
			this.openModal()
		},
	},
	computed: {
		isAdmin() {
			return this.authstore.isLoggedAdmin
		},
	},
}
</script>

<style scoped>
a {
	text-decoration: none;
	color: rgb(239, 127, 52);
	transition: color 0.2s ease-in;
}
a:hover {
	color: rgb(245, 118, 34);
}
.logout-btn,
.change-pass-btn {
	border: none;
	background: transparent;
	color: rgb(239, 127, 52);
	font-size: 1.6rem;
	cursor: pointer;
}
.navbar {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	background: #000;
	margin-bottom: 10rem;
	z-index: 100;
}
.container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.8rem 0;
}
.buttons-wrapper {
	display: flex;
	align-items: center;
	flex-direction: row-reverse;
	gap: 2rem;
}
.admin-link {
	margin-right: 2rem;
}
</style>
