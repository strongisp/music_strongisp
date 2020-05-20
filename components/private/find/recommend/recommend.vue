<template>
	<view class="recommend-wrap">
		<view @click="getNavUrl(item.title)" class="content" v-for="(item,index) in recommendOption" :key="index">
			<view class="box">
				<icon type="icon" class="iconfont" :class="item.iconClass"></icon>
			</view>
			<text>{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			recommendOption: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			getNavUrl(name) {
				let currentUrl = '';
				switch (name) {
					case '每日推荐':
						currentUrl = '/pages/day-recommend/day-recommend'
						break
					case '歌单':
						currentUrl = '/pages/song-square/song-square'
						break
					case '排行榜':
						currentUrl = '/pages/ranking-list/ranking-list'
						break
					case '电台':
						currentUrl = '/pages/radio-station/radio-station'
						break
					case '私人FM':
						currentUrl = '/pages/private-fm/private-fm'
						break
				}
				uni.navigateTo({
					url: currentUrl
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommend-wrap {
		display: flex;
		padding-top: 20rpx;
		padding-bottom: 20rpx;

		.content {
			flex: 1;
			text-align: center;

			.box {
				width: 90rpx;
				height: 90rpx;
				background-color: red;
				border-radius: 50%;
				margin: 0 auto;
				margin-bottom: 10rpx;

				.iconfont {
					margin-top: 15rpx;
					color: #FFFFFF;
					font-size: 45rpx;
				}
			}

			text {
				font-size: 28rpx;
				color: #333;
			}
		}
	}
</style>
