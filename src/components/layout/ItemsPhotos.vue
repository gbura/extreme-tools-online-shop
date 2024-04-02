<template>
	<div class="photos-container">
		<div class="photos-box">
			<table>
				<thead>
					<th>ID</th>
					<th>Nazwa</th>
				</thead>
				<tbody>
					<tr v-for="photo in photosStore.photos" :key="photo.id">
						<td>{{ photo.id }}.</td>
						<td>{{ photo.name }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<button @click="openPopup">Otworz</button>
		<UpdateImage :open="isPopupOpen" @close="closePopup" />
	</div>
</template>

<script>
import { usePhotosStore } from '@/stores/photos.js'
import UpdateImage from '@/components/layout/UpdateImage.vue'
export default {
	name: 'ItemsPhotos',
	components: {
		UpdateImage,
	},
	setup() {
		const photosStore = usePhotosStore()
		return { photosStore }
	},
	data() {
		return {
			isPopupOpen: false,
		}
	},
	methods: {
		openPopup() {
			this.isPopupOpen = true
		},
		closePopup() {
			this.isPopupOpen = false
		},
	},
	mounted() {
		this.photosStore.getPhotos()
	},
}
</script>

<style scoped>
.photos-container {
	flex-direction: column !important;
}
</style>
