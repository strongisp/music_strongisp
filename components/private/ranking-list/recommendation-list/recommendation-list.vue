<template>
	<view class="recommendation-wrap" v-if="recommendationListData.length !==0">
		<view class="title">
			推荐榜
		</view>
		<view class="content-wrap">
			<view class="item-wrap" @click="songSheetTo(item.idx)" v-for="(item,index) in recommendationListData" :key="item.playlist.id">
				<view class="item-img">
					<image :src="item.playlist.coverImgUrl"></image>
					<view class="tips">
						{{item.updateTime}}
					</view>
				</view>
				<view class="item-name">
					{{item.playlist.name}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			recommendationListData: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			//跳转到歌单详情并把数据传递过去
			songSheetTo(idx) {
				//跳转页面(参数idx，每一项数据idx);
				uni.navigateTo({
					url: '/pages/song-sheet/song-sheet?idx=' + idx
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommendation-wrap {
		padding: 20rpx;

		.title {
			font-size: 40rpx;
		}

		.content-wrap {
			padding: 10rpx 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.item-wrap {
				width: 230rpx;
				// height: 250rpx;
				padding-bottom: 10rpx;

				.item-img {
					width: 230rpx;
					height: 220rpx;
					position: relative;
					left: 0;
					top: 0;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}

					.tips {
						font-size: 26rpx;
						color: rgba($color: #fff, $alpha: .7);
						position: absolute;
						bottom: 6rpx;
						left: 10rpx;
					}
				}

				.item-name {
					font-size: 30rpx;
					color: #333;
					// width: 100%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}
	}
</style>
