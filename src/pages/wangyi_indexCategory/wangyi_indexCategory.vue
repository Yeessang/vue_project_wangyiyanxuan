<template>
    <div class="index-category" ref="categoryWrap">
        <div class="shop-list">
            <ul class="list" v-if="category">
                <li class="item" v-for="(item,index) in category.itemList" :key="index">
                    <img :src="item.showPicUrl" alt="">
                    <p>{{item.simpleDesc}}</p>
                    <div class="price">
                        <span class="newPrice">￥{{item.retailPrice}}</span>
                        <del class="oldPrice">￥{{item.counterPrice}}</del>
                    </div>
                    <div class="tag"></div>
                </li>
                {{$route.params.id}}
            </ul>
        </div>
        
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name:'wangyi-indexCategory',
        props:['category'],
        mounted(){
            console.log(this.$route.params.id)
            console.log(this.category)
            this.$nextTick(() => {
                this.categoryScroll = new BScroll(this.$refs.categoryWrap,{
                    click:true,
                    probeType:3
                })
            })
        }
    }
</script>

<style lang="stylus" scoped>
    .index-category
        width 100%
        height calc(100% - 74px)
        overflow hidden
        .shop-list
            width 100%
            padding-top 20px
            margin-bottom 40px
            .list
                width 100%
                box-sizing border-box
                padding 0 10px
                display flex
                flex-wrap wrap
                justify-content space-between
                .item
                    width 49%
                    background-color #fff
                    margin-bottom 10px
                    img
                        width 100%
                    p
                        width 100%
                        font-size 14px
                        margin-bottom 10px
                        text-overflow -o-ellipsis-lastline
                        overflow hidden
                        text-overflow ellipsis
                        display -webkit-box
                        -webkit-line-clamp 2
                        -webkit-box-orient vertical
                    .price
                        display flex
                        margin-bottom 10px
                        span
                            &:nth-child(1)
                                color #dd1a1a
                                font-size 16px
                                margin-right 5px
                        del
                            font-size 12px
</style>