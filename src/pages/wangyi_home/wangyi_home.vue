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
                <div class="toggle-right" @click="toggleShowAllList">
                    <Icon name="arrow-down" class="toggle-btn" :class="{toggleRotate:isShowAllList}"></Icon>
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
        <div class="home-recommend" v-if="isRecommend" ref="recommendWrap">
            <div class="home-recommend-container">
                <Swiper class="home-banner" ref="mySwiper" :options="swiperOptions" v-if="bannerList.length !== 0">
                    <SwiperSlide class="banner-item" v-for="banner in bannerList" :key="banner.id">
                        <a :href="banner.targetUrl">
                            <img :src="banner.picUrl" alt="">
                        </a>
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
                        <a :href="item.schemeUrl">
                            <img :src="item.picUrl" alt="">
                            <p class="kingkong-text" :style="{color:'#' + item.textColor}">{{item.text}}</p>
                        </a>
                    </li>
                </ul>
                <div class="bigPromotionModule" v-if="bigPromotionModule.floorList">
                    <div class="bigPromotionModule-top">
                        <img :src="bigPromotionModule.floorList[0].cells[0].picUrl" class="bigModule-back">
                        <img class="bigModule-up" :src="currentModulePic">
                    </div>
                    <div class="bigPromotionModule-middle">
                        <img class="middle-gif" :src="bigPromotionModule.floorList[1].cells[0].picUrl">
                    </div>
                    <div class="bigPromotionModule-bottom">
                        <div class="bottom-item" v-for="(item,secondIndex) in bigPromotionModule.floorList[2].cells" :key="secondIndex + 'second'">
                            <img :src="item.picUrl" alt="">
                        </div>
                        <div class="bottom-item" v-for="(item,index) in bigPromotionModule.floorList[3].cells" :key="index">
                            <img :src="item.picUrl" alt="">
                        </div>
                    </div>
                </div>
                <div class="home-activity" v-if="indexActivityModule">
                    <header class="title">- 新人专享礼 -</header>
                    <div class="activity-show">
                        <div class="activity-img-big">
                            <p>新人专享礼包</p>
                            <img src="https://yanxuan.nosdn.127.net/352b0ea9b2d058094956efde167ef852.png" alt="">
                        </div>
                        <div class="activity-img">
                            <div 
                                class="activity-img-small" 
                                v-for="(item,index) in indexActivityModule"
                                :key="index"
                            >
                                <div class="text">
                                    <p class="activity-title">{{item.title}}</p>
                                    <p class="subTitle" v-if="item.subTitle">{{item.subTitle}}</p>
                                    <p class="tag" v-if="item.tag">{{item.tag}}</p>
                                </div>
                                <img :src="item.picUrl" alt="">
                                <div class="price-circle" v-if="item.activityPrice">
                                    <span>{{item.activityPrice}}</span>
                                    <del>{{item.originPrice}}</del>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="home-categoryHotSellModule">
                    <header class="title">{{categoryHotSellModule.title}}</header>
                    <ul class="categoryList">
                        <li 
                            class="category-item" 
                            v-for="(item,index) in categoryHotSellModule.categoryList"
                            :key="index" 
                            :class="{'big-item':(index == 0 || index == 1)}"
                        > 
                            <a :href="item.targetUrl" v-if="(index == 0 || index == 1)">
                                <div class="left">
                                    <p>{{item.categoryName}}</p>
                                </div>
                                <div class="right">
                                    <img :src="item.picUrl" alt="">
                                </div>
                            </a>
                            <a :href="item.targetUrl" v-else>
                                <div class="top">
                                    <p>{{item.categoryName}}</p>
                                </div>
                                <div class="bottom">
                                    <img :src="item.picUrl" alt="">
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <HomeModule :title="`限时购`" :module="flashSaleModule" v-if="flashSaleModule"></HomeModule>
                <HomeModule :title="`新品首发`" :module="showNewItemList" v-if="showNewItemList"></HomeModule>
                <div class="home-sceneLightShoppingGuideModule" v-if="sceneLightShoppingGuideModule.length !== 0">
                    <div class="item" v-for="(item,index) in sceneLightShoppingGuideModule" :key="index">
                        <a :href="item.styleItem.targetUrl">
                            <div class="shopName">{{item.styleItem.title}}</div>
                            <div class="shopDesc">{{item.styleItem.desc}}</div> 
                            <div class="shopImg">
                                <img
                                    v-for="(pic,picIndex) in item.styleItem.picUrlList" 
                                    :key="picIndex"
                                    :src="pic" 
                                >
                            </div>
                        </a>
                    </div>
                </div>
                <div class="home-footer">
                    <div class="origin">
                        <p class="top">Vue实战项目</p>
                        <p class="bottom">© Yeessang</p>
                        
                    </div>
                </div>
            </div>
            
        </div>
        <transition name="toTop">
            <div class="gotoTop" v-show="isShowToTop" @click="gotoTop">
                <Icon name="arrow-up"></Icon>
            </div>
        </transition>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import moment from 'moment'
    import HomeModule from 'components/wangyi_home_saleModule/wangyi_home_saleModule'
    import { Icon } from 'vant'
    import 'swiper/css/swiper.css'
    import '../../common/transition.stylus'
    export default {
        name:'wangyi-home',
        data(){
            return {
                homeNavList:[],
                isShowAllList:false,
                isRecommend:true,
                isShowToTop:false,
                bannerList:[],
                policyDescList:[],
                kingkongList:[],
                bigPromotionModule:{},
                currentModulePic:'',
                categoryHotSellModule:{},
                flashSaleModule:{},
                newItemList:null,
                sceneLightShoppingGuideModule:{},
                indexActivityModule:null,
                swiperOptions:{
                    loop:true,
                    autoplay: 1000,
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
        computed:{
            hour(){
                return moment(this.flashSaleModule.remainTime).format("HH")
            },
            minute(){
                return moment(this.flashSaleModule.remainTime).format("MM")
            },
            second(){
                return moment(this.flashSaleModule.remainTime).format("SS")
            },
            showNewItemList(){
                return this.newItemList ? this.newItemList.slice(0,6) : null
            }
        },
        methods:{
            toggleShowAllList(){
                if(this.showAllListTimer) return 
                const {isShowAllList} = this
                this.showAllListTimer = setTimeout(() => {
                    this.isShowAllList = !isShowAllList
                    this.showAllListTimer = null
                },300)
            },
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
                this.currentModulePic = result.data.bigPromotionModule.floorList[0].cells[0].itemList[0].picUrl
                this.categoryHotSellModule = result.data.categoryHotSellModule
                this.flashSaleModule = result.data.flashSaleModule
                this.newItemList = result.data.newItemList
                this.sceneLightShoppingGuideModule = result.data.sceneLightShoppingGuideModule
                this.indexActivityModule = result.data.indexActivityModule
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
                this.navScroll = new BScroll(this.$refs.navWrap,{
                    click: true,                 
                    probeType: 3,
                    scrollX:true
                })
            },
            initRecommendScroll(){
                this.recommendScroll = new BScroll(this.$refs.recommendWrap,{
                    click: true,                 
                    probeType: 3,
                })
                this.recommendScroll.on('scroll',(object) => {
                    if(this.recommendScrollTimerId) return
                    this.recommendScrollTimerId = setTimeout(() => {
                        if(Math.abs(object.y) < 600 && this.isShowToTop) this.isShowToTop = false
                        if(Math.abs(object.y) >= 600 && !this.isShowToTop) this.isShowToTop = true
                        this.recommendScrollTimerId = null
                    },200)
                })
                this.$nextTick(() => {
                    this.recommendScroll.refresh()
                })
            },
            changeBigModuleUpShowPic(){
                clearInterval(this.changePicTimerId)
                let index = 0
                this.changePicTimerId = setInterval(() => {
                    index++
                    if(index > this.bigPromotionModule.floorList[0].cells[0].itemList.length - 1){
                        index = 0
                    }
                    this.currentModulePic = this.bigPromotionModule.floorList[0].cells[0].itemList[index].picUrl
                },2000)
            },
            gotoTop(){
                this.recommendScroll.scrollTo(0,0,300)
            }
        },
        async mounted(){
            await this.getIndexCategoryList()
            await this.getIndexMessage()
            this.initNavScroll()
            this.initRecommendScroll()
            this.$nextTick(() => {
                this.navScroll.refresh()
                this.recommendScroll.refresh()
                this.changeBigModuleUpShowPic()
            })
        },
        beforeRouteUpdate(to,from,next) {//此处有this，等效于watch，每次路由参数更新触发
            this.isShowAllList = false
            const {id} = to.params
            console.log(id)
            let currentNavIndex = 0
            if(id){
                currentNavIndex = this.homeNavList.findIndex((item) => {
                    return item.id == id
                })
                this.navScroll.scrollToElement(this.$refs.navItemArr[currentNavIndex],300,true)
            }else{
                this.navScroll.scrollToElement(this.$refs.recommendNav,1000,true)
            }
            this.$nextTick(() => {
                this.recommendScroll.refresh()
            })
            this.recommendScroll.refresh()
            next();
        },
        watch:{
            isRecommend(value){
                    console.log(this)
                    // this.initNavScroll()
                    // this.initRecommendScroll()
                    if(value){
                        this.$nextTick(() => {
                            this.initNavScroll()
                            this.initRecommendScroll()
                            this.changeBigModuleUpShowPic()
                        })
                    } 
            }
        },
        components:{
            SwiperSlide,
            Swiper,
            HomeModule,
            Icon
        }
    }
</script>

<style lang="stylus">
    .home-container
        width 100%
        height 100%
        overflow hidden
        margin-top 44px
        .gotoTop
            position fixed
            width 40px
            height 40px
            background-color #ebebeb
            color #666
            border-radius 50%
            right 10px 
            bottom 60px
            font-size 25px
            text-align center
            line-height 45px
        .home-navs-wrap
            width 100%
            height 30px
            background-color #fff
            position relative
            z-index 5
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
                    font-size 16px
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
            height calc(100% - 124px)
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
                background-color #1674e3
                .bigPromotionModule-top
                    width 100%
                    height 120px
                    position relative
                    .bigModule-back
                        width 100%
                    .bigModule-up
                        position absolute
                        left 38px
                        top 17px
                        width 84px
                        height 84px
                .bigPromotionModule-middle
                    width 100%
                    box-sizing border-box
                    padding 10px 10px 4px
                    .middle-gif
                        width 100%
                .bigPromotionModule-bottom
                    display flex
                    flex-wrap wrap
                    padding 10px 10px 4px
                    justify-content space-around
                    box-sizing border-box
                    .bottom-item
                        width 170px
                        margin-bottom 10px
                        img 
                            width 100%
                            height 100%
            .home-activity
                width 100%
                background-color #fff
                margin-top 10px
                .title
                    box-sizing border-box
                    padding 0 15px
                    height 50px
                    line-height 50px
                    font-size 16px
                    width 100%
                    text-align center
                .activity-show
                    display flex
                    padding 0 15px 10px
                    .activity-img-big
                        width 171px
                        height 217px
                        background-color #F9E9CF
                        text-align center
                        margin-right 5px
                        &>p
                            height 50px
                            padding 10px 0 0 15px
                            font-size 16px
                            line-height 50px
                            text-align left
                        img
                            width 129px
                    .activity-img
                        flex 1
                        display flex
                        flex-direction column
                        .activity-img-small
                            flex 1
                            position relative
                            &:nth-child(1)
                                background-color #FBE2D3
                                margin-bottom 5px
                            &:nth-child(2)
                                background-color #FFECC2
                            .text
                                .activity-title
                                    height 24px
                                    line-height 24px
                                    font-size 16px
                                    padding 10px 0 0 10px
                                .subTitle
                                    height 18px
                                    line-height 18px
                                    font-size 12px
                                    padding 0 0 0 10px
                                .tag
                                    display inline-block
                                    padding 3px
                                    font-size 10px
                                    color #fff
                                    background-color rgba(100,100,100,.5)
                                    border-radius 3px
                                    margin 0 0 0 10px
                            img 
                                width 100px
                                position absolute
                                right 0
                                bottom 0
                            .price-circle
                                position absolute
                                right 20px 
                                bottom 60px
                                width 40px
                                height 40px
                                border-radius 50%
                                background-color #F59524
                                display flex
                                flex-direction column
                                text-align center
                                justify-content center
                                color #fff
                                span
                                    font-size 14px
                                del
                                    font-size 10px
                                    transform scale(0.8)
            .home-categoryHotSellModule
                width 100%
                background-color #fff
                margin-top 10px
                .title
                    box-sizing border-box
                    padding 0 15px
                    height 50px
                    line-height 50px
                    font-size 16px
                    width 100%
                .categoryList      
                    padding 0 10px 10px 15px
                    display flex
                    flex-wrap wrap
                    .category-item
                        width 82.5px
                        height 90px
                        background-color #f5f5f5
                        margin-right 5px
                        margin-bottom 5px
                        a
                            width 100%
                            height 100%
                            color #000
                            .top
                                margin-top 5px
                                height 18px
                                line-height 18px
                                text-align center
                                p
                                    width 100%
                                    height 100%
                            .bottom
                                text-align center
                                img
                                    vertical-align middle
                                    width 60px
                                    height 60px
                        &.big-item
                            width 170px
                            height 100px
                            font-size 14px
                            &:nth-child(1)
                                background-color #F9F3E4
                            &:nth-child(2)
                                background-color #EBEFF6
                            a
                                width 100%
                                height 100%
                                display flex
                                color #000
                                .right
                                    flex 0 0 100px
                                    height 100%
                                    img 
                                        width 100%
                                .left
                                    flex 1
                                    display flex
                                    align-items center
                                    justify-content center
                                    p
                                        position relative
                                        &:after
                                            content ''
                                            display block
                                            position absolute
                                            left 0
                                            bottom -10px
                                            width 30px
                                            height 2px 
                                            background-color #000
            .home-sceneLightShoppingGuideModule
                display flex
                flex-wrap wrap
                justify-content space-between
                padding 5px 15px 15px 13px
                background-color #fff
                margin-top 10px
                .item
                    width 171px
                    height 132px
                    box-sizing border-box
                    background-color #f5f5f5
                    padding-left 10px
                    padding-top 10px
                    margin-bottom 5px
                    a
                        width 100%
                        height 100%
                        display block
                        .shopName
                            font-size 16px
                            padding-left 5px
                            color #000
                        .shopDesc
                            font-size 12px
                            padding-left 5px
                            margin-top 5px
                        .shopImg
                            display flex
                            img
                                width 75px
                                height 75px
            .home-footer
                width 100%
                height 122px
                border-top 1px solid rgba(0,0,0,.15)
                background-color #414141
                margin-top 10px
                position relative
                .origin
                    width 100%
                    height 16px
                    line-height 16px
                    color #999
                    position absolute
                    bottom 30px
                    left 0
                    text-align center

            

                                        
                            


                

</style>