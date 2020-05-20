<template>
	<view class="find-wrap">

		<!-- 导航栏开始 -->
		<nav-bar />

		<!-- 轮播 -->
		<my-swiper v-bind:swipers-data="swipersData" />

		<!-- 推荐行 -->
		<recommend :recommend-option="recommendOption" />

		<!-- 推荐歌单 -->
		<song-sheet :song-sheet-data="songSheetData" />

		<!-- 新歌/新碟 -->
		<new-music :new-music-data="newMusicData" />

		<!-- 新mv -->
		<new-mv :new-mv-data="newMvData" />

		<!-- 到底了 -->
		<view class="bottom-wrap">
			<text>--已经到底了--</text>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/private/find/navbar/navbar.vue'
	import MySwiper from '@/components/private/find/swiper/swiper.vue'
	import Recommend from '@/components/private/find/recommend/recommend.vue'
	import SongSheet from '@/components/private/find/songsheet/songSheet.vue'
	import NewMusic from '@/components/private/find/newmusic/newmusic.vue'
	import NewMv from '@/components/private/find/newmv/newmv.vue'
	export default {
		data() {
			return {
				//轮播数据
				swipersData: [],
				//推荐行选项
				recommendOption: [{
					title: '每日推荐',
					iconClass: 'icon-wangyiyunyinle'
				}, {
					title: '歌单',
					iconClass: 'icon-gedan1'
				}, {
					title: '排行榜',
					iconClass: 'icon-paihangbang---'
				}, {
					title: '电台',
					iconClass: 'icon-diantai'
				}, {
					title: '私人FM',
					iconClass: 'icon-shouyinji'
				}],
				//推荐歌单数据
				songSheetData: [],
				//新歌/新碟数据
				newMusicData: [],
				//最新mv数据
				newMvData: []
			}
		},
		components: {
			NavBar,
			MySwiper,
			Recommend,
			SongSheet,
			NewMusic,
			NewMv
		},
		onLoad() {
			//调用获取轮播数据
			this.getSwipers()
			this.getSongSheet()
			this.getNewMusic()
			this.getNewMv()
		},
		methods: {
			//请求轮播图函数
			async getSwipers() {
				const res = await this.$request({
					url: '/banner?type=1'
				})
				this.swipersData = res.banners
				// console.log(this.swipersData)
			},
			//请求推荐歌单函数
			async getSongSheet() {
				const res = await this.$request({
					url: '/personalized?limit=12'
				})
				this.songSheetData = res.result
				// console.log(this.songSheetData)
			},
			//请求新歌/新碟函数
			async getNewMusic() {
				const res = await this.$request({
					url: '/personalized/newsong'
				})
				this.newMusicData = res.result
				res.result.length !== 9 ? this.newMusicData.length = 9 : this.newMusicData
				// console.log(this.newMusicData)
			},
			//请求最新MV函数
			async getNewMv() {
				const res = await this.$request({
					url: '/mv/first?limit=12'
				})
				this.newMvData = res.data
				// console.log(this.newMvData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-wrap {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 10rpx;
		text-align: center;

		text {
			font-size: 26rpx;
			color: #aaa;
		}
	}
</style>
