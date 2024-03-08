<template>
	<button>
		<slot></slot>
	</button>
</template>
<script>
export default {
	name: 'BaseButton',
}
</script>

<style scoped>
button {
	padding: 2rem 1rem;
	background: rgb(248, 118, 31);
	border: none;
	border-radius: 4px;
	color: #fff;
	font-size: 1.8rem;
	font-weight: bold;
	transition: background-color 0.2s ease-in;
	cursor: pointer;
}
button:hover {
	background-color: rgb(241, 133, 61);
}
</style>
