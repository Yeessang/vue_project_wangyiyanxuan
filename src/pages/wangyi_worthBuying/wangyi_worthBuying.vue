<template>
    <div class="worthBuying-wrap">
        <CommonHeader :title="'值得买'" :height="50"></CommonHeader>
        <div class="worthBuying-container" ref="wrapper">
            <div class="scroll-bar">
                <div class="worth-navs">
                    <div class="worth-bg">
                        <div class="bg-title">
                            <img src="../../static/images/worthBuying.png" />
                            <span>严选购物 用心生活</span>
                        </div>
                    </div>
                    <div class="worth-swiper-wrap">
                        <swiper ref="mySwiper" :options="swiperOptions" class="worth-swiper">
                            <swiper-slide class="swiper-item" v-for="(nav,index)  in navList" :key="index">
                                <img :src="nav.picUrl" alt="">
                                <p class="mainTitle">{{nav.mainTitle}}</p>
                                <p class="viceTitle">{{nav.viceTitle}}</p>
                            </swiper-slide>
                        </swiper>
                        
                        <div class="my-paganation">
                            <p class="my-paganation-item" :class="{active:swiper.activeIndex === 0}"></p>
                            <p class="my-paganation-item" :class="{active:swiper.activeIndex === 1}"></p>
                            <p class="my-paganation-item" :class="{active:swiper.activeIndex === 2}"></p>
                            <p class="my-paganation-item" :class="{active:swiper.activeIndex === 3}"></p>
                            <p class="my-paganation-item" :class="{active:swiper.activeIndex === 4}"></p>
                        </div>
                    </div>
                </div>
                <div class="worth-list">
                    <div class="column-group" v-for="(worthGroup,worthGroupIndex) in showWorthList" :key="worthGroupIndex">
                        <div class="worth-item" v-for="(worth,worthIndex) in worthGroup" :key="worthIndex">
                            <img :src="worth.data.picUrl" alt="">
                            <div class="haveAuthor" v-if="worth.data.nickname">
                                <p class="item-content">{{worth.data.title}}</p>
                                <div class="item-author">
                                    <div class="author-left">
                                        <img :src="worth.data.avatar" alt="">
                                        <span>{{worth.data.nickname}}</span>
                                    </div>
                                    <div class="author-right">
                                        <Icon name="eye-o" class="icon"></Icon>
                                        <span>{{worth.data.readCount > 10000 ? Math.round(worth.data.readCount / 1000) + 'k' : worth.data.readCount}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="notAuthor" v-else-if="(!worth.data.nickname && worth.data.title)" :style="{backgroundColor:'#'+worth.data.topicId}">
                                <div class="title">{{worth.data.title}}</div>
                                <div class="line"></div>
                                <div class="subTitle">{{worth.data.subTitle}}</div>
                            </div>
                            <div class="buyNow" v-if="worth.data.buyNow !== null && worth.data.buyNow !== undefined">
                                <div class="buyNow-left">{{worth.data.buyNow.itemName}}</div>
                                <div class="buyNow-right">去购买></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import BScroll from 'better-scroll'
    import {Icon} from 'vant'
    import CommonHeader from 'components/wangyi_commonHeader/wangyi_commonHeader'
    import 'swiper/css/swiper.css'
    export default {
        name:'wangyi-worthBuying',
        data(){
            return {
                swiper:{},
                swiperOptions:{
                    slidesPerView : 4, 
                    slidesPerColumn: 2,
                    slidesPerColumnFill : 'row',
                    coverflow: { //动画
                        rotate: 0,
                        stretch: 10,
                        depth: 60,
                        modifier: 2,
                        slideShadows: false,
                    },
                },
                navList:[],
                worthList:[],
                page:1,
                size:5
            }
        },
        computed:{
            // 这里是整合全部数据到展示的瀑布流数据列表，但是每一次新加都要重新去加工这个最终的数组
            // 所以，优化后，只对新获取的页数的数据去加工，简化遍历数量
            // 未 做好 完整的优化
            showWorthList(){
                let newList = []
                this.worthList.forEach((worthItem) => {
                    for(let [key,value] of Object.entries(worthItem)){
                        if(key === 'look' && typeof value === 'object' && value !== null){
                            newList.push({isLook:true,data:value})
                        }else if(key === 'topics' && value.length !== 0){
                            value.forEach((topic) => {
                                newList.push({isLook:false,data:topic})
                            })
                        }else if(key === 'ad' && value !== null){
                            newList.push({isLook:false,data:value})
                        }
                    }
                })
                return this.splitGroup(newList,2)
            }
        },
        methods:{
            async getNavList(){
                const result = await this.$http.worthBuying.getWorthNavList()
                if(result.code === "200"){
                    this.navList = result.data.navList
                }
            },
            async getInitWorthList(){
                const result = await this.$http.worthBuying.getInitWorthList()
                this.worthList = result.data
            },
            async getWorthList(data){
                const result = await this.$http.worthBuying.getWorthList(data)
                if(result.code === "200"){
                    this.worthList.push(...result.data.result)
                }
            },
            initScroll(){
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click: true,                 
                    probeType: 3,
                    pullUpLoad: {
                        threshold: -50, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
                        stop: 20
                    },
                })
                this.scroll.on('pullingUp',async (params) => {
                    const {page,size} = this
                    this.page = page+1
                    await this.getWorthList({page:this.page,size})
                    this.$nextTick(() => {
                        this.scroll.refresh() 
                        this.scroll.finishPullUp()   
                    })
                })
                console.log(this.scroll)
            },
            // 本想在这里做优化 但是做了优化 可能每次单数列都比偶数列 多一个 这样会导致 单数列比偶数列多一些干扰视觉效果
            // 所以还是采取之前的做法
            // processNewPageDataToArray(newPageData){
            //     let newList = []
            //     newPageData.forEach((worthItem) => {
            //         for(let [key,value] of Object.entries(worthItem)){
            //             if(key === 'look' && typeof value === 'object' && value !== null){
            //                 newList.push({isLook:true,data:value})
            //             }else if(key === 'topics' && value.length !== 0){
            //                 value.forEach((topic) => {
            //                     newList.push({isLook:false,data:topic})
            //                 })
            //             }else if(key === 'ad' && value !== null){
            //                 newList.push({isLook:false,data:value})
            //             }
            //         }
            //     })
            //     return newList
            // },
            splitGroup(array, subGroupLength) {
                let index = 0;
                let newArray = new Array(subGroupLength)
                for(let i = 0; i < subGroupLength; i++){
                    newArray[i] = []
                }
                while(index < array.length) {
                    newArray[index % subGroupLength].push(array[index])
                    index++
                }
                return newArray;
            }
        },
        async mounted(){
            await this.getNavList()
            await this.getInitWorthList()
            await this.getWorthList({page:this.page,size:this.size})
            this.$nextTick(()=>{
                this.swiper = this.$refs.mySwiper.$swiper
                this.initScroll()
            })
        },
        components: {
            Swiper,
            SwiperSlide,
            Icon,
            CommonHeader
        },
    }
