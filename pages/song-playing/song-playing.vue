<template>
	<!-- 歌曲播放页面 -->
	<view class="playing-wrap" v-if="songSheetData.length !==0">
		<!-- 标题开始 -->
		<view class="title-wrap">
			<view class="song-name">
				<text v-if="songMessageData">
					{{songMessageData.songs[0].name}}
				</text>
				<text v-if="songMessageData">
					{{songMessageData.songs[0].alia.length ==1 ? '('+songMessageData.songs[0].alia[0]+')' : ''}}
				</text>
			</view>
			<view class="song-author">
				{{moreSinger}}
			</view>
		</view>
		<!-- 标题结束 -->

		<!-- 播放盘开始 -->
		<view class="content-wrap" v-if="switchShow" @click="switchShowClick">
			<view class="needle-wrap" :class="{yesStart:isStart}">
				<image src="../../static/images/playPage/needle.png" mode="widthFix"></image>
			</view>
			<view class="disc-wrap" :class="{spin:isStart}">
				<view class="disc">
					<image src="../../static/images/playPage/disc.png"></image>
					<view class="songImg">
						<image :src="songMessageData.songs[0].al.picUrl"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 播放盘结束 -->

		<!-- 歌词显示开始 -->
		<view class="lyric-wrap" v-else @click.stop="switchShowClick">
			<bing-lyric v-if="Object.keys(lyricData).length !==0" :lyrics="lyric" :curTime="songTime" :areaStyle="{height: '100vh',width:'100%',background:'rgba(0,0,0,0)'}"
			 :lyricStyle="{color:'#222',activeColor:'#eee',fontSize:'30rpx',activeFontSize:'30rpx',selectedBGColor:'#eee'}"
			 :centerStyle="{btnText:'播放'}" @centerBtnClick="startTimeClick" />
		</view>
		<!-- 歌词显示结束 -->

		<!-- 底部工具栏开始 -->
		<view class="bottom-tool-bar">
			<!-- 喜欢、下载、评论 -->
			<view class="top-wrap">
				<view class="like">
					<icon type="icon" size="" class="iconfont icon-heart"></icon>
				</view>
				<view class="download">
					<icon type="icon" size="" class="iconfont icon-xiazai8"></icon>
				</view>
				<view class="comment">
					<icon type="icon" size="" class="iconfont icon-xiaoxi5"></icon>
				</view>
			</view>
			<!-- 总长度、缓存进度条、当前播放进度条、当前播放长度 -->
			<view class="center-wrap">
				<!-- this.$music.duration -->
				<view class="total-length">{{songLength | timeSwitch}}</view>
				<view class="BAR">
					<view class="duration"></view>
					<view class="buffered" :style="'width:'+cacheBAR "></view>
					<view class="current-time" :style="'width:'+currentTimeBAR">
						<image src="../../static/images/playPage/seekbar_thumb.png" mode=""></image>
					</view>
				</view>
				<view class="current-length">{{songCurrentTime | currentLength}}</view>
			</view>
			<!-- 播放模式、上一首、播放/暂停、下一首、最近播放歌曲 -->
			<view class="bottom-wrap">
				<view class="play-mode">
					<icon type="icon" size="" class="iconfont icon-xunhuanbofang2"></icon>
					<!-- <icon type="icon" size="" class="iconfont "></icon> -->
					<!-- <icon type="icon" size="" class="iconfont "></icon> -->
				</view>
				<view class="main-control-wrap">
					<view class="last-song" @click="lastSongClick">
						<image src="../../static/images/playPage/last.png" mode="widthFix"></image>
					</view>
					<view class="pause" @click="pause">
						<image v-if="isStart" src="../../static/images/playPage/pause.png" mode="widthFix"></image>
						<image v-else src="../../static/images/playPage/play.png" mode="widthFix"></image>
					</view>
					<view class="next-song" @click="nextSongClick">
						<image src="../../static/images/playPage/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lately-song">
					<icon type="icon" size="" class="iconfont icon-gedan2"></icon>
				</view>
			</view>
		</view>
		<!-- 底部工具栏结束 -->
	</view>
