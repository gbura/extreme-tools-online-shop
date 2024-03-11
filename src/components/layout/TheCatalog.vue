<template>
	<div>
		<label for="price-list">Wgraj nowe zdjęcia:</label>

		<input type="file" id="price-list" name="price-list" accept="image/png, image/jpeg" />
	</div>
</template>

<script>
export default {}
</script>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	border: 2px solid red;
	padding: 3rem;
}
</style>
