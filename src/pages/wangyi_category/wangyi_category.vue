<template>
    <div class="category-container">
        <div class="category-nav-wrap">
            <div class="category-nav">
                <router-link 
                    class="nav-item" 
                    v-for="(nav,index) in categoryNavList" 
                    :key="index"
                    :to="`/category/categoryList/${nav.id}`"
                    @click.native="getCurrentBanner(index,nav.id)"
                >
                    {{nav.name}}
                </router-link>
            </div>
        </div>
        <router-view :currentBannerUrl="currentBannerUrl"></router-view>
    </div>
</template>

<script>
    import {SAVECATEGORYID} from 'store/mutation_types'
    import {mapActions} from 'vuex'
    export default {
        name:'wangyi-category',
        data(){
            return {
                categoryNavList:[],
                currentBannerUrl:'',
            }
        },
        methods:{
            ...mapActions([SAVECATEGORYID]),
            async getNavList(){
                const result = await this.$http.category.getNavCategory()
                if(result.code === 200){
                    this.categoryNavList = result.data.categoryL1List
                }
            },
            getCurrentBanner(index,id){
                this.currentBannerUrl = this.categoryNavList[index].bannerUrl
                this[SAVECATEGORYID](id)
            }
        },
        async mounted(){
            await this.getNavList()
            const {id} = this.$route.params

            this.currentBannerUrl = this.categoryNavList.find(item => +item.id === +id).bannerUrl


        }
    }
</script>

<style lang="stylus" scoped>
    .category-container
        margin-top 44px
        background-color #fff
        width 100%
        height calc(100% - 94px)
        box-sizing border-box
        overflow hidden
        display flex
        .category-nav-wrap
            flex 0 0 81px
            height 100%
            overflow hidden
            border-right 1px solid rgba(100,100,100,.1)
            .category-nav
                padding 20px 0
                width 81px
                display flex
                flex-direction column
                justify-content space-between
                .nav-item
                    width 100%
                    height 25px
                    box-sizing border-box
                    line-height 25px
                    text-align center
                    font-size 14px
                    color #333
                    &:not(:nth-child(1))
                        margin-top 20px
                    &.nav-active    
                        color #AB2B2B
                        position relative
                        &:before
                            content ''
                            display block
                            position absolute
                            width 3px 
                            height 100%
                            left 0
                            top 0
                            background-color #AB2B2B              
</style>