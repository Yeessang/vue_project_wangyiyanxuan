<template>
    <div class="home-container">
        <div class="home-navs-wrap" ref="navWrap">
            <div class="home-navs-container">
                <div 
                    class="home-nav-item" 
                    :class="{'home-nav-active':(/^\/home$/).test($route.path)}" 
                    @click="gotoRecommend"
                    ref="recommendNav"
                >
                    <span>推荐</span>
                </div>
                <div 
                    class="home-nav-item" 
                    v-for="(nav,index) in homeNavList" 
                    :key="nav.id" 
                    :class="{'home-nav-active':$route.params.id == nav.id}"
                    @click="gotoCategory(nav.id)"
                    ref="navItemArr"
                >
                    <span>{{nav.name}}</span>
                </div>
            </div>
            <div class="toggle-wrap">
                <div class="toggle-left"></div>
                <div class="toggle-right" @click="isShowAllList = !isShowAllList">
                    <span class="toggle-btn" :class="{toggleRotate:isShowAllList}">↓</span>
                </div>
            </div>
            <div class="toggle-all-category" v-show="isShowAllList">
                <div class="title">全部频道</div>
                <ul class="category-list">
                    <li class="item" :class="{'item-active':(/^\/home$/).test($route.path)}" @click="gotoRecommend">
                        <span>推荐</span>
                    </li>
                    <li 
                        class="item" 
                        v-for="(nav,index) in homeNavList" 
                        :key="nav.id" 
                        :class="{'item-active':$route.params.id == nav.id}"
                        @click="gotoCategory(nav.id)"
                    >
                        <span>{{nav.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="home-recommend" v-if="isRecommend">
            <Swiper class="home-banner" ref="mySwiper" :options="swiperOptions" v-if="bannerList.length !== 0">
                <SwiperSlide class="banner-item" v-for="banner in bannerList" :key="banner.id">
                    <img :src="banner.picUrl" alt="">
                </SwiperSlide>
                <div class="swiper-pagination" slot="pagination"></div>
            </Swiper>
            <ul class="home-policyDescList">
              <li class="policyDescList-item" v-for="(item,index) in policyDescList" :key="index">
                  <img :src="item.icon" alt="">
                  <span class="item-text">{{item.desc}}</span>
              </li>  
            </ul>
            <ul class="home-kingkongList" v-if="kingkongList.length !== 0">
                <li class="kingkong-item" v-for="(item,index) in kingkongList" :key="index">
                    <img :src="item.picUrl" alt="">
                    <p class="kingkong-text" :style="{color:'#' + item.textColor}">{{item.text}}</p>
                </li>
            </ul>
            <div class="bigPromotionModule">
                <div class="bigPromotionModule-top">
                    <img :src="bigPromotionModule.floorList[0].cells[0].picUrl" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    export default {
        name:'wangyi-home',
        data(){
            return {
                homeNavList:[],
                isShowAllList:false,
                isRecommend:true,
                bannerList:[],
                policyDescList:[],
                kingkongList:[],
                bigPromotionModule:{},
                swiperOptions:{
                    loop:true,
                    autoplay: 3000,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'custom',
                        currentClass:'paganation-active',
                        renderCustom: function (swiper, current, total) {
                            let html = ''
                            for(var i = 1; i <= total; i++){
                                if(current === i){
                                    html += `<div class='paganation-item paganation-item-active'></div>`
                                }else{
                                    html += `<div class='paganation-item'></div>`
                                }
                            }
                            return html
                            
                        }
                    },
                },
            }
        },
        methods:{
            async getIndexCategoryList(){
                const result = await this.$http.category.getIndexCategory()
                if(result.code === 200){
                    this.homeNavList = result.data
                }
            },
            async getIndexMessage(){
                const result = await this.$http.home.getIndexMessage()
                console.log(result)
                this.bannerList = result.data.focusList
                this.policyDescList = result.data.policyDescList
                this.kingkongList = result.data.kingKongModule.kingKongList
                this.bigPromotionModule = result.data.bigPromotionModule
            },
            gotoCategory(id){
                this.isShowAllList = false
                if(id == this.$route.params.id) return
                this.$router.push(`/home/indexCategory/${id}`)
                this.isRecommend = false
            },
            gotoRecommend(){
                this.isShowAllList = false
                this.isRecommend = true
                this.$router.push(`/home`)
            },
            initNavScroll(){
                console.log(this.$refs.navWrap)
                this.navScroll = new BScroll(this.$refs.navWrap,{
                    click: true,                 
                    probeType: 3,
                    scrollX:true
                })
                console.log(this.navScroll)
            },
        },
        async mounted(){
            await this.getIndexCategoryList()
            await this.getIndexMessage()
            this.$nextTick(() => {
                this.initNavScroll()
            })
        },
        beforeRouteUpdate(to,from,next) {//此处有this，等效于watch，每次路由参数更新触发
            this.isShowAllList = false
            const {id} = to.params
            let currentNavIndex = 0
            if(id){
                currentNavIndex = this.homeNavList.findIndex((item) => {
                    return item.id == id
                })
                this.navScroll.scrollToElement(this.$refs.navItemArr[currentNavIndex],300,true)
            }else{
                this.navScroll.scrollToElement(this.$refs.recommendNav,300,true)
            }
            
            console.log(this.$refs)
            
            next();
        },
        components:{
            SwiperSlide,
            Swiper
        }
    }
</script>

<style lang="stylus">
    .home-container
        width 100%
        height 100%
        overflow hidden
        margin-top 44px
        .home-navs-wrap
            width 100%
            height 30px
            background-color #fff
            position relative
            box-sizing border-box
            .home-navs-container
                height 100%
                position absolute
                left 60px
                top 0
                white-space nowrap
                text-align center
                line-height 30px
                font-size 14px
                padding 0 80px 0 15px
                .home-nav-item
                    height 100%
                    padding 0 8px
                    display inline-block
                    white-space nowrap
                    margin-right 5px
                    &.home-nav-active
                        position relative
                        color #DD1A21
                        &:after
                            content ''
                            display block
                            position absolute
                            left 0
                            bottom 0
                            width 100%
                            height 3px
                            background-color #DD1A21
                    span 
                        width 100%
                        height 100%
            .toggle-wrap
                width 80px
                height 30px
                position absolute
                right 0
                top 0
                z-index 9
                display flex
                .toggle-left
                    width 30px
                    height 30px
                    background-color #fff
                .toggle-right
                    width 50px
                    height 30px
                    background-color #fff
                    .toggle-btn
                        display inline-block
                        width 100%
                        height 100%
                        line-height 30px
                        text-align center
                        transform translate3d(0,0,0) rotate(0)
                        transition transform 0.3s linear 
                        &.toggleRotate
                            transform translate3d(0,0,0) rotate(180deg)
            .toggle-all-category
                width 100%
                position absolute
                left 0
                top 0
                background-color #fff
                box-sizing border-box
                overflow visible
                z-index 5
                
                .title
                    padding 0 15px
                    width 100%
                    height 30px
                    font-size 14px
                    line-height 30px
                .category-list
                    width 100%
                    display flex
                    flex-wrap wrap
                    text-align center
                    padding-top 10px
                    .item
                        width 75px
                        height 28px
                        line-height 26px
                        box-sizing border-box
                        margin-left 15px
                        margin-bottom 20px
                        font-size 12px
                        background-color #fafafa
                        border 1px solid #ccc
                        border-radius 3px
                        &.item-active
                            color #DD1A21
                            border 1px solid #DD1A21
        .home-recommend
            width 100%
            height calc(100% - 99px)
            .home-banner
                width 100%
                height 148px
                overflow hidden
                img    
                    width 100%
                    height 195px
                    position absolute
                    left 0
                    top 50%
                    transform translateY(-50%)
            .home-policyDescList
                width 100%
                height 36px
                line-height  36px
                padding 0 15px
                box-sizing border-box
                display flex
                justify-content space-between
                align-items center
                background-color #fff
                .policyDescList-item
                    img
                        width 16px
                        height 16px
                        vertical-align middle
                        position relative
                        top -2px
                        margin-right 4px
            .home-kingkongList
                width 100%
                display flex
                flex-wrap wrap
                align-content center
                background-color #fff
                padding 5px 0
                .kingkong-item
                    width 55px
                    height 78px
                    margin 5px 10px 4.5px
                    img 
                        width 100%
                        margin-bottom 5px
                    p   
                        text-align center
            .bigPromotionModule
                .bigPromotionModule-top
                    width 100%
                    height 120px
                    img
                        width 100%
                

</style>