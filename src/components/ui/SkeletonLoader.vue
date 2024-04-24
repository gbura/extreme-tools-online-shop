<template>
	<div class="skeleton-loader">
		<div class="skeleton-slider"></div>
		<div class="skeleton-table">
			<div class="skeleton-table-row" v-for="n in 9" :key="n">
				<div class="skeleton-table-cell"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SkeletonLoader',
}
</script>

<style scoped>
.skeleton-loader {
	display: flex;
	gap: 2rem;
}

.skeleton-slider {
	width: 500px;
	height: 400px;
	background-color: #f0f0f0;
}

.skeleton-table {
	width: 750px;
	background-color: #f0f0f0;
	height: 550px;
}

.skeleton-table-row {
	display: flex;
	gap: 2rem;
	padding: 0.5rem 0;
}

.skeleton-table-cell {
	flex: 1;
	width: 100%;
	height: 50px;
	background-color: #e0e0e0;
}
</style>
