<template>
	<view class="new-mv-wrap">
		<view class="title-wrap">
			<text>最新MV</text>
			<navigator url="">更多MV</navigator>
		</view>
		<view class="content-wrap">
			<swiper next-margin="10rpx">
				<swiper-item>
					<view class="swiper-item" v-for="(item,index) in newMvData" :key="item.id" v-if="index <=3" @click="itemClick(item)">
						<image :src="item.cover" mode=""></image>
						<view class="name-wrap">
							<text>{{item.name}}</text>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" v-for="(item,index) in newMvData" :key="item.id" v-if="index > 3 && index <=7" @click="itemClick(item)">
						<image :src="item.cover" mode=""></image>
						<view class="name-wrap">
							<text>{{item.name}}</text>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" v-for="(item,index) in newMvData" :key="item.id" v-if="index >7" @click="itemClick(item)">
						<image :src="item.cover" mode=""></image>
						<view class="name-wrap">
							<text>{{item.name}}</text>
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
			newMvData: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods:{
			itemClick(item){
				uni.navigateTo({
					url: `/pages/mv-play/mv-play?mvid=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.new-mv-wrap {
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
				height: 660rpx;
				width: 100%;

				swiper-item {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;

					.swiper-item {
						margin-right: 20rpx;
						width: 340rpx;
						height: 260rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}

						text {
							font-size: 28rpx;
							color: #444;
							display: block;
							width: 100%;
							height: 40rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
	}
</style>
