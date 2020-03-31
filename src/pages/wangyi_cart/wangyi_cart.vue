<template>
    <div>
        <header>
            <span>购物车</span>
            <div class="edit" @click="toggleEdit">
                <span v-if="isEdit">完成</span>
                <span v-else>编辑</span>
            </div>
            
        </header>
        <div class="cart-container">
            <div class="cart-activity">
                <span>30天无忧退货</span>
                <span>48小时快速退款</span>
                <span>满99元包邮费</span>
            </div>
            <ul class="cart-list" ref="shopList" v-if="shopCartList">
                <li class="list-item" v-for="(item,index) in shopCartList" :key="index">
                    <div class="item-show">
                        <div class="show-left">
                            <img :src="item.showPicUrl" alt="">
                        </div>
                        <div class="show-right">
                            <div class="shop-top">
                                <div class="shop-name">{{item.name ? item.name : ''}}</div>
                                <div class="shop-choseModel">
                                    <span>100克</span>
                                    <Icon name="arrow-down"></Icon>
                                </div>
                            </div>
                            <div class="shop-operation">
                                <div class="shop-price">
                                    <span class="newPrice" v-if="item.activityPrice || item.retailPrice">￥{{item.activityPrice ? item.activityPrice : item.retailPrice}}</span>
                                    <del class="oldPrice" v-if="item.originPrice || item.counterPrice">￥{{item.originPrice ? item.originPrice : item.counterPrice}}</del>
                                </div>
                                <div class="shop-count">
                                    <Count :needAllCount="true" :shop="item"></Count>
                                </div>
                            </div>
                        </div>
                        <input type="checkbox" class="choseBtn" v-model="item.isBuyChosen" v-if="!isEdit"/>
                        <input type="checkbox" class="choseBtn" v-model="item.isEditChosen" v-else/>
                    </div>
                </li>
            </ul>
        </div>
        <footer>
            <label for="choseAll">
                <input type="checkbox" class="choseBtn" id="choseAll" ref="choseAllBtn" v-model="isChoseAll"/>
                <span v-if="!isEdit">已选（{{chosedShopArr.length}}）</span>
                <span v-else>已选（{{chosedEditShopArr.length}}）</span>
            </label>
            <div class="footer-right">
                <div class="totalPrice" v-if="!isEdit">
                    <span>合计:￥{{totalPrice}}</span>
                    <span>已优惠:￥{{preferentialPrice}}</span>
                </div>
                <div class="operation" :class="{forbidClick:chosedEditShopArr.length === 0 && isEdit}" @click="operaCartShop">
                    <span v-if="isEdit">删除所选</span>
                    <span v-else>下单</span>
                </div>
            </div>
            
        </footer>
    </div>
    
</template>

<script>
    import {Icon} from 'vant'
    import Count from 'components/wangyi_count/wangyi_count'
    import {mapActions} from 'vuex'
    import {DELSHOP} from 'store/mutation_types'
    export default {
        name:'wangyi-cart',
        data(){
            return {
                isEdit:false,
                
            }
        },
        computed:{
            shopCartList(){
                return this.$store.state.shopCartList
            },
            chosedShopArr(){
                localStorage.setItem('cartList',JSON.stringify(this.shopCartList))
                return this.shopCartList.filter(item => item.isBuyChosen)
            },
            chosedEditShopArr(){
                localStorage.setItem('cartList',JSON.stringify(this.shopCartList))
                return this.shopCartList.filter(item => item.isEditChosen)
            },
            isChoseAll:{
                get(){
                    if(this.isEdit){
                        return this.shopCartList.every(item => item.isEditChosen) && this.shopCartList.length !== 0
                    }else{
                        return this.shopCartList.every(item => item.isBuyChosen) && this.shopCartList.length !== 0
                    }
                    
                },
                set(value){
                    this.shopCartList.forEach((item) => {
                        if(this.isEdit){
                            item.isEditChosen = value
                        }else{
                            item.isBuyChosen = value
                        }
                    })

                }
            },
            totalPrice(){
                let totalPrice = 0
                this.chosedShopArr.forEach((item) => {
                    console.log(item)
                    totalPrice += item.count * (item.activityPrice ? item.activityPrice : item.retailPrice)
                })
                return totalPrice
            },
            preferentialPrice(){
                let preferentialPrice = 0
                this.chosedShopArr.forEach((item) => {
                    preferentialPrice += item.count * (item.originPrice ? (item.originPrice - item.activityPrice) : 0)
                })
                return preferentialPrice
            },
            
        },
        methods:{
            ...mapActions([DELSHOP]),
            toggleEdit(){
                const {isEdit} = this
                this.isEdit = !isEdit
            },
            operaCartShop(){
                if(this.isEdit){
                    if(confirm('您确定要删除吗？')){
                        console.log(this.chosedEditShopArr)
                        this[DELSHOP](this.chosedEditShopArr)
                    }
                }else{
                    if(confirm('您确定要提交吗？')){
                        console.log(this.chosedShopArr)
                    }
                }
            }
            // choseAllShop(e){
                // const shopList = this.$refs.shopList
                // let checkArray = shopList.querySelectorAll('.choseBtn')
                // if(e.target.checked){
                //     checkArray.forEach(item => {
                //         item.checked = true
                //         this.chosedShopArr.push(item)
                //     })
                // }else{
                //     checkArray.forEach(item => {
                //         item.checked = false
                //     })
                //     this.chosedShopArr.splice(0,this.chosedShopArr.length)
                // }
            // },
            // choseTheShop(e){
                // const shopList = this.$refs.shopList
                // let checkArray = shopList.querySelectorAll('.choseBtn')
                // if(e.target.checked){
                //     this.chosedShopArr.push(e.target)
                // }else{
                //     let index = this.chosedShopArr.findIndex(item => item.checked === e.target.checked)
                //     this.chosedShopArr.splice(index,1)
                // }
                // let isChoseAll = Array.from(checkArray).every(item => item.checked)
                // if(isChoseAll){
                //     this.$refs.choseAllBtn.checked = true
                // }else{
                //     this.$refs.choseAllBtn.checked = false
                // }
            // }
        },
        // beforeDestroyed(){
        //     console.log(111)
        //     localStorage.setItem('cartList',JSON.stringify(this.shopCartList))
        // },
        // destroyed(){
        //     console.log(111)
            
        // },
        // deactivated(){
        //     console.log(111)
        //     localStorage.setItem('cartList',JSON.stringify(this.shopCartList))
        // },
        components:{
            Icon,
            Count
        }
    }
