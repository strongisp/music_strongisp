<template>
	<view class="mv-wrap" @click='itemClick(mvData)'>
		<view class="top-wrap">
			<image :src="mvData.cover" mode=""></image>
			<view class="top-right">
				<icon type="icon" class="iconfnt icon-xiangyousanjiaoxing"></icon>
				<text>{{mvData.playCount | filterNumbers}}</text>
			</view>
		</view>
		<view class="name-wrap">
			{{mvData.name}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			mvData: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		filters: {
			filterNumbers(value) {
				if (value < 10000) return value;
				return (value / 10000).toFixed(0) + 'Íò';
			}
		},
		methods: {
			itemClick(item) {
				uni.navigateTo({
					url: `/pages/mv-play/mv-play?mvid=${item.id}`
				})
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
</style>

<style lang="scss" scoped>
	.mv-wrap {
		width: 350rpx;
		margin-bottom: 20rpx;

		.top-wrap {
			width: 100%;
			height: 260rpx;
			padding-bottom: 10rpx;
			position: relative;

			image {
				border-radius: 15rpx;
				width: 100%;
				height: 100%;
			}

			.top-right {
				position: absolute;
				right: 8rpx;
				top: 5rpx;
				font-size: 20rpx;
				color: rgba($color: #f0f0f0, $alpha: .8);

				icon {
					font-size: 20rpx;
					padding-right: 5rpx;
				}

				text {}
			}
		}

		.name-wrap {
			width: 100%;
			font-size: 30rpx;
			color: #666;

			display: -webkit-box;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
		}
	}
</style>
