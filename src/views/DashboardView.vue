<template>
	<div class="modal">
		<div class="wrapper">
			<div class="container">
				<template v-if="!dataLoaded">
					<SkeletonLoader />
				</template>
				<template v-else>
					<button class="toggle-slider-btn" @click="toggleSlider">
						<img src="../assets/images/showCatalog.png" alt="" v-if="!isOpenSlider" />
						<img src="../assets/images/hideCatalog.png" alt="" v-else />
					</button>
					<TheSwiper v-if="!isOpenSlider" />

					<div class="right-box">
						<div class="items-table">
							<ItemsTable @row-click="changeItemImage" @next-tab-click="changeItemImage" />
						</div>
						<div class="item-img">
							<img :src="`https://pawelkajdas.pl/public/app/public/` + selectedItemImage" alt="" />
						</div>
					</div>
				</template>
			</div>
		</div>
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
				this.selectedItemImage = productImage.url
			} else if (productImage === null) {
				this.selectedItemImage = 'X.jpg'
			}
		},
		toggleSlider() {
			this.isOpenSlider = !this.isOpenSlider
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
}

@media (min-width: 1200px) {
	.container {
		flex-direction: row;
	}
}
</style>
