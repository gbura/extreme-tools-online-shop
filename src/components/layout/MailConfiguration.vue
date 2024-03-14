<template>
	<h1>KONFIGURUJ ADRES E-MAIL:</h1>
	<div class="content">
		<div class="box box-left">
			<input type="email" placeholder="Wprowadź adres e-mail" v-model="email" />
			<button class="add-btn" @click="addNewEmail">Dodaj</button>
		</div>
		<div class="box box-right">
			<ul class="email-list">
				<li v-for="email in emails" :key="email">{{ email }}<button @click="removeEmail(email)">X</button></li>
			</ul>
		</div>
	</div>
</template>

<script>
import Swal from 'sweetalert2'
import { useEmailsStore } from '@/stores/emails.js'
export default {
	name: 'MailConfiguration',
	data() {
		return {
			emails: [],
			email: '',
		}
	},
	setup() {
		const emailsStore = useEmailsStore()
		return { emailsStore }
	},
	created() {
		const storedEmails = localStorage.getItem('emails')
		if (storedEmails) {
			this.emails = JSON.parse(storedEmails)
		}
	},
	methods: {
		addNewEmail() {
			if (this.validateEmail(this.email)) {
				this.emails.push(this.email)
				this.email = ''
				localStorage.setItem('emails', JSON.stringify(this.emails))
				Swal.fire({
					title: 'Sukces!',
					text: 'Dodałeś nowego kontrahenta!',
					icon: 'success',
				})
			} else {
				Swal.fire({
					title: 'Błąd!',
					text: 'Podaj poprawny adres e-mail!',
					icon: 'error',
				})
			}
		},
		removeEmail(email) {
			const index = this.emails.indexOf(email)
			if (index !== -1) {
				this.emails.splice(index, 1)
				localStorage.setItem('emails', JSON.stringify(this.emails))
			}
		},
		validateEmail(email) {
			const re = /\S+@\S+\.\S+/
			return re.test(email)
		},
	},
}
</script>

<style scoped>
.content {
	display: flex;
	justify-content: space-between;
	width: 100%;
}
.box {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
}
input {
	width: 90%;
	padding: 2rem;
	font-size: 2rem;
	outline: none;
}
.add-btn {
	padding: 2rem 4rem;
	margin-top: 1rem;
	border: none;
	background-color: orange;
	color: white;
	font-size: 2rem;
	cursor: pointer;
}
.add-btn:hover {
	background-color: rgb(226, 152, 15);
}
h1 {
	position: absolute;
	top: 250px;
	border-bottom: 2px solid white;
}
.email-list {
	font-size: 2rem;
	list-style-type: none;
	width: 80%;
	text-align: center;
	max-height: 200px;
	overflow-y: auto;
}
li {
	position: relative;
	width: 100%;
	padding: 2rem;
	border: 2px solid white;
	background-color: orange;
}
li:hover {
	background-color: rgb(226, 152, 15);
}
li button {
	position: absolute;
	right: 5px;
	top: 0;
	padding: 0.5rem;
	background: transparent;
	color: red;
	border-color: red;
	cursor: pointer;
}
</style>
