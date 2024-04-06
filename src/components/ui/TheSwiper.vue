<template>
	<div class="slider-box">
		<swiper :loop="true" :modules="modules" :navigation="true">
			<swiper-slide v-for="image in images" :key="image.id" @click="openFullscreen(image)">
				<img :src="`https://pawelkajdas.pl/public/app/public/catalog/` + image.name" alt="" />
			</swiper-slide>
		</swiper>
		<div v-if="fullscreen" class="fullscreen-overlay" @click="closeFullscreen"></div>
		<img
			v-if="fullscreen"
			ref="fullscreenImage"
			class="fullscreen-image"
			:src="fullscreenImageSrc"
			@wheel="handleWheel" />
		<button v-if="fullscreen" class="close-button" @click="closeFullscreen">X</button>
	</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import instanceAxios from '@/axios'

export default {
	name: 'TheSwiper',
	components: {
		Swiper,
		SwiperSlide,
	},
	data() {
		return {
			modules: [Navigation],
			images: [],
			fullscreen: false,
			fullscreenImageSrc: '',
			zoomLevel: 100,
			zoomIncrement: 5,
		}
	},
	mounted() {
		this.fetchImages()
	},
	methods: {
		async fetchImages() {
			const response = await instanceAxios.get('bo/catalogImages')
			this.images = response.data.data
		},
		openFullscreen(image) {
			this.fullscreen = true
			this.fullscreenImageSrc = `https://pawelkajdas.pl/public/app/public/catalog/${image.name}`
			document.body.style.overflow = 'hidden'
		},
		closeFullscreen() {
			this.fullscreen = false
			document.body.style.overflow = ''
		},
		handleWheel(event) {
			event.preventDefault()
			const delta = Math.sign(event.deltaY)
			if (delta > 0) {
				this.zoomOut()
			} else {
				this.zoomIn()
			}
		},
		zoomIn() {
			this.zoomLevel += this.zoomIncrement
			this.updateTransform()
		},
		zoomOut() {
			this.zoomLevel -= this.zoomIncrement
			if (this.zoomLevel < 50) {
				this.zoomLevel = 50
			}
			this.updateTransform()
		},
		updateTransform() {
			const image = this.$refs.fullscreenImage
			image.style.transform = `translate(-50%, -50%) scale(${this.zoomLevel / 100})`
		},
	},
}
</script>

<style>
.slider-box {
	position: relative;
	height: 100%;
}
.swiper {
	width: 100%;
	max-width: 520px;
	height: 100%;
}
.swiper-button-prev::after,
.swiper-button-next::after {
	font-size: 6rem !important;
	color: rgb(179, 177, 177) !important;
	background-color: rgba(24, 24, 23, 0.623);
}
.swiper-button-prev {
	left: var(--swiper-navigation-sides-offset, 2px) !important;
}
.swiper-button-next {
	right: var(--swiper-navigation-sides-offset, 2px) !important;
}

.swiper-slide {
	width: 100%;
	height: 100%;
}

.swiper-slide img {
	width: 100%;
	height: 100%;
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
	cursor: zoom-in;
}

.close-button {
	position: fixed;
	top: 30px;
	right: 50px;
	border: 1px solid red;
	padding: 0.5rem;
	background: none;
	color: red;
	font-size: 4rem;
	z-index: 1001;
	cursor: pointer;
}
</style>
