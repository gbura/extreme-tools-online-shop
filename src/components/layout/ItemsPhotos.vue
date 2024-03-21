<template>
	<div class="photos-container">
		<h1>elo</h1>
		<div class="photo-box">
			<img :src="`http://127.0.0.1:8000/app/public/` + photoUrl" class="photo-img" />
		</div>
	</div>
</template>

<script>
import instanceAxios from '@/axios'
export default {
	name: 'ItemsPhotos',
	data() {
		return {
			photoUrl: '',
			code: '',
			items: [],
		}
	},
	mounted() {
		this.getImages()
	},
	methods: {
		async getImages() {
			const response = await instanceAxios.get('bo/images')
			const data = await response.data.data.data
			console.log(data)
			// lepiej zrobic store w pinii
		},
	},
}
</script>

<style scoped>
.photos-container {
	width: 100%;
	background-color: #fff;
}
</style>
