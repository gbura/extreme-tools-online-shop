<template>
	<div class="modal">
		<div class="wrapper">
			<div class="container">
				<TheSwiper />
				<div class="right-box">
					<div class="items-table">
						<ItemsTable @row-click="changeItemImage" />
					</div>
					<!-- <div class="item-img">
						<img :src="selectedItemImage" alt="" />
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TheSwiper from '@/components/ui/TheSwiper.vue'
import ItemsTable from '@/components/layout/ItemsTable.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

export default {
	components: {
		TheSwiper,
		ItemsTable,
		BaseButton,
	},
	name: 'HomeView',
	data() {
		return {
			selectedItemImage: null,
		}
	},
	methods: {
		changeItemImage(productCode) {
			import(`@/assets/images/accessories/${productCode}.png`)
				.then(image => {
					this.selectedItemImage = image.default
				})
				.catch(error => {
					console.error('Error loading image:', error)
				})
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
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 6rem;
	margin-top: 10rem;
	width: 100%;
}

.right-box {
	display: flex;
	flex-direction: column;
}

.item-img img {
	border: 5px solid rgb(255, 101, 1);
	width: 300px;
}

@media (min-width: 1200px) {
	.container {
		flex-direction: row;
	}
}
</style>
