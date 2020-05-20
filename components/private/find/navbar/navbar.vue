<template>
	<view class="nav-bar-wrap">
		<button type="default" class="left-content">
			<icon type="icon" class="iconfont icon-menu1" />
		</button>
		<view class="center-content">
			<text>发现音乐</text>
		</view>
		<button type="default" class="right-content" @click="searchClick">
			<icon type="icon" class="iconfont icon-fangdajing4" />
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			searchClick() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar-wrap {
		display: flex;
		height: 80rpx;
		width: 100%;

		button::after {
			border: none;
		}

		.left-content,
		.right-content {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: transparent;
			color: #333;
		}

		.left-content {
			icon {
				font-size: 40rpx;
				color: #dddddd;
			}
		}

		.right-content {
			icon {
				font-size: 40rpx;
				color: #dddddd;
			}
		}

		.center-content {
			flex: 10;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
