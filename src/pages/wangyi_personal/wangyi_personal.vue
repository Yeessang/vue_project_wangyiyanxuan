<template>
    <div class="personal-wrap" ref="wrap">
        <div class="personal-container">
            <div class="personal-header">
                <div class="personal-info">
                    <img src="https://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png" alt="">
                    <div class="info">
                        <span class="name">测试用户测试用户测试用户</span>
                        <span class="level">VIP用户</span>
                    </div>
                </div>
                <div class="right-btn move">
                    <div class="left-icon"></div>
                    <div class="right-text">
                        <span>Pro会员</span>
                        <span>
                            立即试用
                        </span>
                    </div>
                
                </div>
                <div class="gift"></div>
            </div>
            <div class="personal-treasure">
                <div>
                    <span>我的资产</span>
                </div>
            </div>
            <div class="treasure-detail">
                <div class="feedback">
                    <span>￥0</span>
                    <span>回馈金</span>
                </div>
                <div class="redPacket">
                    <span>5</span>
                    <span>红包</span>
                </div>
                <div class="redPacket">
                    <span>6</span>
                    <span>优惠金</span>
                </div>
                <div class="redPacket">
                    <span>￥0</span>
                    <span>津贴</span>
                </div>
                <div class="redPacket">
                    <span>0</span>
                    <span>礼品卡</span>
                </div>
            </div>
            <div class="personal-sort">
                <div class="item">
                    <Icon class="icon" name="coupon-o"></Icon>
                    <span>我的订单</span>
                </div>
                <div class="item">
                    <Icon class="icon" name="tosend"></Icon>
                    <span>充卡白赚36元</span>
                </div>
                <div class="item">
                    <Icon class="icon" name="bag-o"></Icon>
                    <span>周六一起拼</span>
                </div>
                <div class="item">
                    <Icon class="icon" name="phone-o"></Icon>
                    <span>售后服务</span>
                </div>
                <div class="item">
                    <Icon class="icon" name="free-postage"></Icon>
                    <span>邀请返利</span>
                </div>
                <div class="item">
                    <Icon class="icon" name="balance-pay"></Icon>
                    <span>优先购</span>
                </div>
                <div class="item">
                    <Icon class="icon" name="gift-o"></Icon>
                    <span>积分中心</span>
                </div>
                <div class="item">
                    <Icon class="icon" name="gem-o"></Icon>
                    <span>会员俱乐部</span>
                </div>
                <div class="item">
                    <Icon class="icon" name="location-o"></Icon>
                    <span>地址管理</span>
                </div>
                <div class="item">
                    <Icon class="icon" name="setting-o"></Icon>
                    <span>账号安全</span>
                </div>
                <div class="item">
                    <Icon name="service-o" class="icon" ></Icon>
                    <span>帮助与客服</span>
                </div>
                <div class="item">
                    <Icon class="icon" name="contact"></Icon>
                    <span>意见反馈</span>
                </div>
            </div>
            <div class="exit-login" @click="exitLogin">
                <span>退出登录</span>
            </div>
        </div>
    </div>
    
</template>

<script>
    import {Icon,Dialog} from 'vant'
    import BScroll from 'better-scroll'
    import {CHANGELOGIN} from 'store/mutation_types'
    import {mapActions} from 'vuex'
    export default {
        name:'wangyi-personal',
        components:{
            Icon
        },
        methods:{
            ...mapActions([CHANGELOGIN]),
            exitLogin(){
                Dialog.confirm({
                    title: '提示',
                    message: '您确定要退出登录吗'
                }).then(() => {
                    this[CHANGELOGIN](null)
                    this.$router.replace('/login')
                }).catch(() => {
                // on cancel
                });
               
            }
        },
        mounted(){
            this.scroll = new BScroll(this.$refs.wrap,{
                click: true,                 
                probeType: 3,
            })
        },
    }
</script>

<style lang="stylus" scoped>
@import '../../common/animation.css'
.personal-wrap
    width 100%
    height calc(100% - 50px)
    overflow hidden
    .personal-container
        width 100%   
        padding-bottom 10px 
        .personal-header
            width 100%
            height 135px
            background-image url('https://yanxuan.nosdn.127.net/5905098f74e04c39fa5e76ebb9ff591b.png?imageView&type=webp')
            background-size cover
            padding-left 15px
            box-sizing border-box
            position relative
            .personal-info
                width 255px
                height 100%
                padding 32px 0
                box-sizing border-box
                display flex
                img 
                    flex 0 0 71px
                    height 71px
                    border-radius 50%
                .info   
                    width 150px
                    margin-left 15px
                    color #fff
                    display flex
                    flex-direction column
                    justify-content center
                    .name
                        font-size 20px
                        margin-bottom 5px
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                    .level 
                        font-size 14px
            .right-btn
                position absolute
                right 0
                bottom 30px
                width 101.5px
                height 42px
                background-image linear-gradient(180deg,#574E44 0,#0E0E0E 100%)
                border-top-left-radius 21px
                border-bottom-left-radius 21px
                display flex
                align-items center
                padding 0 5px
                box-sizing border-box
                color #EDE7DB
                &.move
                    animation person-move 0.5s alternate infinite
                .left-icon
                    width 28px
                    height 28px
                    border-radius 50%
                    background-image url('https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-s15156d9dc5-bfaf874859.png?imageView&type=webp')
                    background-repeat no-repeat
                    background-position 0px -30px
                    background-size 30px 430px
                    margin-right 5px
                .right-text
                    width 55px
                    display flex
                    flex-direction column
                    position relative
                    span
                        &:nth-child(1)
                            font-size 14px
                            margin-bottom 3px
            .gift
                position absolute
                right 15px
                top 20px
                width 32px
                height 32px
                background-image url('https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-s15156d9dc5-bfaf874859.png?imageView&type=webp')
                background-repeat no-repeat
                background-size 100%
                background-position 0 -95px
        .personal-treasure
            width 100%
            height 52.5px
            background-color #fff
            >div
                width 360px
                height 100%
                line-height 52px
                margin-left 15px
                border-bottom 0.5px solid rgba(200,200,200,.5)
        .treasure-detail
            width 100%
            height 80px
            display flex
            align-items center
            background-color #fff
            margin-bottom 10px
            >div
                flex 1
                height 100%
                display flex
                flex-direction column
                justify-content center
                align-items center
                span
                    &:nth-child(1)
                        font-size 14px
                        font-weight bold
                        margin-bottom 5px
                    &:nth-child(2)
                        font-size 12px
        .personal-sort
            width 100%
            display flex
            flex-wrap wrap
            .item
                width 124.3px
                height 90px
                background-color #fff
                margin-right 1px
                margin-bottom 1px
                display flex
                flex-direction column
                justify-content center
                align-items center
                &:nth-child(2)
                    color #dd1a1a
                &:nth-child(3n)
                    margin-right 0px
                .icon 
                    font-size 25px
                    margin-bottom 10px
                span 
                    font-size 12px
        .exit-login
            width 100%
            height 48px
            background-color #fff
            margin-top 25px
            text-align center
            line-height 48px

            
</style>