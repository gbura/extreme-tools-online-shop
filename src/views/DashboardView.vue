<template>
	<div class="modal">
		<div class="wrapper">
			<div class="container">
				<template v-if="!dataLoaded">
					<SkeletonLoader />
				</template>
				<template v-else>
					<div class="item-img">
						<img
							:src="
								`https://api.extremetoolsb2b.pl/public/app/public/parts/` +
								selectedItemImage +
								`?timestamp=${new Date().getTime()}`
							"
							alt="Zdjęcie narzędzia"
							@click="openFullscreen(selectedItemImage)"
							@error="handleImageError" />
					</div>
					<button class="toggle-slider-btn" aria-label="Przycisk pokaż katalog">
						<a href="https://extremetools.pl/katalog/" target="_blank">
							<img src="../assets/images/showCatalog.png" alt="Przycisk pokaż katalog" />
						</a>
					</button>
					<div class="right-box">
						<div class="items-table">
							<ItemsTable
								@row-click="changeItemImage"
								@next-tab-click="changeItemImage"
								@filters-updated="updateSelectedItemImage" />
						</div>
					</div>
				</template>
			</div>
		</div>
		<div v-if="fullscreen" class="fullscreen-overlay" @click="closeFullscreen"></div>
		<img v-if="fullscreen" :src="fullscreenImageSrc" class="fullscreen-image" />
		<button v-if="fullscreen" class="close-button" @click="closeFullscreen">
			<img src="../assets/images/icons/X.png" alt="" class="delete-btn-img" />
		</button>
	</div>
</template>

<script>
import ItemsTable from '@/components/layout/ItemsTable.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SkeletonLoader from '@/components/ui/SkeletonLoader.vue'
import { useShoppingCartStore } from '@/stores/shoppingcart.js'

export default {
	components: {
		ItemsTable,
		BaseButton,
		SkeletonLoader,
	},
	name: 'DashboardView',
	data() {
		return {
			dataLoaded: false,
			selectedItemImage: '',
			fullscreen: false,
			fullscreenImageSrc: '',
		}
	},
	setup() {
		const shoppingCartStore = useShoppingCartStore()
		return { shoppingCartStore }
	},
	mounted() {
		setTimeout(() => {
			this.dataLoaded = true
		}, 1000)
		this.shoppingCartStore.fetchItems()
		this.selectedItemImage = 'SFMCB100-XJ.jpg'
	},
	methods: {
		updateSelectedItemImage(filters) {
			if (Object.values(filters).every(value => value === '')) {
				this.selectedItemImage = 'SFMCB100-XJ.jpg'
			}
		},
		changeItemImage(productImage) {
			if (productImage && productImage.url) {
				setTimeout(() => {
					this.selectedItemImage = productImage.url
				}, 0)
			} else if (productImage === null) {
				this.selectedItemImage = 'nophoto.jpg'
			}
		},
		handleImageError() {
			this.selectedItemImage = 'nophoto.jpg'
		},
		openFullscreen(imageSrc) {
			this.fullscreen = true
			this.fullscreenImageSrc =
				`https://api.extremetoolsb2b.pl/public/app/public/parts/${imageSrc}` + `?timestamp=${new Date().getTime()}`
			document.body.style.overflow = 'hidden'
		},
		closeFullscreen() {
			this.fullscreen = false
			document.body.style.overflow = ''
		},
	},
}
</script>

<style scoped>
.modal {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	background-color: rgba(0, 0, 0, 0.527);
}
.container {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
	gap: 4rem;
	margin-top: 10rem;
	width: 100%;
	min-height: 80vh;
	height: 100%;
}
.toggle-slider-btn {
	position: absolute;
	left: -200px;
	top: 110px;
	transform: rotate(-90deg);
	background: none;
	border: none;
	color: #b9b5b5;
	cursor: pointer;
}
.toggle-slider-btn:hover {
	color: #cfcbcb;
}
.right-box {
	display: flex;
	flex-direction: column;
}
.item-img {
	margin-left: 2rem;
}
.item-img img {
	border: 4px solid rgb(255, 101, 1);
	width: 300px;
	height: 250px;
	cursor: zoom-in;
}
.fullscreen-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 999;
	cursor: default;
}
.fullscreen-image {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-width: 100%;
	max-height: 90%;
	z-index: 1000;
	cursor: default;
}
.close-button {
	position: fixed;
	top: 50px;
	right: 50px;
	border: none;
	padding: 0.5rem;
	background: none;
	font-size: 4rem;
	z-index: 1001;
	cursor: pointer;
}
.close-button img {
	width: 50px;
	height: 50px;
}
@media (min-width: 1200px) {
	.container {
		flex-direction: row;
	}
}

@media (min-width: 1440px) {
	.item-img img {
		width: 350px;
		height: 250px;
	}
}

@media (min-width: 1600px) {
	.item-img img {
		width: 450px;
		height: 350px;
	}
}
@media (min-width: 1700px) {
	.item-img img {
		width: 550px;
		height: 400px;
	}
}
</style>
