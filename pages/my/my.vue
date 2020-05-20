<template>
	<view class="my-wrap">
		<!-- 导航栏开始 -->
		<view class="nav-bar">
			我的
		</view>
		<!-- 导航栏结束 -->
		<!-- 登录信息显示专区开始 -->
		<view class="top-wrap">
			<!-- 登录后显示 -->
			<view class="user-wrap" v-if="Object.keys(user).length !==0">
				<view class="logon-message">
					<view class="user-img">
						<image :src="user.avatarUrl" mode=""></image>
					</view>
					<view class="user-name">
						<text class="name">{{user.city}}</text>
						<view class="modify-message">
							<text>修改信息</text>
							<icon type="icon" size="" class="iconfont icon-arrow-right"></icon>
						</view>
					</view>
				</view>
				<view class="signin">
					签到
				</view>
				<view class="user-power">
					<view class="item-wrap">
						<icon type="icon" size="" class="iconfont icon-xiazai2"></icon>
						<view class="title">
							本地音乐
						</view>
					</view>
					<view class="item-wrap">
						<icon type="icon" size="" class="iconfont icon-diantai"></icon>
						<view class="title">
							我的电台
						</view>
					</view>
					<view class="item-wrap">
						<icon type="icon" size="" class="iconfont icon-star"></icon>
						<view class="title">
							我的收藏
						</view>
					</view>
					<view class="item-wrap">
						<icon type="icon" size="" class="iconfont icon-xinge"></icon>
						<view class="title">
							关注新歌
						</view>
					</view>
				</view>
			</view>
			<!-- 未登录显示 -->
			<view class="not-logon" v-else>
				<view class="img">
					<image class="top-img" src="../../static/images/notLogon/top.jpg" mode="widthFix"></image>
					<image src="../../static/images/notLogon/bottom.jpg" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 登录信息显示专区结束 -->
		<!-- 用户功能开始 -->
		<view class="bottom-wrap">
			<!-- 登录按钮 -->
			<button class="login-button" type="warn" open-type="getUserInfo" @getuserinfo="loginClick" v-if="Object.keys(user).length ==0">
				点击进行登录
			</button>
			<view class="tool-wrap">
				<view class="button-style" v-if="Object.keys(user).length !==0">
					<icon type="icon" class="iconfont left-icon icon-wode1"></icon>
					退出登录
				</view>
				<view class="button-style">
					<icon type="icon" class="iconfont left-icon icon-yueliang"></icon>
					<text>夜间模式</text>
					<view class="pos">
						<switch @change="" color="#626262" />
					</view>
				</view>
				<view class="button-style">
					<icon type="icon" class="iconfont left-icon icon-dingshi "></icon>
					<text>定时关闭</text>
					<view class="pos">
						<icon type="icon" class="iconfont right-icon icon-arrow-right3"></icon>
					</view>
				</view>
				<view class="button-style">
					<icon type="icon" class="iconfont left-icon icon-heimingdan3 "></icon>
					<text>音乐黑名单</text>
					<view class="pos">
						<icon type="icon" class="iconfont right-icon icon-arrow-right3"></icon>
					</view>
				</view>
				<view class="button-style">
					<icon type="icon" class="iconfont left-icon icon-shezhi-1 "></icon>
					<text>青少年模式</text>
					<view class="pos">
						<icon type="icon" class="iconfont right-icon icon-arrow-right3"></icon>
					</view>
				</view>
			</view>
			<!-- 推出登录按钮 -->
		</view>
		<!-- 用户功能结束 -->
	</view>
</template>

<script>
	const _this = this
	export default {
		data() {
			return {
				user: {}
			}
		},
		onLoad() {
			const user = uni.getStorageSync('user')
			if (user) {
				this.user = user
			}
		},
		methods: {
			loginClick(e) {
				this.user = e.detail.userInfo
				uni.setStorageSync('user', e.detail.userInfo);
			}
		}
	}
</script>
<style>
	page {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}
</style>

<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}

	.my-wrap {
		height: 100%;
		width: 100%;
		background-color: #333;

		.nav-bar {
			color: #fff;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background-color: rgba($color: #999, $alpha: 0.2);
		}

		.top-wrap {
			padding: 40rpx 20rpx 20rpx;
			height: 30%;
			position: relative;
			top: 0;
			left: 0;

			.user-wrap {
				.logon-message {
					display: flex;

					.user-img {
						margin-right: 30rpx;

						image {
							width: 120rpx;
							height: 120rpx;
							border-radius: 50%;
						}
					}

					.user-name {
						color: #eee;
						margin-top: 10rpx;

						.name {
							font-size: 28rpx;
						}

						.modify-message {
							height: 32rpx;
							line-height: 28rpx;

							text {
								font-size: 24rpx;
							}

							icon {
								font-size: 24rpx;
							}
						}
					}
				}

				.signin {
					position: absolute;
					right: 60rpx;
					top: 70rpx;
					font-size: 26rpx;
					color: #fff;

					background-color: #d00000;
					padding: 4rpx 20rpx;
					border-radius: 30rpx;
				}

				.user-power {
					display: flex;
					margin-top: 50rpx;

					.item-wrap {
						flex: 1;
						text-align: center;
						color: #eee;
						font-size: 23rpx;

						icon {
							font-size: 50rpx;
							padding-bottom: 10rpx;
						}

						.title {}
					}
				}
			}
		}

		.not-logon {
			height: 100%;
			width: 100%;
			position: relative;
			top: 0;
			left: 0;

			.img {
				width: 400rpx;
				height: 300rpx;
				overflow: hidden;
				position: absolute;
				left: 50%;
				bottom: -20rpx;
				transform: translateX(-50%);

				image {
					width: 400rpx;
					vertical-align: top;
				}

				.top-img {
					border-radius: 30rpx 30rpx 0 0;
				}
			}
		}

		.bottom-wrap {
			box-sizing: border-box;
			height: 60%;
			width: 100%;
			background-color: #fff;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
			padding: 20rpx;

			.login-button {
				width: 60%;
				border-radius: 40rpx;
			}

			.tool-wrap {
				width: 100%;
				margin-top: 100rpx;

				.button-style {
					box-sizing: border-box;
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 30rpx;
					color: #333;
					background-color: #eee;
					padding-left: 30rpx;
					border-top: 1rpx solid #ccc;
					overflow: hidden;

					&:first-child {
						border-radius: 10rpx 10rpx 0 0;
					}

					&:last-child {
						border-bottom: 1rpx solid #ccc;
						border-radius: 0 0 10rpx 10rpx;
					}

					.left-icon {
						color: #ccc;
						margin-right: 20rpx;

					}

					.right-icon {
						color: #333;
						padding-right: 40rpx;
					}

					.pos {
						float: right;

						switch {
							transform: scale(0.7)
						}
					}
				}
			}
		}
	}
</style>
