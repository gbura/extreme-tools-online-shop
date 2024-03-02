<template>
	<div class="container">
		<TheSwiper />
		<div class="right-box">
			<div class="items-table">
				<ItemsTable @row-click="changeItemImage" />
			</div>
			<div class="item-img">
				<img :src="selectedItemImage" alt="" />
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
.container {
	margin-top: 10rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
}
.item-img {
	width: 300px;
	background-color: #fff;
	border: 5px solid rgb(255, 101, 1);
}

.item-img img {
	width: 100%;
	padding: 1rem;
}
.right-box {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 4rem;
}

.items-table {
	width: 100%;
}

@media (min-width: 992px) {
	.container {
		flex-direction: row;
	}
}
@media (min-width: 1200px) {
	.container {
		flex-direction: row;
		gap: 12rem;
	}
}
</style>
