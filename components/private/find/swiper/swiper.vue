<template>
	<view class="swiper-wrap">
		<!-- {{swipersData}} -->
		<swiper circular indicator-dots autoplay :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swipersData" :key="item.bannerId">
				<view class="content-wrap">
					<image :src="item.pic"></image>
					<view class="title" :style="{'background-color':item.titleColor||'red'}">
						{{item.typeTitle}}
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			swipersData: {
				type: Array,
				default () {
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-wrap {
		border-radius: 20rpx;
		overflow: hidden;

		swiper {
			width: 100%;
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			margin: 0 auto;
			border-radius: 20rpx;
			overflow: hidden;

			swiper-item {
				position: relative;
				left: 0;
				top: 0;
				border-radius: 20rpx;
				overflow: hidden;

				.content-wrap {
					width: 100%;
					height: 100%;
					padding: 0 20rpx;
					border-radius: 20rpx;
					overflow: hidden;

					image {
						width: 95%;
						height: 100%;
						border-radius: 20rpx;
						overflow: hidden;
					}

					.title {
						position: absolute;
						color: #eee;
						bottom: 0;
						right: 18rpx;
						font-size: 24rpx;
						background-color: #ff0000;
						border-radius: 20rpx 0rpx 20rpx 0rpx;
						text-align: center;
						padding: 5rpx 15rpx;
					}
				}


			}

		}
	}
</style>
