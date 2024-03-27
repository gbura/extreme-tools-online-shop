<template>
	<div class="slider-box">
		<swiper :loop="true" :modules="modules" :navigation="true" @slideChange="updateCurrentSlide">
			<swiper-slide v-for="image in images" :key="image.id">
				<img :src="`https://pawelkajdas.pl/public/app/public/` + image.url" alt="" />
			</swiper-slide>
		</swiper>

		<div class="thumbnail-carousel">
			<swiper :slides-per-view="7" class="thumbnail-swiper">
				<swiper-slide v-for="(image, index) in images" :key="image.id" :class="{ active: currentSlideIndex === index }">
					<img :src="`https://pawelkajdas.pl/public/app/public/` + image.url" alt="" />
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
			currentSlideIndex: 0,
		}
	},
	mounted() {
		this.fetchImages()
	},
	methods: {
		updateCurrentSlide(event) {
			this.currentSlideIndex = event.realIndex
		},
		async fetchImages() {
			const response = await instanceAxios.get('bo/catalogImages')
			this.images = response.data.data.data
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
