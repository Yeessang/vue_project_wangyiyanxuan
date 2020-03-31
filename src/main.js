import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import http from '@/http'
import store from '@/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'
import './plugins/rem.js'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
