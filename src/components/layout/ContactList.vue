<template>
	<ul>
		<li>
			<img src="../../assets/images/icons/phone.svg" alt="" class="icon" />
			<p>tel. +48 500 710 140</p>
		</li>
		<li>
			<img src="../../assets/images/icons/phone.svg" alt="" class="icon" />
			<p>tel. +48 785 710 140 - biuro</p>
		</li>
		<li>
			<img src="../../assets/images/icons/mail.svg" alt="" class="icon" />
			<p>aurora@extremetools.pl</p>
		</li>
		<li>
			<img src="../../assets/images/icons/globe.svg" alt="" class="icon" />
			<p>www.extremetools.pl</p>
		</li>
		<li>
			<img src="../../assets/images/icons/map-pin.svg" alt="" class="icon" />
			<p>Paczków 48-370 ul. Jagiellońska 15</p>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'ContactList',
}
</script>

<style scoped>
ul {
	display: flex;
	flex-direction: column;
	list-style-type: none;
	gap: 2rem;
	margin: 4rem 0 10rem;
	width: 500px;
}
li {
	display: flex;
	align-items: center;
	gap: 1rem;
	font-size: 1.6rem;
	font-weight: bold;
	color: #fff;
}
.icon {
	background-color: rgb(239, 127, 52);
	padding: 0.5rem;
	border-radius: 4px;
}

@media (min-width: 992px) {
	li {
		font-size: 2.2rem;
	}
}
</style>
