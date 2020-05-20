<template>
	<view class="song-wrap">
		<view class="toolbar-wrap">
			<view class="play">
				<icon type="icon" class="iconfont icon-bofang2" size="20rpx"></icon>
				<text class="play-text">全部播放</text>
				<text class="all-text">（共{{listTracksData.length}}首）</text>
			</view>
		</view>
		<view class="song-item" v-for="(item,index) in listTracksData" :key="item.id" @click="toPlayClick(item.name,item.id,index)"
		 :class="{active:currentIndex===index}">
			<view class="left">
				{{index+1<=9?'0'+(index+1):index+1}}
			</view>
			<view class="center">
				<view class="top">
					<text class="text">{{item.name}}</text>
					<text>{{item.alia[0]?'('+item.alia[0]+')':''}}</text>
				</view>
				<view class="bottom">
					<text>{{item.singerName}}</text>
					<text>-</text>
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="right">
				<icon type="icon" class="iconfont icon-bofang2" size="20rpx"></icon>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		_historySong
	} from '@/utils/dataLogic.js'
	export default {
		props: {
			listTracksData: {
				type: Array,
				default () {
					return []
				}
			},
			songSheetId: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {
				currentIndex: null
			}
		},
		methods: {
			toPlayClick(songName, songId, index) {
				//动态修改当前点击元素样式
				this.currentIndex = index
				// const songSheetId = this.songSheetId
				// 调用_播放历史记录
				_historySong(songName, songId, this.songSheetId)
				// 跳转播放页面，并传递参数(歌的id)
				uni.navigateTo({
					url: '/pages/song-playing/song-playing?songId=' + songId + '&songSheetId=' + this.songSheetId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.song-wrap {
		padding: 0 20rpx;

		.toolbar-wrap {
			height: 80rpx;
			width: 100%;
			line-height: 80rpx;

			.play {
				.play-text {
					font-size: 36rpx;
					color: #333;
				}

				.all-text {
					font-size: 30rpx;
					color: #666;
				}
			}
		}

		icon {
			width: 44rpx;
			height: 44rpx;
			border: 1rpx solid #333;
			color: #333;
			font-size: 26rpx;
			line-height: 45rpx;
			text-align: center;
			border-radius: 50%;
			margin-right: 10rpx;
		}

		.song-item {
			height: 100rpx;
			overflow: hidden;

			.left {
				float: left;
				height: 100rpx;
				line-height: 100rpx;
				padding-right: 20rpx;
				font-size: 28rpx;
			}

			.center {
				float: left;
				height: 100rpx;
				width: 500rpx;
				height: 100%;

				.top {
					margin-top: 10rpx;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #aaa;
					font-size: 34rpx;

					.text {
						color: #333;
					}
				}

				.bottom {
					width: 80%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #aaa;

					font-size: 24rpx;
					letter-spacing: 2rpx;

					// margin-top: 10rpx;
					text {
						display: inline-block;
						// width: 100%;
						color: #aaa;
					}
				}
			}

			.right {
				float: right;
				flex: 20;
				height: 100rpx;
				line-height: 100rpx;

				icon {}
			}
		}

		.active {
			background-color: rgba($color: #eee, $alpha: 0.5);
		}
	}
</style>
