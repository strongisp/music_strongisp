<template>
	<view class="comment-wrap">
		<view class="comment-item" v-for="(item,index) in hotCommentsData" :key="index">
			<view class="user-news">
				<image class="user-img" :src="item.user.avatarUrl" mode=""></image>
				<text class="user-name">
					{{item.user.nickname}}
				</text>
			</view>
			<view class="user-content">
				{{item.content}}
			</view>
			<view class="time">
				{{item.time | showDate}}
			</view>
			<view class="likedCount">
				<icon type="icon" class="iconfont icon-dianzan" size="30rpx"></icon>
				<text>{{item.likedCount}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		_formatDate
	} from '@/utils/common.js'

	export default {
		props: {
			hotCommentsData: {
				type: Array,
				default () {
					return []
				}
			}
		},
		filters: {
			//时间戳转换
			showDate(value) {
				//1.将时间戳转换成Date对象
				const date = new Date(value)
				//2.将Date对象进行格式化
				return _formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-wrap {
		padding: 20rpx;

		.comment-item {
			padding: 20rpx 0;
			width: 100%;
			position: relative;
			left: 0;
			right: 0;

			.user-news {
				width: 100%;
				height: 80rpx;

				.user-img {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					vertical-align: middle;
					margin-right: 16rpx;
				}

				.user-name {
					display: inline-block;
					width: 400rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 32rpx;
					color: #666;
				}
			}

			.user-content {
				margin-left: 80rpx;
				color: #333333;
				font-size: 28rpx;
			}

			.time {
				margin: 10rpx 0 0 80rpx;
				padding-bottom: 10rpx;
				font-size: 28rpx;
				border-bottom: 1rpx solid #eee;
			}

			.likedCount {
				position: absolute;
				right: 0;
				top: 20rpx;

				.icon-dianzan {
					font-size: 30rpx;
					padding-right: 10rpx;
				}

				text {
					font-size: 30rpx;
				}
			}
		}
	}
</style>
