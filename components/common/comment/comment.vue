<template>
	<view class="comment-item-wrap">
		<view class="top-wrap">
			<view class="user-wrap">
				<image class="user-avatar" :src="commentData.user.avatarUrl" mode=""></image>
				<text class="user-name">{{commentData.user.nickname}}</text>
			</view>
			<view class="liked-count">
				<icon type="icon" class="iconfont icon-dianzan" size="28rpx"></icon>
				<text>{{commentData.likedCount}}</text>
			</view>
		</view>
		<view class="content">
			{{commentData.content}}
		</view>
		<view class="time" v-if="commentData.time">
			{{commentData.time | timeSwitch}}
		</view>
	</view>
</template>

<script>
	import {
		_formatDate
	} from '@/utils/common.js'
	export default {
		props: {
			commentData: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		filters: {
			//时间戳转换
			timeSwitch(value) {
				//1.将时间戳转换成Date对象
				const date = new Date(value)
				//2.将Date对象进行格式化
				return _formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-item-wrap {
		margin-bottom: 20rpx;
		border-bottom: 1rpx solid #eee;

		.top-wrap {
			position: relative;
			left: 0;
			top: 0;
			height: 100rpx;
			width: 100%;

			.user-wrap {
				.user-avatar {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					vertical-align: middle;
					margin-right: 20rpx;
				}

				.user-name {
					display: inline-block;
					width: 500rpx;
					font-size: 30rpx;
					color: #555;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			.liked-count {
				position: absolute;
				right: 20rpx;
				top: 10rpx;
				color: #bbb;

				icon {
					font-size: 28rpx;
				}

				text {

					font-size: 28rpx;
				}
			}
		}

		.content {
			font-size: 34rpx;
			color: #333;
			margin: 20rpx 0;
			margin-left: 100rpx;
		}

		.time {
			color: #999;
			font-size: 24rpx;
			margin-left: 100rpx;
		}
	}
</style>
