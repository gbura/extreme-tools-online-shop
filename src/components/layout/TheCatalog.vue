<template>
	<div class="photos-container">
		<div class="photos-box">
			<table>
				<thead>
					<th>Nazwa zdjęcia w katalogu</th>
				</thead>
				<tbody>
					<tr>
						<td class="search-box">
							<img src="../../assets/images/icons/search.png" alt="" class="search-icon" />
							<input type="text" class="search-input" placeholder="Wyszukaj po nazwie..." v-model="searchQuery" />
							<button class="delete-btn" @click="deleteSearchQuery">
								<img src="../../assets/images/icons/X.png" alt="" class="delete-btn-img" />
							</button>
						</td>
					</tr>
					<tr v-for="photo in filteredPhotos" :key="photo.id" v-if="this.catalogImagesStore.photos.length > 0">
						<td class="photo-name">
							{{ photo.name }}
							<button class="delete-photo-btn" @click="catalogImagesStore.deletePhoto(photo.id)">
								<img src="../../assets/images/icons/X.png" alt="" />
							</button>
						</td>
					</tr>
					<h2 v-else>Brak zdjęć w katalogu...</h2>
				</tbody>
			</table>
		</div>
		<button @click="openPopup" class="add-btn">Dodaj</button>
		<UpdateCatalogImages :open="isPopupOpen" @close="closePopup" />
	</div>
</template>

<script>
import { useCatalogImagesStore } from '@/stores/catalogImages.js'
import UpdateCatalogImages from '@/components/layout/UpdateCatalogImages.vue'
export default {
	name: 'ItemsPhotos',
	components: {
		UpdateCatalogImages,
	},
	setup() {
		const catalogImagesStore = useCatalogImagesStore()
		return { catalogImagesStore }
	},
	data() {
		return {
			isPopupOpen: false,
			searchQuery: '',
		}
	},
	computed: {
		filteredPhotos() {
			return this.catalogImagesStore.photos.filter(photo => {
				return photo.name.toLowerCase().includes(this.searchQuery.toLowerCase())
			})
		},
	},
	methods: {
		openPopup() {
			this.isPopupOpen = true
		},
		closePopup() {
			this.isPopupOpen = false
		},
		deleteSearchQuery() {
			this.searchQuery = ''
		},
	},
	mounted() {
		this.catalogImagesStore.getPhotos()
	},
}
</script>

<style scoped>
.photos-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 900px;
	height: 100%;
}
.photos-box {
	width: 100%;
	max-height: 450px;
	overflow-y: auto;
}
.search-input {
	width: 100%;
	border: none;
	outline: none;
	padding: 1rem 2.5rem;
}
.search-box input {
	position: relative;
}
.delete-btn {
	position: absolute;
	right: 10px;
	top: 8px;
	padding: 0.5rem;
	border: none;
	background: none;
	cursor: pointer;
}
.delete-btn-img {
	width: 15px;
	height: 15px;
}

.search-box .search-icon {
	position: absolute;
	top: 50%;
	left: 15px;
	width: 15px;
	height: 15px;
	transform: translateY(-50%);
	z-index: 15;
}
h2 {
	text-align: center;
	padding: 2rem 0;
}
table,
th,
td {
	border: 2px solid rgb(255, 153, 0);
	border-collapse: collapse;
	font-family: 'Arial', sans-serif;
	font-weight: bold;
	padding: 1rem;
}
table {
	width: 100%;
}
th {
	background-color: orange;
	font-size: 1.8rem;
	text-align: center;
	border: 3px solid rgb(175, 106, 15);
}
tbody {
	background-color: rgba(51, 50, 50, 0.514);
}
tbody tr {
	position: relative;
}
.photo-id {
	width: 50px;
}
.delete-photo-btn {
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	padding: 0.5rem;
	border: none;
	background: none;
	color: red;
	cursor: pointer;
}
.delete-photo-btn img {
	width: 15px;
	height: 15px;
}
.add-btn {
	border: none;
	background: orange;
	padding: 1rem 3rem;
	margin: 2rem 0;
	cursor: pointer;
	border-radius: 8px;
	color: white;
	font-weight: bold;
	font-size: 1.8rem;
	width: 120px;
}
.add-btn:hover {
	background: rgb(226, 150, 8);
}
</style>
