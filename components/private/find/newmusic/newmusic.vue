<template>
	<view class="new-music-wrap">
		<view class="title-wrap">
			<text>新歌/新碟</text>
			<navigator url="">更多新歌</navigator>
		</view>
		<view class="content-wrap">
			<swiper next-margin="10rpx">
				<swiper-item>
					<view class="swiper-item" v-for="(item,index) in newMusicData" :key="item.id" v-if="index <= 2" @click="songClick(item)">
						<view class="img-wrap">
							<image :src="item.picUrl" mode=""></image>
						</view>
						<view class="text-wrap">
							<view class="name-wrap">
								<text>{{item.song.name}}</text>
								<text>-{{item.song.artists[0].name}}</text>
							</view>
							<view class="introduce-wrap">
								<text>{{item.song.alias[0] ||""}}</text>
							</view>
						</view>
						<view class="play-button">
							<icon type="icon" size="20rpx" class="iconfont icon-bofang2"></icon>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" v-for="(item,index) in newMusicData" :key="item.id" v-if="index > 2 && index <= 5">
						<view class="img-wrap">
							<image :src="item.picUrl" mode=""></image>
						</view>
						<view class="text-wrap">
							<view class="name-wrap">
								<text>{{item.song.name}}</text>
								<text>-{{item.song.artists[0].name}}</text>
							</view>
							<view class="introduce-wrap">
								<text>{{item.song.alias[0] ||""}}</text>
							</view>
						</view>
						<view class="play-button">
							<icon type="icon" size="20rpx" class="iconfont icon-bofang2"></icon>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" v-for="(item,index) in newMusicData" :key="item.id" v-if="index >5">
						<view class="img-wrap">
							<image :src="item.picUrl" mode=""></image>
						</view>
						<view class="text-wrap">
							<view class="name-wrap">
								<text>{{item.song.name}}</text>
								<text>-{{item.song.artists[0].name}}</text>
							</view>
							<view class="introduce-wrap">
								<text>{{item.song.alias[0] ||""}}</text>
							</view>
						</view>
						<view class="play-button">
							<icon type="icon" size="20rpx" class="iconfont icon-bofang2"></icon>
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
			newMusicData: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			songClick(item) {
				uni.navigateTo({
					url: `/pages/song-playing/song-playing?songId=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.new-music-wrap {

		padding: 0 10rpx;

		.title-wrap {
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

		.content-wrap {
			swiper {
				height: 520rpx;

				swiper-item {

					.swiper-item {
						display: flex;
						position: relative;
						left: 0;
						top: 0;

						.img-wrap {
							image {
								width: 160rpx;
								height: 160rpx;
								border-radius: 10rpx;
							}
						}

						.text-wrap {
							padding-left: 40rpx;

							.name-wrap {
								width: 400rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;

								text {
									font-size: 32rpx;
									letter-spacing: 1rpx;
									color: #333;

									&:last-child {
										color: #aaa;
										font-size: 28rpx;
									}
								}
							}

							.introduce-wrap {
								padding-top: 10rpx;
								width: 380rpx;

								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								color: #ccc;

								text {
									font-size: 26rpx;
									color: #ccc;
								}
							}
						}

						.play-button {
							position: absolute;
							right: 20rpx;
							bottom: 50%;
							transform: translateY(50%);

							width: 60rpx;
							height: 60rpx;
							border: 1rpx solid #ccc;
							border-radius: 50%;

							display: flex;
							justify-content: center;
							align-items: center;

							.icon-bofang2 {
								color: #f00000;

							}
						}
					}
				}
			}
		}
	}
</style>
