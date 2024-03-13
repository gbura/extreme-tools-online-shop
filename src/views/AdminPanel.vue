<template>
	<AdminMenu />
	<div class="container">
		<RouterView></RouterView>
	</div>
</template>

<script>
export default {
	name: 'AdminPanel',
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 4rem;
	color: white;
}

@media (min-width: 768px) {
	.container {
		flex-direction: row;
	}
}
</style>
