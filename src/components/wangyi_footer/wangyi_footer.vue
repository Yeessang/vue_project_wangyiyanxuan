<template>
    <div class="footer-tabs">
        <div class="footer-item" :class="{active:$route.path.includes('/home')}" @click="toPage('/home')">首页</div>
        <div class="footer-item" :class="{active:$route.path.includes('/category')}" @click="toPage('/category')">分类</div>
        <div class="footer-item" :class="{active:$route.path.includes('/worthBuying')}" @click="toPage('/worthBuying')">值得买</div>
        <div class="footer-item" :class="{active:$route.path.includes('/cart')}" @click="toPage('/cart')">购物车</div>
        <div class="footer-item" :class="{active:$route.path.includes('/personal')}" @click="toPage('/personal')">个人中心</div>
    </div>
</template>

<script>
    export default {
        name:"wangyi-footer",
        methods: {
            toPage(path){
                this.$router.replace(path)
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .footer-tabs
        width 100%
        height 50px
        display flex
        justify-content space-between
        border-top 1px solid rgba(100,100,100,.1)
        position fixed
        left 0
        bottom 0
        background-color #fff
        .footer-item
            width 20%
            height 100%
            text-align center
            line-height 50px
            font-size 14px
            &.active
                color #f40
</style>