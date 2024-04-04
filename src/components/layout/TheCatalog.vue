<template>
	<div class="photos-container">
		<div class="photos-box">
			<table>
				<thead>
					<th>Nazwa zdjęcia w katalogu</th>
				</thead>
				<tbody>
					<tr v-for="photo in catalogImagesStore.photos" :key="photo.id">
						<td class="photo-name">
							{{ photo.name }}
							<button class="delete-photo-btn" @click="catalogImagesStore.deletePhoto(photo.id)">
								<img src="../../assets/images/icons/X.png" alt="" />
							</button>
						</td>
					</tr>
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
