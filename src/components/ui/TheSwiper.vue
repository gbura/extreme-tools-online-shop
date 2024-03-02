<template>
	<swiper :slides-per-view="1" :space-between="0" :loop="true" :modules="modules" :navigation="true">
		<swiper-slide>Slide 1</swiper-slide>
		<swiper-slide>Slide 2</swiper-slide>
		<swiper-slide>Slide 3</swiper-slide>
	</swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default {
	components: {
		Swiper,
		SwiperSlide,
	},
	name: 'TheSwiper',
	setup() {
		return {
			modules: [Navigation],
		}
	},
}
</script>

<style>
.swiper {
	width: 100%;
	height: 600px;
}
.swiper-button-prev::after,
.swiper-button-next::after {
	color: white !important;
}

.swiper-slide {
	width: 100%;
	height: 100%;
	background-color: rgb(255, 101, 1);
}
@media (min-width: 768px) {
	.swiper {
		width: 50%;
	}
}
</style>
