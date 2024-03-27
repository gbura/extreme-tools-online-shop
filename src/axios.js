import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'

const instanceAxios = axios.create({
	baseURL: 'https://pawelkajdas.pl/api/',
})

instanceAxios.interceptors.request.use(
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

export default instanceAxios
