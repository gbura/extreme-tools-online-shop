<template>
	<div class="modal">
		<div class="wrapper">
			<div class="container">
				<template v-if="!dataLoaded">
					<SkeletonLoader />
				</template>
				<template v-else>
					<button class="toggle-slider-btn" @click="toggleSlider">
						<img src="../assets/images/showCatalog.png" alt="" v-if="isOpenSlider" />
						<img src="../assets/images/hideCatalog.png" alt="" v-else />
					</button>
					<TheSwiper v-if="!isOpenSlider" />
					<div class="right-box">
						<div class="items-table">
							<ItemsTable @row-click="changeItemImage" @next-tab-click="changeItemImage" />
						</div>
						<div class="item-img">
							<img
								:src="
									`http://127.0.0.1:8000/public/app/public/parts/` +
									selectedItemImage +
									`?timestamp=${new Date().getTime()}`
								"
								alt=""
								@click="openFullscreen(selectedItemImage)" />
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
import TheSwiper from '@/components/ui/TheSwiper.vue'
import ItemsTable from '@/components/layout/ItemsTable.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SkeletonLoader from '@/components/ui/SkeletonLoader.vue'

export default {
	components: {
		TheSwiper,
		ItemsTable,
		BaseButton,
		SkeletonLoader,
	},
	name: 'DashboardView',
	data() {
		return {
			dataLoaded: false,
			selectedItemImage: '',
			isOpenSlider: false,
			fullscreen: false,
			fullscreenImageSrc: '',
		}
	},
	mounted() {
		setTimeout(() => {
			this.dataLoaded = true
		}, 1000)
	},
	methods: {
		changeItemImage(productImage) {
			if (productImage) {
				setTimeout(() => {
					this.selectedItemImage = productImage.url
				}, 0)
			} else if (productImage === null) {
				this.selectedItemImage = 'nophoto.jpg'
			}
		},
		toggleSlider() {
			this.isOpenSlider = !this.isOpenSlider
		},
		openFullscreen(imageSrc) {
			this.fullscreen = true
			this.fullscreenImageSrc =
				`http://127.0.0.1:8000/public/app/public/parts/${imageSrc}` + `?timestamp=${new Date().getTime()}`
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
	gap: 6rem;
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
.item-img img {
	border: 4px solid rgb(255, 101, 1);
	width: 280px;
	margin-top: 2rem;
	cursor: zoom-in;
}
@media (min-width: 1200px) {
	.container {
		flex-direction: row;
	}
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
</style>
