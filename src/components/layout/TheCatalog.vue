<template>
	<div>
		<label for="price-list">Zaaktualizuj nowe zdjęcia:</label>
		<input type="file" id="price-list" name="price-list" accept="image/png, image/jpeg" multiple />
		<button>Załaduj</button>
	</div>
</template>

<script>
export default {
	name: 'TheCatalog',
}
</script>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	width: 500px;
	height: 300px;
	padding: 3rem;
	background-color: orange;
	border-radius: 15px;
}
#price-list {
	display: block;
	margin: 0 auto;
	width: 50%;
}
label {
	font-size: 2rem;
	margin-bottom: 1rem;
	border-bottom: 1px solid white;
}
button {
	width: 150px;
	padding: 1rem;
	border: none;
	background-color: rgb(141, 93, 5);
	border-radius: 15px;
	color: white;
	font-size: 2rem;
	cursor: pointer;
}
button:hover {
	background-color: rgb(104, 71, 10);
}
</style>
