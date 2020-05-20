<template>
	<view class="mv-wrap">
		<!-- 导航开始 -->
		<view class="tabbar">
			<text>MV/视频</text>
		</view>
		<!-- 导航结束 -->
		<!-- 标题选项开始 -->
		<view class="title-wrap">
			<scroll-view class="items-wrap" scroll-x v-for="(fatherTitles,fatherIndex) in titleList" :key="fatherIndex">
				<view class="item" v-for="(items,index) in fatherTitles" :key="index" @click="titleClick(items,index,fatherTitles,fatherIndex)"
				 :class="{themeColor:currentIndex[fatherIndex] === index}">
					{{items}}
				</view>
			</scroll-view>
		</view>
		<scroll-view class="mv-list-wrap" @scrolltolower="scrolltolower" scroll-y :scroll-top="init" @scroll="scroll">
			<view class="item-wrap">
				<mv-list v-for="(item,index) in viewData" :key="index" :mvData="item" />

				<view class="bottom-text-wrap" v-if="viewData.length !=0">
					<view class="bottom-text" v-if="total">
						--下拉加载更多--
					</view>
					<view class="bottom-text" v-else>
						--已经没有了哦--
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import mvList from '@/components/common/mvlist/mvlist.vue'
	export default {
		components: {
			mvList
		},
		data() {
			return {
				titleList: [
					['全部', '内地', '港台', '韩国', '日本', '欧美'],
					['全部', '官方版', '原生', '现场版', '网易出品'],
					['上升最快', '最热', '最新']
				],
				currentIndex: [0, 0, 0],
				//一个请求的限制数量
				limit: 10,
				//请求的页数
				page: 1,
				//页面渲染得数据
				viewData: [],
				//阻止请求
				total: true,
				//当前元素滚动得位置
				currentScrollTop: 0,
				//初始位置
				init: 0,
				//历史数据
				historyData: []
			}
		},
		onLoad() {
			this.page++
			this.getData()
		},
		methods: {
			// 到底部触发得事件
			scrolltolower() {
				this.page++
				this.getData()
			},
			// 当前滚动位置
			scroll(event) {
				this.currentScrollTop = event.detail.scrollTop
			},
			//点击切换数据类型
			titleClick(item, index, fatherTitles, fatherIndex) {
				this.getHistoryData()
				this.$set(this.currentIndex, fatherIndex, index)

				let currentindex = this.historyData.findIndex((value, index) => value.only === this.currentIndex.toString())
				if (currentindex === -1) {
					//清空页数据
					this.$set(this, 'init', Math.random())
					this.page = 1
					this.page++
					this.viewData = []
					this.getData()
				} else {
					this.$set(this, "viewData", this.historyData[currentindex].data)
					this.$set(this, "page", this.historyData[currentindex].page)
					setTimeout(() => {
						this.$set(this, "init", this.historyData[currentindex].position)
					}, 100)
				}
			},
			//获取数据函数
			getData() {
				if (this.total === false) return ''
				//请求对应的数据
				this.$request({
					url: `/mv/all?limit=${this.limit}&area=${this.titleList[0][this.currentIndex[0]]}&type=${this.titleList[1][this.currentIndex[1]]}&order=${this.titleList[2][this.currentIndex[2]]}&offset=${(this.page - 1) *this.limit}`
				}).then(res => {
					//保存页面渲染当前请求数据
					if (res.code == 500 || res.hasMore !== true) {
						this.total = false
					}
					this.viewData.push(...res.data)
				})
			},
			getHistoryData() {
				//获取唯一标识
				let only = this.currentIndex.toString()
				//获取当前滚动位置
				let position = this.currentScrollTop
				//存储当前页面
				let page = this.page
				//获取当前请求得数据
				let data = this.viewData
				let hisOnly = this.historyData.findIndex((value, index) => value.only === only)
				if (hisOnly == -1) {
					this.historyData.push({
						only,
						position,
						data,
						page
					})
				} else {
					this.historyData[hisOnly] = {
						only,
						position,
						data,
						page
					}
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.mv-wrap {
		height: 100%;
		box-sizing: border-box;

		.tabbar {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
		}

		.title-wrap {
			padding: 0 20rpx 20rpx;

			.items-wrap {
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				overflow: hidden;
				white-space: nowrap;

				&:last-child {
					border-bottom: 1rpx solid #eee;
				}

				.item {
					display: inline-block;
					margin-right: 100rpx;
					font-size: 30rpx;

					&:last-child {
						margin-right: 0;
					}
				}

				.themeColor {
					color: #ff0000;
				}
			}
		}

		.mv-list-wrap {
			// padding-top: 280rpx;
			height: calc(100% - 280rpx);
			width: 100%;
			padding: 0 10rpx;
			box-sizing: border-box;

			.item-wrap {
				width: 100%;
				height: 350rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}
		}

		.bottom-text {
			font-size: 30rpx;
			color: #ccc;
		}
	}
</style>
