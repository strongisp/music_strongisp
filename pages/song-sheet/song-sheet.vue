<template>
	<view class="song-sheet-wrap" v-if="Object.keys(listCreatorData).length !==0">
		<view class="introduce-wrap">
			<view class="bgc-wrap">
				<image :src="listCreatorData.backgroundUrl"></image>
			</view>
			<view class="content-wrap">
				<view class="img-wrap">
					<image :src="imgUrl"></image>
				</view>
				<view class="title-wrap">
					<view class="top">{{title}}</view>
					<view class="center">
						<image :src="listCreatorData.avatarUrl" mode=""></image>
						<text>{{listCreatorData.nickname}}</text>
					</view>
					<view class="bottom">
						{{listCreatorData.signature || description}}
					</view>
				</view>
			</view>
		</view>
		<view class="content-wrap">
			<view class="option-wrap">
				<view class="item-wrap" v-for="(item,index) in navOption" :key="index" @click="optionClick(index)">
					<text :class="{active:index===currentIndex}">{{item}}{{item==='歌曲'?'':'（'+hotCommentsData.length+'）'}}</text>
				</view>
			</view>
			<!-- 歌曲 -->
			<song v-if="currentIndex === 0" :list-tracks-data="listTracksData" :songSheetId="songSheetId" />
			<!-- 热门评论 -->
			<hot-comment v-else :hotCommentsData="hotCommentsData" />
		</view>
		<!-- 到底了 -->
		<view class="bottom-wrap">
			<text>--已经到底了--</text>
		</view>
	</view>
</template>

<script>
	import Song from '@/components/private/song-sheet/song/song.vue'
	import HotComment from '@/components/private/song-sheet/hot-comment/hot-comment.vue'
	export default {
		components: {
			Song,
			HotComment
		},
		data() {
			return {
				//标题数据
				listCreatorData: {},
				//内容数据
				listTracksData: [],
				//页面名称
				title: '',
				//主题头像
				imgUrl: '',
				//补提详情介绍
				description: '',
				//100个热门歌单评论
				hotCommentsData: [],
				//选项
				navOption: ['歌曲', '评论'],
				//当前选项下标
				currentIndex: 0,
				//歌单id
				songSheetId: -1
			}
		},
		onLoad(option) {
			if(option.idx){
				//调用旁行榜歌单详情数据
				this.getListData(option.idx)
			}else{
				//调用歌单详情数据
				this.getSongSheetData(option.id)
			}
		},
		methods: {
			//请求排行榜歌单详情函数
			getListData(para) {
				this.$request({
					url: '/top/list?idx=' + para
				}).then(res => {
					//调用歌单所需的数据函数
					this.getSongsheetData(res)
					//调用歌单所以的评论函数
					this.getsongSheetComment(res)
				})
			},
			getSongSheetData(id){
				this.$request({
					url:'/playlist/detail?id='+id
				}).then(res=>{
					//调用歌单所需的数据函数
					this.getSongsheetData(res)
					//调用歌单所以的评论函数
					this.getsongSheetComment(res)
				})
			},
			//歌单详情需要的数据
			getSongsheetData(res) {
				//将数据要的数据放入data中
				this.title = res.playlist.name
				this.imgUrl = res.playlist.coverImgUrl
				this.description = res.playlist.description
				this.listCreatorData = res.playlist.creator
				this.listTracksData = res.playlist.tracks
				this.songSheetId = res.playlist.id
				for (let i = 0; i < res.playlist.tracks.length; i++) {
					if (res.playlist.tracks[i].ar.length !== 1) {
						let orName = res.playlist.tracks[i].ar.map(item => item.name).join('/')
						this.listTracksData[i].singerName = orName
					} else {
						this.listTracksData[i].singerName = res.playlist.tracks[i].ar[0].name
					}
				}
			},
			getsongSheetComment(res) {
				//发送获取评论请求
				this.$request({
					url: '/comment/playlist?id=' + res.playlist.id + '&limit=100'
				}).then(res => {
					this.hotCommentsData = res.comments
				})
			},
			//选项点击事件函数
			optionClick(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.song-sheet-wrap {
		overflow: hidden;

		.introduce-wrap {
			position: relative;
			top: 0;
			left: 0;
			width: 100%;
			height: 480rpx;

			.bgc-wrap {
				position: absolute;
				top: -10rpx;
				left: -10rpx;
				width: 105%;
				height: 102%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					filter: blur(10rpx);
					-webkit-filter: blur(10rpx);
				}
			}

			.content-wrap {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				display: flex;
				padding: 0 20rpx;

				.img-wrap {
					width: 300rpx;
					height: 300rpx;
					margin-right: 20rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}

				.title-wrap {
					padding-top: 10rpx;
					width: 400rpx;
					height: 300rpx;
					overflow: hidden;
					color: #fff;
					box-sizing: border-box;

					.top {
						font-size: 38rpx;
						width: 360rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.center {
						margin-top: 10rpx;

						image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							overflow: hidden;
							vertical-align: middle;
							margin-right: 10rpx;
						}

						text {
							font-size: 30rpx;
							display: inline-block;
							width: 200rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					.bottom {
						padding-top: 10rpx;
						font-size: 26rpx;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}
				}
			}
		}

		.content-wrap {
			.option-wrap {
				height: 80rpx;
				display: flex;
				line-height: 80rpx;
				font-size: 30rpx;
				box-sizing: border-box;

				.item-wrap {
					flex: 1;
					text-align: center;

					text {
						padding: 0 20rpx 10rpx 20rpx;
					}

					.active {
						color: #ff0000;
						border-bottom: 4rpx solid #ff0000;
					}
				}
			}
		}

		.bottom-wrap {
			width: 100%;
			padding-top: 10rpx;
			padding-bottom: 10rpx;
			text-align: center;

			text {
				font-size: 26rpx;
				color: #aaa;
			}
		}
	}
</style>
