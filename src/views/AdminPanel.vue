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
	align-items: center;
	gap: 4rem;
	color: white;
	margin-top: 5rem;
}

@media (min-width: 768px) {
	.container {
		flex-direction: row;
	}
}
</style>
