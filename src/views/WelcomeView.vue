<template>
	<div class="hero-img">
		<div class="hero-text">
			<h1>Zaloguj się lub zarejestruj, jeśli jeszcze nie posiadasz konta, aby złożyć swoje zamówienie!</h1>
		</div>
	</div>
</template>

<script>
export default {
	name: 'WelcomeView',
}
</script>

<style scoped>
.hero-img {
	position: relative;
	height: 450px;
	width: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: linear-gradient(rgba(92, 72, 9, 0.342), rgba(114, 91, 29, 0.863)), url(../assets/images/heroimg.jpg);
	border-radius: 20px;
}

.hero-text {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	color: rgb(255, 101, 1);
}
</style>
