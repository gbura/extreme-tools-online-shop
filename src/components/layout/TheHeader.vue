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
								<button class="change-admin-login" @click="changeLogin">Zmień login</button>
								<router-link to="/admin-panel" class="nav-link admin-link">Panel admina</router-link>
							</template>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</nav>
	<UserResetPass :open="isResetOpen" :userId="resetUserId" @close="closeModal" />
	<ChangeAdminLogin :open="isChangeLoginOpen" @close="closeChangeLoginModal" :userId="resetUserId" />
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import UserResetPass from '@/components/layout/UserResetPass.vue'
import ChangeAdminLogin from '@/components/layout/ChangeAdminLogin.vue'

export default {
	name: 'TheHeader',
	setup() {
		const authstore = useAuthStore()
		return { authstore }
	},
	data() {
		return {
			resetUserId: null,
			isResetOpen: false,
			isChangeLoginOpen: false,
		}
	},
	components: { UserResetPass, ChangeAdminLogin },
	methods: {
		isAuthenticated() {
			return !this.authstore.isAuthenticated
		},
		handleLogOut() {
			this.authstore.logout()
			this.$router.push('/')
		},
		openModal() {
			this.resetUserId = localStorage.getItem('userId')
			this.isResetOpen = true
		},
		closeModal() {
			this.isResetOpen = false
		},
		changePassword() {
			this.openModal()
		},
		openChangeLoginModal() {
			this.resetUserId = localStorage.getItem('userId')
			this.isChangeLoginOpen = true
		},
		closeChangeLoginModal() {
			this.isChangeLoginOpen = false
		},
		changeLogin() {
			this.openChangeLoginModal()
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
	color: rgb(255, 101, 1);
	transition: color 0.2s ease-in;
}
a:hover {
	color: rgb(245, 118, 34);
}
.logout-btn,
.change-pass-btn,
.change-admin-login {
	border: none;
	background: transparent;
	color: rgb(255, 101, 1);
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
