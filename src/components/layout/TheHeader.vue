<template>
	<nav class="navbar">
		<div class="wrapper">
			<div class="container">
				<template v-if="isAuthenticated()">
					<router-link to="/" class="navbar-brand">Strona główna</router-link>
				</template>
				<template v-else>
					<router-link to="/home" class="navbar-brand">Panel zakupowy</router-link>
				</template>
				<ul class="navbar-nav">
					<template v-if="isAuthenticated()">
						<li class="nav-item">
							<router-link to="/login" class="nav-link">Zaloguj się</router-link>
						</li>
					</template>
					<template v-else>
						<li class="nav-item">
							<button @click="handleLogOut" class="logout-btn">Wyloguj się</button>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'

export default {
	name: 'TheNavbar',
	setup() {
		const authstore = useAuthStore()
		return { authstore }
	},
	methods: {
		isAuthenticated() {
			return !this.authstore.isAuthenticated
		},
		handleLogOut() {
			this.authstore.logout()
			this.$router.push('/')
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
.logout-btn {
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
}
.container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem 0;
}
</style>
