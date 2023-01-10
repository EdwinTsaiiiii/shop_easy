import Vue from 'vue'
import App from './App'

// 导入 store 的实例对象
import store from './store/store.js'

// 导入http相关的库
import {
  $http
} from '@escook/request-miniprogram'
uni.$http = $http
// 请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest = function(option) {
  uni.showLoading({
    title: '数据加载中'
  })
  if (option.url.indexOf('/my/') !== -1) {
    option.header = {
      Authorization: store.state.m_user.token
    }
  }
}

// 响应拦截器
$http.afterRequest = function(option) {
  uni.hideLoading()
}

// 封装弹框的方法
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
