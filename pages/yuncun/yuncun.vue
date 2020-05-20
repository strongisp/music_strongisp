<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onShow() {
			uni.showToast({
				title: '正在维护中...',
				icon: 'none',
				duration: 2000
			})
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/find/find'
				})
			}, 1000)
		},
		methods: {

		}
	}
</script>

<style>
	page {
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		background-color: #ff0000;
	}
</style>
