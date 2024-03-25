<template>
	<div class="photos-container">
		<div class="photo-box" v-for="photo in photosStore.photos" :key="photo.id">
			<p>Kod: {{ photo.part.code }}</p>
			<img :src="`http://127.0.0.1:8000/app/public/` + photo.url" class="photo-img" />
			<button @click="updatePhoto(photo.part.id, photo.part.code)">AKTUALIZUJ</button>
		</div>
		<div class="pagination">
			<button @click="previousPage" :disabled="photosStore.paginate.currentPage === 1">Poprzednia strona</button>
			<span>Strona {{ photosStore.paginate.currentPage }} z {{ photosStore.paginate.totalPages }}</span>
			<button @click="nextPage" :disabled="photosStore.paginate.currentPage === photosStore.paginate.totalPages">
				Następna strona
			</button>
		</div>
	</div>
	<UpdateImage :open="isPopupOpen" @close="closePopup" />
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
		updatePhoto(partId, partCode) {
			console.log('Aktualizuję zdjęcie z częścią o ID:', partId, 'i kodzie:', partCode)
			this.openPopup()
		},
		previousPage() {
			this.photosStore.previousPage()
		},
		nextPage() {
			this.photosStore.nextPage()
		},
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
	width: 100%;
	height: 100%;
	margin-top: 20rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 2rem;
}
.photo-box {
	position: relative;
	width: 25%;
	border: 1px solid orange;
}

.photo-box .photo-img {
	width: 100%;
}
.photo-box button {
	position: absolute;
	right: 0;
	top: 0;
	background: orange;
	border: none;
	font-size: 1.6rem;
	cursor: pointer;
}
.pagination button {
	padding: 0.5rem;
	margin-bottom: 5rem;
	background-color: orange;
	border: none;
	font-size: 2rem;
	color: white;
	cursor: pointer;
	border-radius: 8px;
}
.pagination button:disabled {
	background-color: rgba(255, 166, 0, 0.664);
	cursor: not-allowed;
}
.pagination span {
	font-size: 2rem;
	margin: 0 1rem;
}
</style>
