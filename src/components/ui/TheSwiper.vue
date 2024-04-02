<template>
	<div class="slider-box">
		<swiper :loop="true" :modules="modules" :navigation="true">
			<swiper-slide v-for="image in images" :key="image.id">
				<img :src="`https://pawelkajdas.pl/public/app/public/` + image.name" alt="" />
			</swiper-slide>
		</swiper>
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
		async fetchImages() {
			const response = await instanceAxios.get('bo/catalogImages')
			this.images = response.data.data
		},
	},
}
</script>

<style>
.slider-box {
	height: 100%;
	margin-left: 2rem;
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
</style>
