// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


Vue.config.productionTip = false

//关闭console.log()  方法
// window['console']['log'] = function() {}; //关闭默认设置
import apiConfig from '../config/api.config'

import axios from "axios"
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = apiConfig.baseUrl
Vue.prototype.$api = axios
window.axios = axios

import qs from 'qs'


// 配置url地址
// axios.defaults.baseURL = process.env.API_ROOT
// window.HOST= process.env.API_ROOT  
// Vue.config.productionTip = false
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
