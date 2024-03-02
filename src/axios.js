import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'

const instaceAxios = axios.create({
	baseURL: 'https://pawelkajdas.pl/api/',
})

instaceAxios.interceptors.request.use(
	config => {
		const authStore = useAuthStore()
		const token = authStore.token
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export default instaceAxios

// http://127.0.0.1:8000/api/