import Vue from 'vue'
import App from './App'

// 全局引入网络请求封装
import {
	request
} from './network/request.js'
Vue.prototype.$request = request
Vue.prototype.$music = uni.createInnerAudioContext();

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
