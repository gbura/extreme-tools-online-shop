<template>
	<div>
		<h1>Lista kontrahentów:</h1>
		<p v-if="!users.length">Brak kontrahentów na liście!</p>
		<ul v-else>
			<li v-for="user in users" :key="user.id">
				<div>
					<span>{{ user.id }}.</span>
					<span>{{ user.email }}</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'TheContractors',
	props: {
		users: {
			type: Array,
			default: [],
		},
	},
}
</script>

<style scoped>
ul {
	display: flex;
	flex-direction: column-reverse;
}
li {
	padding: 1rem;
	border: 1px solid white;
	background-color: orange;
	list-style-type: none;
	cursor: pointer;
}
li:hover {
	background-color: rgb(192, 126, 4);
}
span {
	margin-right: 1rem;
}
h1 {
	border-bottom: 1px solid white;
	margin-bottom: 1rem;
}
</style>