</template>

<script>
	import bingLyric from '@/components/common/bing-lyric/bing-lyric.vue'
	import {
		_timeSwitch
	} from '@/utils/common.js'
	import {
		_historySong
	} from '@/utils/dataLogic.js'
	export default {
		components: {
			bingLyric
		},
		data() {
			return {
				//歌曲信息
				songMessageData: {},
				//歌曲播放路径
				songUrlData: {},
				//歌词
				lyricData: [],
				//歌单数据
				songSheetData: [],
				//音频总长度
				songLength: '00:00',
				//音频当前播放长度
				songCurrentTime: '00:00',
				//音频缓存进度条长度
				cacheBAR: 0,
				//音频缓存定时器
				cacheBARSetInt: null,
				//音频当前进度条长度
				currentTimeBAR: 0,
				//亲品当前进度条长度定时器
				currentTimeBARSetInt: null,
				//控制转盘是否旋转动画
				isStart: true,
				//当前播放歌曲id
				songId: '',
				//当前播放的歌单id
				songSheetId: '',
				//歌曲当前播放时间
				songTime: 0,
				//歌词详情
				lyric: [],
				//歌词/转盘进行切换
				switchShow: true
			}
		},
		onLoad(option) {
			//调用获取网络请求函数
			this.getSongMessage(option.songId, option.songSheetId)
			//调用歌曲缓存进度条长度函数
			this.getCacheBARSetInt()
			this.getCurrentTimeBAR()
			//音频结束事件
			this.$music.onEnded(() => {
				//关闭特效
				this.isStart = false
				//切换下一首，调用函数
				this.nextSongClick()
			})
		},
		onHide() {
			this.isStart = false
			this.$music.pause()
		},
		onUnload() {
			//清除保存缓存进度条定时器
			clearInterval(this.cacheBARSetInt)
			clearInterval(this.currentTimeBARSetInt)
			//初始化数据
			this.songLength = '00:00'
			this.songCurrentTime = '00:00'
		},
		methods: {
			switchShowClick() {
				this.switchShow = !this.switchShow
			},
			startTimeClick(e) {
				this.$music.seek(e.centerTime)
				this.$music.play()
			},
			//获取音乐数据
			getSongMessage(songId, songSheetId) {
				this.getPlayback(songId, songSheetId)
			},
			//播放/暂停 按钮
			pause() {
				if (this.$music.paused) {
					console.log('直接播放')
					this.isStart = true
					this.$music.play()
				} else {
					this.isStart = false
					this.$music.pause()
				}
				// console.log(this.songMessageData.songs[0])
			},
			//歌曲缓存进度条长度
			getCacheBARSetInt() {
				this.cacheBARSetInt = setInterval(() => {
					this.cacheBAR = Number.parseInt(this.$music.buffered / this.$music.duration * 100) + '%'
				}, 1000)
			},
			//歌曲当前播放进度条长度
			getCurrentTimeBAR() {
				this.currentTimeBARSetInt = setInterval(() => {
					this.currentTimeBAR = Number.parseInt(this.$music.currentTime / this.$music.duration * 100) + '%'
					this.songTime = this.$music.currentTime
				}, 1000)
			},
			//获取歌曲信息进行播放(默认为飙升榜歌单)
			getPlayback(songId, songSheetId = this.songSheetId || 19723756) {
				//清空进度长度
				this.cacheBAR = 0
				this.currentTimeBAR = 0
				//保存当前歌曲id
				this.songId = songId - 0
				//保存当前歌单id
				this.songSheetId = songSheetId
				//前三个请求(歌曲信息、歌曲播放url、歌词)的路径
				let requestParam = [{
						url: '/song/detail?ids=',
						data: 'songMessageData'
					},
					{
						url: '/song/url?id=',
						data: 'songUrlData'
					},
					{
						url: '/lyric?id=',
						data: 'lyricData'
					}
				];
				let _that = this;
				//获取前三个数据
				for (let i = 0; i < requestParam.length; i++) {
					this.$request({
						url: requestParam[i].url + songId
					}).then(res => {
						this.$set(_that, requestParam[i].data, res);
					})
				}
				//获取歌单数据
				this.$request({
					url: '/playlist/detail?id=' + songSheetId
				}).then(res => {
					this.songSheetData = res.playlist.trackIds
				})
				if (songSheetId)
					//配合动画执行缓慢一秒
					setTimeout(() => {
						this.lyric = this.lyricData.lrc.lyric.split('\n')
						//调用原型音频实例，进行相关操作
						this.$music.src = this.songUrlData.data[0].url
						//开始播放
						this.$music.play()
						//启动动画
						this.isStart = true
						_historySong(this.songMessageData.songs[0].name, this.songId, this.songSheetId)
					}, 1000);
				//音频播放进度更新事件
				this.$music.onTimeUpdate(() => {
					this.songLength = this.$music.duration
					//保存当前播放时间
					this.songCurrentTime = this.$music.currentTime === 0 ? '00:00' : this.$music.currentTime
				})
			},
			//上一首按钮点击事件
			lastSongClick() {
				this.$music.stop()
				//在当前歌单中找到当前播放歌曲的id位置
				const lastSongId = this.songSheetData.findIndex((value, index) => value.id === this.songId)
				if (lastSongId === 0) {
					let length = this.songSheetData.length - 1
					this.getPlayback(this.songSheetData[length].id, this.songSheetId)
				} else {
					this.getPlayback(this.songSheetData[lastSongId - 1].id, this.songSheetId)
				}
			},
			//下一首按钮点击事件
			nextSongClick() {
				this.$music.stop()
				//在当前歌单中找到当前播放歌曲的id位置
				const lastSongId = this.songSheetData.findIndex((value, index) => value.id === this.songId)
				const lastSong = this.songSheetData.length - 1
				if (lastSongId === lastSong) {
					this.getPlayback(this.songSheetData[0].id, this.songSheetId)
				} else {
					this.getPlayback(this.songSheetData[lastSongId + 1].id, this.songSheetId)
				}
			}
		},
		computed: {
			//判断几个歌手
			moreSinger() {
				if (!this.songMessageData.songs) return ''
				let value = this.songMessageData.songs[0].ar
				if (value.length !== 0 && value.length === 1) {
					// 一个作者直接返回
					return value[0].name
				} else {
					// 多个作者
					let arr = []
					value.forEach((item, index) => {
						arr.push(item.name)
					})
					return arr.join('/')
				}
			}
		},
		filters: {
			//音频总时长毫秒转换分钟秒
			timeSwitch(value) {
				if (!value) return value

				return _timeSwitch(value)
			},
			//获取当前音频播放时长
			currentLength(value) {
				if (!value) return value
				return _timeSwitch(value)
			}
		}
	}
