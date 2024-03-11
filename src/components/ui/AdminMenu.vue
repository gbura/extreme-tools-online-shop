<template>
	<div>
		<ul>
			<li><RouterLink to="/">Strona główna</RouterLink></li>
			<li><RouterLink to="/admin-panel/add-contractor">Dodaj kontrahenta</RouterLink></li>
			<li><RouterLink to="/admin-panel/contractors">Kontrahent</RouterLink></li>
			<li><RouterLink to="/admin-panel/catalog">Katalog</RouterLink></li>
			<li><RouterLink to="/admin-panel/price-list">Cenniki</RouterLink></li>
			<li><RouterLink to="/admin-panel/items-photos">Zdjęcia towarów</RouterLink></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'AdminMenu',
}
</script>

<style scoped>
ul {
	position: absolute;
	top: 10%;
	left: 50%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 80%;
	border-bottom: 2px solid white;
	transform: translateX(-50%);
}

a {
	text-decoration: none;
	color: white;
	font-weight: bold;
	font-size: 2.2rem;
}

a:hover {
	color: rgb(189, 187, 184);
}
</style>
