<template>
	<template v-if="showHeader">
		<TheHeader />
	</template>
	<div class="wrapper">
		<RouterView />
	</div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue'

export default {
	name: 'App',
	components: {
		TheHeader,
	},
	computed: {
		showHeader() {
			return this.$route.name !== 'welcome'
		},
	},
}
</script>

<style>
*,
::before,
::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

html {
	font-family: 'Arial', sans-serif;
	font-size: 62.5%;
	scroll-behavior: smooth;
	scroll-padding-top: 40px;
}

body {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 1.6rem;
	min-height: 100vh;
	background-image: url(./assets/images/bg.png);
	background-repeat: repeat;
}
#app {
	width: 100%;
}
.wrapper {
	max-width: 1920px;
	width: 100%;
	margin: 0 auto;
	padding: 0 5%;
	overflow-x: hidden;
}

.router-link-active {
	border: 1px solid orange;
	padding: 0.5rem;
	border-radius: 4px;
}

@media (min-width: 1400px) {
	.wrapper {
		padding: 0 10%;
	}
}
</style>
