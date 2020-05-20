<template>
	<view class="ranking-wrap">
		<!-- 导航栏 -->
		<nav-bar />
		<!-- 官方榜 -->
		<official-list :officialListData="officialListData" />
		<!-- 推荐榜 -->
		<recommendation-list :recommendationListData="recommendationListData" />
		<!-- 全球榜 -->
		<global-list :globalListData="globalListData" />
		<!-- 更多榜 -->
		<more-list :moreListData="moreListData" />
		<!-- 到底部提示 -->
		<view class="bottom-tips" v-if="moreListData.length !==0">
			<text>--已经到底了--</text>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/private/ranking-list/nav-bar/nav-bar.vue'
	import OfficialList from '@/components/private/ranking-list/official-list/official-list.vue'
	import RecommendationList from "@/components/private/ranking-list/recommendation-list/recommendation-list.vue"
	import GlobalList from '@/components/private/ranking-list/globallist/globallist.vue'
	import MoreList from '@/components/private/ranking-list/more-list/more-list.vue'

	import {
		requestAll,
		sortS
	} from '@/pages/ranking-list/additionalData.js'
	export default {
		components: {
			NavBar,
			OfficialList,
			RecommendationList,
			GlobalList,
			MoreList
		},
		data() {
			return {
				//官方榜数据
				officialListData: [],
				//推荐榜数据
				recommendationListData: [],
				//全球榜数据
				globalListData: [],
				//更多榜数据
				moreListData: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			//请求页面全部数据
			getList() {
				//1.循环每一条自定义数据参数
				for (let i = 0; i < requestAll.length; i++) {
					//2.发起请求，参数为自定义数据；
					this.$request({
						url: '/top/list?idx=' + requestAll[i].idx
					}).then(res => {
						//3.获取到网络请求，并将自定义数据附加到请求数据中；
						res.updateTime = requestAll[i].updateTime
						res.idx = requestAll[i].idx
						res.Aname = requestAll[i].name
						res.s = requestAll[i].s
						//4.判断附加的条件，进行数组分类
						switch (res.Aname) {
							case '官方榜':
								//判断通过的数据，添加到相应的数组中；
								this.officialListData.push(res)
								//在数组中进行排序；
								this.officialListData.sort(sortS)
								break
							case '推荐榜':
								this.recommendationListData.push(res)
								this.recommendationListData.sort(sortS)
								break
							case '全球榜':
								this.globalListData.push(res)
								this.globalListData.sort(sortS)
								break
							case '更多榜':
								this.moreListData.push(res)
								this.moreListData.sort(sortS)
								break
						}
						// console.log(res.s)
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-tips {
		text-align: center;
		padding-bottom: 10rpx;

		text {
			font-size: 26rpx;
			color: #aaa;
		}
	}
</style>
