<template>
	<view class="search-wrap">

		<!-- 页面标题开始 -->
		<view class="title-wrap">
			搜索
		</view>

		<!-- 页面标题结束 -->

		<!-- 顶部搜索开始 -->
		<view class="search-entity-wrap">
			<view class="search-box">
				<input type="text" v-model="inputValue" :placeholder="defaultText.showKeyword" maxlength="30" confirm-type="search" />
				<icon @click="searchClick" type=" icon" class="iconfont icon-fangdajingsousuo"></icon>
			</view>
		</view>

		<!-- 顶部搜索结束 -->

		<!-- 热搜开始 -->
		<view class="hot-search-wrap" v-if="!inputValue">
			<view class="title">
				<text>热搜榜</text>
			</view>
			<view class="content-wrap">
				<view class="item-wrap" v-for="(item,index) in hotData" :key="index" @click="hotItemClick(item)">
					<view class="item-Ranking">
						{{index+1}}
					</view>
					<view class="item">
						<view class="top-wrap">
							<text>{{item.searchWord}}</text>
							<image v-if="item.iconUrl" :src="item.iconUrl" mode="aspectFit"></image>
						</view>
						<view class="bottom-wrap">
							{{item.content}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 热搜结束 -->

		<!-- 搜索内容反馈开始 -->
		<view class="feedback-wrap" v-else>
			搜索 : " {{inputValue}} "
		</view>

		<!-- 搜索内容反馈结束 -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//热搜榜数据
				hotData: [],
				//默认搜索关键词数据
				defaultText: {},
				//输入框内容
				inputValue: ''
			}
		},
		onLoad() {
			//调用热搜榜数据
			this.getHot()
			//调用默认搜索关键词数据
			this.getDefault()
		},
		methods: {
			//请求热搜榜数据函数
			getHot() {
				this.$request({
					url: '/search/hot/detail'
				}).then(res => {
					this.hotData = res.data
				})
			},
			//请求默认搜索关键词
			getDefault() {
				this.$request({
					url: '/search/default'
				}).then(res => {
					this.defaultText = res.data
				})
			},
			//传递热搜点击事件
			hotItemClick(item) {
				uni.navigateTo({
					url: `/pages/discover/discover?keywords=${item.searchWord}`
				})
			},
			searchClick() {
				const reg = "^[ ]+$";
				const re = new RegExp(reg);

				if (!this.inputValue || this.inputValue == '' || re.test(this.inputValue)) {
					uni.showToast({
						title: '没有内容',
						icon: 'none',
						duration: 2000
					});
				} else {
					let v = this.inputValue.replace(/\s/g, '')
					uni.navigateTo({
						url: `/pages/discover/discover?keywords=${v}`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-wrap {
		width: 100%;
		height: 100%;

		.title-wrap {
			width: 100%;
			text-align: center;
			height: 80rpx;
			line-height: 80rpx;
			color: #333;
			background-color: rgba($color: #eee, $alpha: .5);
			margin-bottom: 20rpx;
		}

		.search-entity-wrap {
			padding: 0 20rpx;

			.search-box {
				border: 3rpx solid #999;
				height: 70rpx;
				border-radius: 50rpx;
				padding: 0 30rpx;
				position: relative;
				top: 0;
				left: 0;

				input {
					font-size: 26rpx;
					height: 70rpx;
					padding-right: 50rpx;
					color: #555;
				}

				icon {
					position: absolute;
					top: 50%;
					right: 20rpx;
					transform: translateY(-50%);
					font-size: 50rpx;
					color: #aaa;
				}
			}
		}

		.hot-search-wrap {
			padding: 20rpx;

			.title {
				height: 60rpx;

				text {
					font-size: 34rpx;
				}
			}

			.content-wrap {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;

				.item-wrap {
					width: 340rpx;
					height: 86rpx;
					overflow: hidden;
					display: flex;
					margin-bottom: 20rpx;

					.item-Ranking {
						font-size: 34rpx;
						color: #aaa;
						margin-right: 10rpx;
						width: 40rpx;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.item {
						height: 100%;
						// width: 100%;

						.top-wrap {
							width: 280rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;

							text {
								font-size: 28rpx;
								color: #333;
							}

							image {
								margin-left: 10rpx;
								width: 50rpx;
								height: 30rpx;
							}
						}

						.bottom-wrap {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							width: 280rpx;

							font-size: 24rpx;
							color: #bbb;
						}
					}
				}
			}
		}

		.feedback-wrap {
			padding: 20rpx 50rpx;
			// margin-left: 50rpx;
			// margin-top: 20rpx;s
			font-size: 32rpx;
			color: #49dcc4;
		}
	}
</style>
