import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../routes'
Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
const routerReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error=> error)
}
const router = new VueRouter({
    routes,
    linkActiveClass:'nav-active'
})

export default router