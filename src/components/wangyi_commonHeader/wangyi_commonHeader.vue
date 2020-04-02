<template>
    <header class="wangyi-header" :style="{height:height/37.5 + 'rem'}">
        <slot name="resetHeader">
            <div class="header-left">
                <Icon name="wap-home-o" class="icon" @click="toHome"></Icon>
            </div>
            <div class="header-title">
                <span>{{title}}</span>
            </div>
            <div class="header-right">
                <Icon name="search" class="icon" @click="toSearch"></Icon>
                <Icon name="cart-o" class="icon" @click="toCart"></Icon>
            </div>
        </slot>
    </header>
</template>

<script>
    import {Icon} from 'vant'
    export default {
        name:'wangyi-commonHeader',
        props:{
            title:String,
            height:{
                type:Number,
                default:44
            }
        },
        methods:{
            toHome(){
                this.$router.push('/home')
            },
            toCart(){
                this.$router.push('/cart')
            },
            toSearch(){
                this.$router.push('/search')
            }
        },
        components:{
            Icon
        }
    }
</script>

<style lang="stylus" scoped>
    .wangyi-header
        position fixed
        left 0
        top 0 
        z-index 99
        width 100%
        box-sizing border-box
        background-color #fff
        padding 0 6px
        display flex
        justify-content space-between
        align-items center
        font-size 20px
        .header-title
            position absolute
            left 50%
            top 0
            height 100%
            transform translateX(-50%)
            text-align center
            display flex
            align-items  center
        .icon 
            font-size 30px
            &:last-child
                margin-left 10px
</style>