</script>

<style lang="stylus" scoped>
    header 
        width 100%
        height 44px
        box-sizing border-box
        position fixed
        top 0
        left 0
        background-color #fff
        display flex
        justify-content space-between
        align-items center
        font-size 16px
        padding 0 10px
        span
            &not(nth-child(1))
                font-size 14px

    footer 
        width 100%
        height 48px
        box-sizing border-box
        position fixed
        left 0
        bottom 50px
        background-color #fff
        display flex
        justify-content space-between
        align-items center
        font-size 14px
        padding 0 0 0 10px
        label
            display flex
            align-items center
            input[type="checkbox"]
                border-radius 50%
                border 1px solid rgba(200,200,200,.5)
                width 20px
                height 20px
                outline none
                -webkit-appearance none
                margin-right 5px
                &:checked
                    background-image url('../../static/images/chose.jpg')
                    background-size 200%
                    background-position center
        .footer-right
            display flex
            align-items center
            .totalPrice
                display flex
                flex-direction column
                span
                    &:nth-child(1)
                        font-size 14px
                        color #DD1A21
                        margin-bottom 3px
                    &:nth-child(2)
                        font-size 10px
                        color #666
            .operation
                width 113px
                height 100%
                background-color #DD1A21
                color #fff
                text-align center
                line-height 48px
                margin-left 5px
                &.forbidClick
                    background-color rgba(200,200,200,.5)
                    color #000
    .cart-container
        width 100%
        height calc(100% - 94px)
        margin-top 44px
        .cart-activity
            width 100%
            height 35px
            line-height 35px
            display flex
            justify-content space-around
        .cart-list
            width 100%
            .list-item
                width 100%
                padding-left 43px
                box-sizing border-box
                background-color #fff
                margin-bottom 10px
                .item-show
                    display flex
                    padding 10px 15px 10px 0
                    position relative
                    .show-left
                        width 86px
                        height 86px
                        margin-right 10px
                        background-color #ccc
                        img 
                            width 100%
                            display block
                    .show-right 
                        flex 1
                        display flex
                        flex-direction column
                        .shop-top
                            .shop-name
                                line-height 16px
                                font-size 14px
                                margin-bottom 5px
                            .shop-choseModel
                                display inline
                                align-items center
                                padding 5px
                                background-color rgba(200,200,200,.2)
                                span 
                                    margin-right 3px
                        .shop-operation
                            flex 1
                            display flex
                            justify-content space-between
                            align-items flex-end
                            .newPrice
                                margin-right 5px
                                font-size 14px
                                color red
                            .oldPrice
                                color #999
                    input[type="checkbox"]
                        position absolute
                        left -35px
                        top 50%
                        transform translateY(-50%)
                        border-radius 50%
                        border 1px solid rgba(200,200,200,.5)
                        width 20px
                        height 20px
                        outline none
                        -webkit-appearance none
                        &:checked
                            background-image url('../../static/images/chose.jpg')
                            background-size 200%
                            background-position center
</style>