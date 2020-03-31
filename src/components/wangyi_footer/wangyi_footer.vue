<template>
    <div class="footer-tabs">
        <div class="footer-item" :class="{active:$route.path.includes('/home')}" @click="toPage('/home')">
            <Icon name="wap-home" class="icon"></Icon>
            <span>首页</span>
        </div>
        <div class="footer-item" :class="{active:$route.path.includes('/category')}" @click="toPage('/category')">
            <Icon name="bars" class="icon"></Icon>
            <span>分类</span>
        </div>
        <div class="footer-item" :class="{active:$route.path.includes('/worthBuying')}" @click="toPage('/worthBuying')">
            <Icon name="youzan-shield" class="icon"></Icon>
            <span>值得买</span>
        </div>
        <div class="footer-item" :class="{active:$route.path.includes('/cart')}" @click="toPage('/cart')">
            <Icon name="shopping-cart" class="icon"></Icon>
            <span>购物车</span>
        </div>
        <div class="footer-item" :class="{active:$route.path.includes('/personal')}" @click="toPage('/personal')">
            <Icon name="manager" class="icon"></Icon>
            <span>个人</span>
        </div>
    </div>
</template>

<script>
    import {Icon} from 'vant'
    export default {
        name:"wangyi-footer",
        methods: {
            toPage(path){
                this.$router.replace(path)
            }
        },
        components:{
            Icon
        }
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
            font-size 12px
            display flex
            flex-direction column
            justify-content center
            .icon
                font-size 24px
                margin-bottom 2px
            &.active
                color #f40
</style>