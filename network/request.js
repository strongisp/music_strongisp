//网络请求封装
let ajaxTimes = 0
const BASE_URL = 'https://autumnfish.cn'
export const request = (options) => {
	ajaxTimes++
	uni.showLoading({
		title: '正在加载中...',
		mask: true
	})

	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			url: BASE_URL + options.url,
			method: options.methods || 'GET',
			data: options.data || {},
			success: (res) => {
				if (!res.data) {
					return console.log('获取数据失败')
				}
				resolve(res.data)
			},
			fail: (err) => {
				console.log('请求接口失败')
				reject(err)
			},
			complete: () => {
				ajaxTimes--
				if (ajaxTimes === 0) {
					uni.hideLoading()
				}
			}
		})
	})
}
