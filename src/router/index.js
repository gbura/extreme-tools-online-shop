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
