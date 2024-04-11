<template>
	<div class="slider-box" @mousemove="handleMouseMove">
		<swiper :loop="true" :modules="modules" :navigation="true">
			<swiper-slide v-for="image in images" :key="image.id" @click="openFullscreen(image)">
				<img
					:src="`http://127.0.0.1:8000/app/public/catalog/` + image.name + `?timestamp=${new Date().getTime()}`"
					alt="" />
			</swiper-slide>
		</swiper>
		<div v-if="fullscreen" class="fullscreen-overlay" @click="closeFullscreen"></div>
		<div v-if="fullscreen" class="fullscreen-container">
			<div class="fullscreen-image-wrapper" @wheel.prevent="handleWheel">
				<img
					ref="fullscreenImage"
					class="fullscreen-image"
					:src="fullscreenImageSrc"
					:style="{
						transform:
							'translate(-50%, -50%) scale(' + zoomLevel / 100 + ') translateY(' + Math.abs(translateY) + 'px)',
					}" />
			</div>
		</div>
		<button v-if="fullscreen" class="close-button" @click="closeFullscreen">
			<img src="../../assets/images/icons/X.png" alt="" class="delete-btn-img" />
		</button>
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
			zoomIncrement: 10,
			translateY: 0,
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
			this.fullscreenImageSrc =
				`http://127.0.0.1:8000/app/public/catalog/${image.name}` + `?timestamp=${new Date().getTime()}`
			document.body.style.overflow = 'hidden'
		},
		closeFullscreen() {
			this.fullscreen = false
			this.zoomLevel = 100
			this.translateY = 0
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
		handleMouseMove(event) {
			if (this.fullscreen) {
				const deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
				if (deltaY > 0) {
					this.scrollDown()
				} else if (deltaY < 0) {
					this.scrollUp()
				}
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
			const imageHeight = (image.clientHeight * this.zoomLevel) / 100
			if (imageHeight > window.innerHeight) {
				this.translateY = -((imageHeight - window.innerHeight) / 2)
			} else {
				this.translateY = 0
			}
		},
		scrollDown() {
			document.querySelector('.fullscreen-image-wrapper').scrollBy(0, 30)
		},
		scrollUp() {
			document.querySelector('.fullscreen-image-wrapper').scrollBy(0, -30)
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

.fullscreen-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.fullscreen-image-wrapper {
	max-width: 100%;
	max-height: 100%;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	position: relative;
}

.fullscreen-image {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-width: 100%;
	max-height: 100%;
	cursor: zoom-in;
}

.close-button {
	position: fixed;
	top: 30px;
	right: 50px;
	border: none;
	padding: 0.5rem;
	background: none;
	font-size: 4rem;
	z-index: 1001;
	cursor: pointer;
}
</style>
