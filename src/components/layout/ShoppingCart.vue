<template>
	<div v-if="open" class="backdrop" @click="$emit('close')"></div>
	<transition name="modal">
		<dialog open v-if="open">
			<button class="delete-btn" @click="$emit('close')"><img src="../../assets/images/icons/X.png" alt="" /></button>
			<slot></slot>
		</dialog>
	</transition>
</template>

<script>
export default {
	name: 'ShoppingCart',
	props: ['open'],
	emits: ['close'],
}
</script>

<style scoped>
.backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 10;
	background-color: rgba(0, 0, 0, 0.75);
}

dialog {
	position: fixed;
	top: 50%;
	width: 60%;
	height: 80%;
	left: 50%;
	margin: 0;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	border-radius: 12px;
	padding: 1rem;
	z-index: 100;
	background-color: rgb(255, 101, 1);
	border: none;
	transform: translate(-50%, -50%);
}
.delete-btn {
	position: absolute;
	top: 5px;
	right: 5px;
	border: none;
	background: none;
	cursor: pointer;
}
.delete-btn img {
	width: 30px;
	height: 30px;
}
.modal-enter-active {
	animation: modal 0.3s ease-out;
}

.modal-leave-active {
	animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>
