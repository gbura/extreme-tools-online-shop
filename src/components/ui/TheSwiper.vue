<template>
	<div class="slider-box">
		<swiper ref="mainSwiper" :loop="true" :modules="modules" :navigation="true" @slideChange="updateCurrentSlide">
			<swiper-slide v-for="(image, index) in images" :key="index">
				<img :src="getImageUrl(image.filename)" alt="" />
			</swiper-slide>
		</swiper>

		<div class="thumbnail-carousel">
			<swiper :slides-per-view="7" class="thumbnail-swiper" ref="thumbnailSwiper">
				<swiper-slide v-for="(image, index) in images" :key="index" :class="{ active: currentSlideIndex === index }">
					<img :src="getImageUrl(image.filename)" alt="" />
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import imagesData from '../../db/photos.json'

export default {
	components: {
		Swiper,
		SwiperSlide,
	},
	data() {
		return {
			modules: [Navigation],
			images: [],
			currentSlideIndex: 0,
		}
	},
	mounted() {
		this.images = imagesData.images
	},
	methods: {
		getImageUrl(filename) {
			return `../src/assets/images/catalog/${filename}`
		},
		updateCurrentSlide(event) {
			this.currentSlideIndex = event.realIndex
		},
	},
}
</script>

<style>
.slider-box {
	height: 100%;
}
.swiper {
	width: 100%;
	max-width: 550px;
	height: 100%;
}
.swiper-button-prev::after,
.swiper-button-next::after {
	font-size: 6rem !important;
	color: rgb(179, 177, 177) !important;
	background-color: rgba(24, 24, 23, 0.623);
}

.swiper-slide {
	width: 100%;
	height: 100%;
}

.swiper-slide img {
	width: 100%;
	height: 100%;
}

.thumbnail-swiper {
	width: 100%;
}
.thumbnail-swiper .swiper-slide {
	width: 60px;
	height: 60px;
	cursor: pointer;
	margin-right: 10px;
	border: 1px solid transparent;
}
.thumbnail-swiper .swiper-slide:last-child {
	margin-right: 0;
}
.thumbnail-swiper .swiper-slide.active {
	border-color: green;
}
</style>
