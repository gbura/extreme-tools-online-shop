<template>
	<ul>
		<li>
			<img src="../../assets/images/icons/phone.png" alt="" class="icon" />
			<p>tel. +48 500 710 140</p>
		</li>
		<li>
			<img src="../../assets/images/icons/phone.png" alt="" class="icon" />
			<p>tel. +48 785 710 140 - biuro</p>
		</li>
		<li>
			<img src="../../assets/images/icons/email.png" alt="" class="icon" />
			<p>aurora@extremetools.pl</p>
		</li>
		<li>
			<img src="../../assets/images/icons/globe.png" alt="" class="icon" />
			<p>www.extremetools.pl</p>
		</li>
		<li>
			<img src="../../assets/images/icons/mappin.png" alt="" class="icon last-icon" />
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
p {
	font-family: 'Century-Gothic-Bold', sans-serif;
	font-weight: bold;
}
.icon {
	padding: 0.5rem;
	width: 60px;
	border-radius: 4px;
}
li:last-child {
	margin-top: 2rem;
}

@media (min-width: 992px) {
	li {
		font-size: 2.2rem;
	}
}
</style>
