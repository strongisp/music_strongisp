<template>
	<view class="discover-wrap">
		<!-- 标题开始 -->
		<view class="title-wrap">
			发现
		</view>
		<!-- 标题结束 -->
		<!-- 标签栏开始 -->
		<view class="tab-bar">
			<view class="tab-item-wrap">
				<view class="tab-item" :class="{active:currentIndex===index}" v-for="(item,index) in types" :key="item.type" @click="tabItemClick(item,index)">
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- 标签栏结束 -->
		<!-- 搜索内容开始 -->
		<view class="songs-wrap" v-if="currentIndex==0">
			<view class="songs-item-wrap" v-for="(item,index) in songs" :key="index" @click="songClick(item)">
				<view class="song-name">
					{{item.name}}
				</view>
				<view class="artist-name">
					{{item.artists[0].name}}
				</view>
			</view>
		</view>
		<view class="playlists-wrap" v-if="currentIndex==1">
			<view class="playlists-item-wrap" v-for="(item,index) in playlists" :key="index" @click="playlistsClick(item)">
				<view class="top-wrap">
					<image :src="item.coverImgUrl" mode=""></image>
					<view class="play-count-wrap">
						<icon type="icon" size="25rpx" class="iconfont icon-xiangyousanjiaoxing"></icon>
						<text>{{item.playCount | filterNumbers}}</text>
					</view>
				</view>
				<view class="bottom-wrap">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="mvs-wrap" v-if="currentIndex==2">
			<view class="mvs-item-wrap" v-for="(item,index) in mvs" :key="index" @click="mvClick(item)">
				<view class="top-wrap">
					<image :src="item.cover" mode=""></image>
					<view class="play-count-wrap">
						<icon type="icon" size="25rpx" class="iconfont icon-xiangyousanjiaoxing"></icon>
						<text>{{item.playCount | filterNumbers}}</text>
					</view>
				</view>
				<view class="bottom-wrap">
					{{item.name}}
				</view>
			</view>
		</view>

		<!-- 搜索内容结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				types: [{
						name: '歌曲',
						type: '1'
					},
					{
						name: '歌单',
						type: '1000'
					},
					{
						name: 'MV',
						type: '1004'
					}
				],
				//当前点击下标
				currentIndex: 0,
				//歌曲数据
				songs: [],
				//歌单数据
				playlists: [],
				//MV数据
				mvs: [],
				//搜索内容
				keywords: ''
			}
		},
		onLoad(option) {
			this.keywords = option.keywords
			this.getData(this.keywords)
		},
		methods: {
			//标签栏点击事件
			tabItemClick(item, index) {
				//修改点击样式效果
				this.currentIndex = index

				this.getData(this.keywords, item.type)
			},
			//获取数据函数
			getData(keywords, type = 1) {
				this.$request({
					url: `/search?keywords=${keywords}&type=${type}&limit=${100}`
				}).then(res => {
					if (res.result.songs) this.songs = res.result.songs
					if (res.result.playlists) this.playlists = res.result.playlists
					if (res.result.mvs) this.mvs = res.result.mvs
				})
			},
			//歌曲点击跳转播放事件
			songClick(item) {
				uni.navigateTo({
					url: '/pages/song-playing/song-playing?songId=' + item.id
				})
			},
			//歌单点击事件
			playlistsClick(item) {
				uni.navigateTo({
					url: '/pages/song-sheet/song-sheet?id=' + item.id
				})
			},
			//mv点击事件
			mvClick(item) {
				uni.navigateTo({
					url: '/pages/mv-play/mv-play?mvid=' + item.id
				})
			}
		},
		filters: {
			filterNumbers(value) {
				if (value < 10000) return value;
				return (value / 10000).toFixed(0) + '万';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.discover-wrap {
		width: 750rpx;
		height: 100%;

		.title-wrap {
			width: 100%;
			text-align: center;
			height: 80rpx;
			line-height: 80rpx;
			color: #333;
			background-color: rgba($color: #eee, $alpha: .5);
		}

		.tab-bar {
			width: 100%;

			.tab-item-wrap {
				padding: 20rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				box-sizing: border-box;

				.tab-item {
					text-align: center;
					padding: 0 20rpx;
					color: #333;

					text {
						font-size: 30rpx;
						display: inline-block;
						padding-bottom: 10rpx;
					}
				}

				.active {
					color: #ff0000;
					border-bottom: 4rpx solid #ff0000;
				}
			}

		}

		.songs-wrap {
			padding: 20rpx;

			.songs-item-wrap {
				border-bottom: 1rpx solid #eee;
				padding-bottom: 20rpx;

				width: 100%;

				.song-name {
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 32rpx;
					color: #555;
				}

				.artist-name {
					font-size: 28rpx;
					color: #aaa;
				}
			}
		}

		.playlists-wrap {
			padding: 20rpx 0;
			width: 100%;

			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;

			.playlists-item-wrap {
				width: 300rpx;
				position: relative;
				top: 0;
				left: 0;
				padding-bottom: 20rpx;

				.top-wrap {
					image {
						width: 300rpx;
						height: 250rpx;
						border-radius: 20rpx;
					}

					.play-count-wrap {
						position: absolute;
						right: 14rpx;
						top: 6rpx;
						color: #eee;
						font-size: 25rpx;

						icon {
							font-size: 25rpx;
							margin-right: 4rpx;
						}
					}
				}

				.bottom-wrap {
					width: 100%;
					font-size: 30rpx;
				}
			}
		}

		.mvs-wrap {
			padding: 20rpx 0;
			width: 100%;

			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;

			.mvs-item-wrap {
				width: 300rpx;
				position: relative;
				top: 0;
				left: 0;
				padding-bottom: 20rpx;

				.top-wrap {
					image {
						width: 300rpx;
						height: 250rpx;
						border-radius: 20rpx;
					}

					.play-count-wrap {
						position: absolute;
						right: 14rpx;
						top: 6rpx;
						color: #eee;
						font-size: 25rpx;

						icon {
							font-size: 25rpx;
							margin-right: 4rpx;
						}
					}
				}

				.bottom-wrap {
					width: 100%;
					font-size: 30rpx;
				}
			}
		}
	}
</style>
