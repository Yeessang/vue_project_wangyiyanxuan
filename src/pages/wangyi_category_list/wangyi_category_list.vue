<template>
    <div class="category-list" ref="showList">
        <div class="category-list-container">
            <div class="bannerImg">
            <img :src="currentBannerUrl" alt="">
            </div>
            <div class="show-list"> 
                <div class="show-item" v-for="(item,index) in subCategoryList" :key="index">
                    <img :src="item.wapBannerUrl" alt="">
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import store from 'store'
    import BScroll from 'better-scroll'
    export default {
        name:'wangyi-category-list',
        props:['currentBannerUrl'],
        data() {
            return {
                subCategory:{},
                subCategoryList:[],
            }
        },

        computed: {
            ...mapState(['storeCategoryId']),
            categoryId(){
                return this.storeCategoryId ? this.storeCategoryId : this.$route.params.id
            }
        },
        methods: {
            async getCategoryList(){
                const result = await this.$http.category.getCategoryList({},this.categoryId)
                if(result.code === 200){
                    this.subCategoryList = result.data.subCateList ? result.data.subCateList : result.data.categoryList
                }
            },
            initShowListScroll(){
                this.showListScroll = new BScroll(this.$refs.showList,{
                    click: true,                 
                    probeType: 3,
                })
            }
        },
        mounted(){
            this.getCategoryList()
            this.$nextTick(() => {
                this.initShowListScroll()
            })
        },
        watch: {
            categoryId(value){
                this.getCategoryList()
                this.$nextTick(() => {
                    this.showListScroll.refresh()
                    this.showListScroll.scrollTo(0,0)
                })
            }
        },
        beforeRouteEnter (to, from, next) {
            if(store.state.storeCategoryId){
                if(+store.state.storeCategoryId === +to.params.id){
                    next()
                }else{
                    next(`/category/categoryList/${store.state.storeCategoryId}`)
                }
            }else{
                next()
            }
        },
        beforeRouteUpdate(to,from,next) {//此处有this，等效于watch，每次路由参数更新触发
            // this.showListScroll.refresh()
            next();
        },
    }
</script>

<style lang="stylus" scoped>
    .category-list
        flex 1
        padding 15px 15px 10px
        .category-list-container
            width 100% 
            .bannerImg
                width 264px
                height 96px
                margin-bottom 16px
                img 
                    width 100%
                    height 100%
            .show-list
                width 100%
                display flex
                flex-wrap wrap
                .show-item
                    width 72px
                    height 108px
                    margin-right 16px
                    img
                        width 100%
                        height 72px
                        border-radius 50%
                    p
                        text-align center


</style>