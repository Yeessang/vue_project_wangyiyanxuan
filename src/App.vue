<template>
    <div class="app">
      <keep-alive exclude="wangyi-shop-detail">
        <router-view></router-view>
      </keep-alive>
      <app-footer></app-footer>
    </div>
    
</template>

<script>
import Footer from 'components/wangyi_footer/wangyi_footer'
export default {
  name: 'App',
  components:{
    'app-footer':Footer
  }
}
</script>

<style lang="stylus" scope>
  .app
    width 100%
    height 100%
    background-color #eee
    overflow hidden
</style>
