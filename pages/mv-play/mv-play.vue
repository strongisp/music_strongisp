<template>
	<view class="mv-play-wrap" v-if="Object.keys(mvUrl).length !==0 && Object.keys(mvDetail).length !==0 && Object.keys(simiMv).length !==0 && Object.keys(commentMv).length !==0">
		<!-- 视频播放开始 -->
		<video v-if="Object.keys(mvUrl).length !==0" enable-play-gesture vslide-gesture-in-fullscreen class="alias-video" id="alias-video"
		 :src="mvUrl.data.url" controls page-gesture :poster="mvDetail.data.cover" show-mute-btn :title="mvDetail.data.name"
		 @play="mvPlay" @pause="mvPause" @ended="mvEnded">
		</video>
		<!-- 视频播放结束 -->

		<!-- 视频介绍开始 -->
		<view class="detail-wrap">
			<view class="top-wrap">
				<image class="cover" :src="mvDetail.data.cover" mode=""></image>
				<text class="name">{{mvDetail.data.name}}</text>
			</view>
			<view class="bottom-wrap">
				<text class="time-title">发布:</text>
				<text class="publish-time">{{mvDetail.data.publishTime}}</text>
				<text class="count-title">播放:</text>
				<text class="play-count">{{mvDetail.data.playCount}}次</text>
			</view>
			<view class="desc">{{mvDetail.data.desc}}</view>
		</view>
		<!-- 视频介绍结束 -->

		<!-- 类似mv开始 -->
		<view class="simi-wrap">
			<mv-list v-for="(item,index) in simiMv.mvs" :mvData="item" v-if="index <= 3" />
		</view>
		<!-- 类似mv结束 -->

		<!-- 评论区域开始 -->
		<view class="comment-mv">
			<view class="title">热门评论</view>
			<comment-data v-for="(item,index) in commentMv.comments" :commentData="item" />
		</view>
		<!-- 评论区域结束 -->
		<!-- 到底提示开始 -->
		<view class="bottom-text-wrap" v-if="Object.keys(commentMv).length !== 0">
			--已经到底了哦--
		</view>
		<!-- 到底提示结束 -->
	</view>
</template>

<script>
	import MvList from '@/components/common/mvlist/mvlist.vue'
	import CommentData from '@/components/common/comment/comment.vue'
	export default {
		components: {
			MvList,
			CommentData
		},
		data() {
			return {
				//mvId
				mvId: 0,
				//mv播放url数据
				mvUrl: {},
				//mv信息
				mvDetail: {},
				//类似mv信息
				simiMv: {},
				//mv的评论
				commentMv: {}
			}
		},
		onLoad(option) {
			this.mvId = option.mvid
			this.getCurrentMvData(option.mvid)
		},
		methods: {
			//获取当前点击mv数据
			getCurrentMvData(mvid) {
				const allData = [{
					url: '/mv/url?id=',
					data: 'mvUrl'
				}, {
					url: '/mv/detail?mvid=',
					data: 'mvDetail'
				}, {
					url: '/simi/mv?mvid=',
					data: 'simiMv'
				}, {
					url: '/comment/mv?id=',
					data: 'commentMv'
				}]
				//统一获取需要的数据
				allData.forEach((item, index) => {
					this.$request({
						url: item.url + mvid
					}).then(res => {
						this.$set(this, item.data, res);
					})
				})
			},
			//开始播放事件
			mvPlay() {
				if (!this.$music.paused) this.$music.pause()
			}
		}
	}
</script>
<style>
	page {
		height: 100%;
		width: 100%;
	}
</style>

<style lang="scss" scoped>
	.mv-play-wrap {
		box-sizing: border-box;

		.alias-video {
			width: 100%;
			height: 450rpx;
		}

		.detail-wrap {
			padding: 20rpx;

			.top-wrap {
				width: 100%;
				height: 120rpx;

				.cover {
					width: 120rpx;
					height: 100%;
					border-radius: 50%;
					border: 1rpx solid #eee;
					vertical-align: middle;
					margin-right: 20rpx;
				}

				.name {
					display: inline-block;
					font-size: 38rpx;
					color: #333;
					width: 200rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.bottom-wrap {
				font-size: 30rpx;
				width: 100%;
				height: 40rpx;
				color: #ccc;
				margin-top: 20rpx;

				.time-title {
					padding-right: 10rpx;
				}

				.publish-time {
					padding-right: 20rpx;
				}

				.count-title {
					padding-right: 10rpx;

				}
			}

			.desc {
				width: 100%;
				margin-top: 20rpx;
				font-size: 30rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 5;
				-webkit-box-orient: vertical;
			}
		}

		.simi-wrap {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}

		.comment-mv {
			padding: 20rpx;

			.title {
				border-bottom: 10rpx solid #eee;
				margin-bottom: 15rpx;
				padding-bottom: 5rpx;
			}
		}

		.bottom-text-wrap {
			color: #888;
			font-size: 24rpx;
			padding-bottom: 20rpx;
			text-align: center;
		}
	}
</style>
