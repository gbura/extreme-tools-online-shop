<template>
	<h1>DODAJ ADRES E-MAIL:</h1>
	<div class="content">
		<div class="box box-left">
			<input type="email" placeholder="Wprowadź adres e-mail" v-model="email" />
			<button class="add-btn" @click="addNewEmail">Dodaj</button>
		</div>
		<div class="box box-right">
			<ul class="email-list">
				<li v-for="email in emailsStore.emails" :key="email.id">
					<span>{{ email.id }}. </span>
					<span> {{ email.email }}</span>
					<button @click="removeEmail(email.id)">X</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Swal from 'sweetalert2'
import { useEmailsStore } from '@/stores/emails.js'
export default {
	name: 'MailConfiguration',
	setup() {
		const emailsStore = useEmailsStore()
		return { emailsStore }
	},
	data() {
		return {
			email: '',
		}
	},
	mounted() {
		this.getEmails()
	},
	methods: {
		async getEmails() {
			try {
				await this.emailsStore.fetchEmails()
			} catch (error) {
				console.error('Error fetching users:', error)
			}
		},
		async addNewEmail() {
			if (this.validateEmail(this.email)) {
				await this.emailsStore.addEmail(this.email)
				this.email = ''
				await this.getEmails()
			} else {
				Swal.fire({
					title: 'Błąd!',
					text: 'Podaj poprawny adres e-mail!',
					icon: 'error',
				})
			}
		},
		validateEmail(email) {
			const re = /\S+@\S+\.\S+/
			return re.test(email)
		},
		removeEmail(emailId) {
			this.emailsStore.removeEmail(emailId)
			this.getEmails()
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
