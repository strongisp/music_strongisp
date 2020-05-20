<template>
	<view class="official-wrap" v-if="officialListData.length !==0">
		<view class="title">
			官方榜
		</view>
		<view class="content-wrap">
			<view class="official-item" @click="songSheetTo(item.idx)" v-for="(item,index) in officialListData" :key="item.playlist.id">
				<view class="left">
					<image :src="item.playlist.coverImgUrl" mode="widthFix"></image>
					<view class="tips">{{item.updateTime}}</view>
				</view>
				<view class="right">
					<view class="top-three-list" v-for="(key,index) in item.playlist.tracks" :key="key.id" v-if="index < 3">
						{{index+1 +'.'}}
						{{key.name}}
						{{'-'+key.ar[0].name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			officialListData: {
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
	.official-wrap {
		padding: 20rpx 20rpx;

		.title {
			font-size: 40rpx;
			// font-weight: 600;
		}

		.content-wrap {
			.official-item {
				padding-top: 10rpx;
				display: flex;

				.left {
					width: 200rpx;
					height: 200rpx;
					position: relative;
					top: 0;
					right: 0;
					margin-right: 40rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}

					.tips {
						position: absolute;
						bottom: 5rpx;
						left: 10rpx;
						font-size: 26rpx;
						color: rgba($color: #fff, $alpha: .7);
					}
				}

				.right {
					padding-top: 50rpx;
					width: 430rpx;

					.top-three-list {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;

						font-size: 28rpx;
						color: #555;
					}
				}
			}
		}
	}
</style>
