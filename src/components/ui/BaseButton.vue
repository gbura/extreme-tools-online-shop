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
	background: rgb(255, 101, 1);
	border: none;
	border-radius: 4px;
	color: #fff;
	font-size: 1.8rem;
	font-weight: bold;
	transition: background-color 0.2s ease-in;
	cursor: pointer;
}
button:hover {
	background-color: rgb(245, 118, 34);
}
</style>
