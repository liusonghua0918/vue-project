// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//引入vant样式
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import router from './router'
import store from './store/index.js'

import axios from 'axios'
Vue.prototype.$http = axios
// Vue.prototype.$http=Vue

//echarts
import echarts from 'echarts'
Vue.prototype.$echarts=echarts

//element-ui
// import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';
Vue.use(ElementUI);

Vue.config.productionTip = false

//全局守卫
var arr = ['/index/cart', '/index/my'] //守卫arr中定义的路由页面
router.beforeEach((to, from, next) => {
  console.log(to);
  // 如果将要去的路由是arr里面的任意一个
  if (arr.indexOf(to.path) != -1) {
    if (localStorage.getItem('id')) { // 本地存储中有id这个键值对
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  ElementUI,
  components: {
    App
  },
  template: '<App/>'
})
