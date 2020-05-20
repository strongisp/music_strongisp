<template>
	<view class="song-wrap">
		<view class="song-title">
			<text>推荐歌单</text>
			<navigator url="#">歌单广场</navigator>
		</view>
		<view class="content">
			<swiper class="swiper" next-margin="20rpx">
				<swiper-item>
					<view class="swiper-item" v-for="(item,index) in songSheetData" :key="item.id" v-if="index<=5" @click="songSheetClick(item)">
						<view class="img-wrap">
							<image :src="item.picUrl" mode=""></image>
						</view>
						<view class="item-playCount">
							<icon type="icon" size="20rpx" class="iconfont icon-xiangyousanjiaoxing"></icon>
							<text>{{item.playCount | filterNumbers}}</text>
						</view>
						<view class="name-wrap">
							<text class="item-name">{{item.name}}</text>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" v-for="(item,index) in songSheetData" :key="item.id" v-if="index>5" @click="songSheetClick(item)">
						<view class="img-wrap">
							<image :src="item.picUrl" mode=""></image>
						</view>
						<view class="item-playCount">
							<icon type="icon" size="20rpx" class="iconfont icon-xiangyousanjiaoxing"></icon>
							<text>{{item.playCount | filterNumbers}}</text>
						</view>
						<view class="name-wrap">
							<text class="item-name">{{item.name}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			songSheetData: {
				type: Array,
				default () {
					return []
				}
			}
		},
		filters: {
			filterNumbers(value) {
				if (value < 10000) return value;
				return (value / 10000).toFixed(0) + "万";
			}
		},
		methods: {
			songSheetClick(item) {
				uni.navigateTo({
					url: '/pages/song-sheet/song-sheet?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.song-wrap {
		padding: 20rpx 10rpx;
		padding-bottom: 0;

		.song-title {
			overflow: hidden;
			padding-bottom: 20rpx;

			text {
				font-size: 34rpx;
				float: left;
				font-weight: 600;
				color: #333;
			}

			navigator {
				font-size: 20rpx;
				float: right;
				color: #bebebe;
				border: 1rpx solid #bebebe;
				padding: 10rpx 24rpx;
				border-radius: 24rpx;
			}
		}

		.content {
			.swiper {
				width: 100%;
				height: 660rpx;

				swiper-item {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;

					.swiper-item {
						width: 220rpx;
						height: 220rpx;
						position: relative;
						top: 0;
						left: 0;

						.img-wrap {
							width: 100%;
							height: 100%;
							padding-bottom: 10rpx;

							image {
								width: 100%;
								height: 100%;
								border-radius: 10rpx;
							}
						}

						.item-playCount {
							position: absolute;
							right: 8rpx;
							top: 5rpx;
							font-size: 20rpx;
							color: rgba($color: #f0f0f0, $alpha: .8);

						}

						.icon-xiangyousanjiaoxing {
							font-size: 20rpx;
							padding-right: 5rpx;
						}

						.name-wrap {
							height: 77rpx;
							line-height: 38rpx;

							.item-name {
								font-size: 28rpx;
								color: #333;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
							}
						}
					}
				}
			}
		}
	}
</style>
