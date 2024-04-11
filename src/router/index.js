import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import WelcomeView from '../views/WelcomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import AdminPanel from '@/views/AdminPanel.vue'
import ContractorForm from '@/components/layout/ContractorForm.vue'
import TheContractors from '@/components/layout/TheContractors.vue'
import TheCatalog from '@/components/layout/TheCatalog.vue'
import PriceLists from '@/components/layout/PriceLists.vue'
import EditPriceList from '@/components/layout/EditPriceList.vue'
import MailConfiguration from '@/components/layout/MailConfiguration.vue'
import ChangeMainSite from '@/components/layout/ChangeMainSite.vue'
import ItemsPhotos from '@/components/layout/ItemsPhotos.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'welcome',
			component: WelcomeView,
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: DashboardView,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/admin-panel',
			name: 'admin-panel',
			component: AdminPanel,
			meta: {
				requiresAuth: true,
				requiresAdmin: true,
			},
			children: [
				{
					path: 'mail-configuration',
					name: 'mail-configuration',
					component: MailConfiguration,
				},
				{
					path: 'change-main-site',
					name: 'change-main-site',
					component: ChangeMainSite,
				},
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
					path: 'price-lists',
					name: 'price-lists',
					component: PriceLists,
				},
				{
					path: '/admin-panel/price-lists/edit/:id',
					name: 'edit-price-list',
					component: EditPriceList,
				},
				{
					path: 'items-photos',
					name: 'items-photos',
					component: ItemsPhotos,
				},
			],
		},
		{
			path: '/:notFound(.*)',
			component: WelcomeView,
		},
	],
})

async function checkAuthentication(to, _, next) {
	const authStore = useAuthStore()
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
	const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

	// Sprawdź stan uwierzytelnienia tylko dla tras wymagających go
	if (requiresAuth) {
		// Pobierz informacje o użytkowniku
		await authStore.fetchUser()

		// Jeśli użytkownik nie jest zalogowany, przekieruj na stronę logowania
		if (!authStore.isAuthenticated) {
			return next({ name: 'login' })
		}
	}

	// Obsługa tras wymagających roli admina
	if (requiresAdmin && !authStore.isLoggedAdmin) {
		return next({ name: 'dashboard' })
	}

	// Jeśli dotarliśmy tutaj, użytkownik jest zalogowany lub trasa nie wymaga uwierzytelnienia
	next()
}

router.beforeEach(checkAuthentication)

export default router