</script>

<style lang="stylus">
.worthBuying-wrap
    width 100%
    height 100%
    .worthBuying-container
        width 100%
        height calc(100% - 100px)
        margin-top 50px
        font-size 16px
        .worth-navs
            width 100%
            height 270px
            padding-top 72.5px
            position relative
            .worth-bg
                width 100%
                height 262px
                background-image url('../../static/images/worthNavBg.png')
                background-repeat no-repeat
                background-size 100%
                position absolute
                top 0
                .bg-title
                    padding-top 25px
                    text-indent 10px
                    img 
                        position relative
                        top 7px
                        width 65px
                        height 35px
                        vertical-align bottom
                        margin-right 5px
                    span 
                        vertical-align bottom
                        color #fff
            .worth-swiper-wrap
                width 100%
                box-sizing border-box
                height 270px
                .worth-swiper
                    width calc(100% - 20px)
                    height 100%
                    background-color #fff
                    border-radius 10px
                    .swiper-item
                        height 100.5px
                        text-align center
                        display flex
                        flex-direction column
                        align-items center
                        margin-top -20px
                        img 
                            width 60px
                            height 60px
                            border-radius 50%
                        .mainTitle
                            line-height 14px
                            font-size 14px
                            font-weight bold
                            margin 5px 0
                        .viceTitle
                            font-size 12px
                            color #666
            .my-paganation
                position absolute
                left 50%
                transform translateX(-50%)
                bottom 15px
                font-size 0
                z-index 5
                .my-paganation-item
                    display inline-block
                    width 20px
                    height 2px
                    background-color #ccc
                    &.active
                        background-color red
        .worth-list
            padding 20px 10px 0
            display flex
            flex-wrap wrap
            justify-content space-between
            .column-group
                display flex 
                flex-direction column
                width 172.5px
                .worth-item
                    box-sizing border-box
                    margin-bottom 10px
                    background-color #fff
                    border-radius 10px
                    overflow hidden
                    // -webkit-column-break-inside avoid
                    &>img 
                        width 100%
                        display block
                    .haveAuthor
                        .item-content
                            padding 10px 10px 0
                            font-size 12px
                            line-height 16px
                            overflow hidden
                            text-overflow ellipsis
                            display -webkit-box
                            -webkit-line-clamp 2
                            -webkit-box-orient vertical
                        .item-author
                            display flex
                            justify-content space-between
                            align-items center
                            padding 15px 10px
                            font-size 10px
                            color #666
                            .author-left
                                display flex
                                align-items center
                                overflow hidden
                                white-space nowrap
                                text-overflow ellipsis
                                &>img 
                                    width 24px
                                    height 24px
                                    border-radius 50%
                                    margin-right 5px
                                span 
                                    overflow hidden
                                    white-space nowrap
                                    text-overflow ellipsis
                            .author-right
                                display flex
                                .icon
                                    position relative
                                    top 1px
                                    margin-right 3px
                    .notAuthor
                        padding 14px 9px 18px
                        .title
                            overflow hidden
                            white-space nowrap
                            text-overflow ellipsis
                            font-size 16px
                            font-weight bold
                            text-align center
                        .line
                            width 30px
                            height 2px
                            margin 15px auto
                            background-color #000
                        .subTitle
                            font-size 12px
                            text-align center
                            line-height 16px
                    .buyNow
                        padding 15px 0 10px
                        margin 0 10px
                        border-top 1px solid rgba(100,100,100,.3)
                        font-size 12px
                        display flex 
                        justify-content space-between
                        align-items center
                        .buyNow-left
                            width 103.5px
                            white-space nowrap
                            overflow hidden
                            text-overflow ellipsis
                        .buyNow-right
                            color #DD1A21

</style>