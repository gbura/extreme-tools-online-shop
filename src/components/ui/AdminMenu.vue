<template>
	<div>
		<ul>
			<li><RouterLink to="/admin-panel/change-main-site">Strona główna</RouterLink></li>
			<li><RouterLink to="/admin-panel/mail-configuration">Konfiguracja maila</RouterLink></li>
			<li><RouterLink to="/admin-panel/add-contractor">Dodaj kontrahenta</RouterLink></li>
			<li><RouterLink to="/admin-panel/contractors">Kontrahent</RouterLink></li>
			<li><RouterLink to="/admin-panel/catalog">Katalog</RouterLink></li>
			<li><RouterLink to="/admin-panel/items-photos">Zdjęcia</RouterLink></li>
			<li><RouterLink to="/admin-panel/price-lists">Cenniki</RouterLink></li>
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
	background-color: rgb(189, 131, 23);
	list-style-type: none;
	border-radius: 15px;
	transform: translateX(-50%);
}

a {
	text-decoration: none;
	color: white;
	font-weight: bold;
	font-size: 2.2rem;
}

a:hover {
	color: rgb(255, 166, 0);
}

.router-link-active {
	border: none;
	padding: 0.5rem;
	color: rgb(255, 166, 0);
}
</style>