</script>
<style>
	page,
	uni-page-body {
		background: url(http://qab8ujs1c.bkt.clouddn.com/image/bgiic_blackground.png?e=1589445464&token=jet_nbGhzrSGCa6TsveqoMKvNKWMSJiVRQgboPb7:snKNEK24eObLS1pLRM3dZ7WECss=) no-repeat fixed center;
		background-size: auto;
		width: 100%;
		height: 100%;
		opacity: 0.9;
	}
</style>

<style lang="scss" scoped>
	@keyframes startAnimation {
		from {
			transform: rotate(-40deg);
		}

		to {
			transform: rotate(-10deg);
		}
	}

	@keyframes endAnimation {
		from {
			transform: rotate(-10deg);
		}

		to {
			transform: rotate(-40deg);
		}
	}

	@keyframes loopAnimation {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.playing-wrap {
		padding: 10rpx 20rpx;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		position: relative;

		.title-wrap {
			position: relative;
			z-index: 9;
			background-color: rgba(100, 132, 136, .2);
			width: 100%;
			padding: 5rpx 0;
			border-radius: 20rpx;
			text-align: center;

			.song-name {
				padding: 0 50rpx;
				color: #fff;
				font-size: 32rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.song-author {
				padding: 0 100rpx;
				color: #eee;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.content-wrap {
			height: 650rpx;
			width: 100%;
			position: relative;
			top: 0;
			right: 0;
			overflow: hidden;

			.needle-wrap {
				position: absolute;
				z-index: 8;
				top: 0rpx;
				left: 40%;

				transform-origin: left top;
				transform: rotate(-40deg);
				// animation: startAnimation 1s ease-out 1 forwards;
				// animation: endAnimation 1s ease-out 1 forwards;

				image {
					width: 180rpx;
				}
			}

			.yesStart {
				animation: startAnimation 1s ease-out 1 forwards;
			}

			.onStart {
				animation: endAnimation 1s ease-out 1 forwards;

			}

			.disc-wrap {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 50rpx;

				.disc {
					width: 500rpx;
					height: 500rpx;
					border: 13rpx solid rgba($color: #eee, $alpha: .3);
					border-radius: 50%;
					overflow: hidden;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);

					image {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 102%;
						height: 102%;
						border-radius: 50%;
					}

					.songImg {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						border-radius: 50%;
						width: 340rpx;
						height: 340rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

		.spin {
			animation: loopAnimation 8s infinite linear;
		}

		.lyric-wrap {
			width: 100%;
			height: 1000rpx;
			overflow: hidden;
			box-sizing: border-box;
		}

		.bottom-tool-bar {
			display: block;
			height: 300rpx;
			width: 710.4rpx;
			// box-sizing: border-box;
			position: absolute;
			bottom: 0;
			overflow: hidden;

			.top-wrap {
				display: flex;

				view {
					flex: 1;
					text-align: center;

					icon {
						font-size: 50rpx;
						color: #aaa;
					}
				}

				.like {
					icon {}
				}

				.download {
					icon {}
				}

				.comment {
					icon {}
				}
			}

			.center-wrap {
				display: flex;
				width: 100%;
				padding-top: 20rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;

				.total-length {
					flex: 1;
					font-size: 26rpx;
					color: #333;
				}

				.BAR {
					flex: 5;

					position: relative;
					left: 0;
					top: 0;

					view {
						height: 5rpx;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}

					.duration {
						/* 总长度进度条 */
						width: 100%;
						background-color: rgba($color: #000000, $alpha: .2);
						z-index: 8;
					}

					.buffered {
						/* 缓冲进度条 */
						background-color: rgba($color: #ff0000, $alpha: .3);
						z-index: 9;
					}

					.current-time {
						/* 当前播放进度条 */
						background-color: rgba($color: #eee, $alpha: 0.8);
						z-index: 12;

						image {
							width: 20rpx;
							height: 20rpx;
							position: absolute;
							top: -10rpx;
							right: -6rpx;
							z-index: 12;
						}
					}

				}

				.current-length {
					flex: 1;
					font-size: 26rpx;
					color: #333;
				}
			}

			.bottom-wrap {
				display: flex;
				height: 140rpx;

				.play-mode {
					flex: 1;
					text-align: center;
					margin-top: 30rpx;

					icon {
						font-size: 50rpx;
						color: #eee;
					}
				}

				.main-control-wrap {
					display: flex;
					height: 140rpx;

					.last-song {
						margin-top: 10rpx;

						image {
							width: 120rpx;
						}
					}

					.pause {
						height: 100%;

						image {
							width: 140rpx;
						}
					}

					.next-song {
						margin-top: 10rpx;

						image {
							width: 120rpx;
						}
					}
				}

				.lately-song {
					flex: 1;
					text-align: center;
					margin-top: 30rpx;

					icon {
						font-size: 50rpx;
						color: #eee;
					}
				}
			}
		}
	}
</style>
<!-- v-if="Object.keys(songSheetData).length !==0" -->
