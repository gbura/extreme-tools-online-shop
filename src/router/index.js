import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import WelcomeView from '../views/WelcomeView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminLoginPanel from '../views/AdminLoginPanel.vue'
import AdminPanel from '@/views/AdminPanel.vue'
import ContractorForm from '@/components/layout/ContractorForm.vue'
import TheContractors from '@/components/layout/TheContractors.vue'
import TheCatalog from '@/components/layout/TheCatalog.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'welcome',
			component: WelcomeView,
		},
		{
			path: '/home',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/admin-login-panel',
			name: 'admin-login-panel',
			component: AdminLoginPanel,
		},
		{
			path: '/admin-panel',
			name: 'admin-panel',
			component: AdminPanel,
			children: [
				{
					path: 'add-contractor',
					name: 'add-contractor',
					component: ContractorForm,
				},
				{
					path: 'contractors',
					name: 'contractors',
					component: TheContractors,
				},
				{
					path: 'catalog',
					name: 'catalog',
					component: TheCatalog,
				},
				{
					path: 'price-list',
					name: 'price-list',
					component: '',
				},
				{
					path: 'items-photos',
					name: 'items-photos',
					component: '',
				},
			],
		},
		{
			path: '/:notFound(.*)',
			component: WelcomeView,
		},
	],
})
function checkAuthentication(to, _, next) {
	const authstore = useAuthStore()

	if (!authstore.isAuthenticated && to.name !== 'login' && to.name !== 'welcome' && to.name !== 'admin-login-panel') {
		next({ name: 'login' })
	} else {
		next()
	}
}

router.beforeEach(checkAuthentication)

export default router
