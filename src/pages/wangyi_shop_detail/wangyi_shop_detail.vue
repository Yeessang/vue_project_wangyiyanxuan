<template>
    <div>
        <Count :shop="shop" :needAllCount="false"></Count>
        <Button @click="addShop">加入购物车</Button>
        <Button @click="toCart">去购物车</Button>
    </div>
</template>

<script>
    import Count from 'components/wangyi_count/wangyi_count'
    import {Button,Dialog} from 'vant'
    import {mapActions} from 'vuex'
    import {ADDSHOPTOCART} from 'store/mutation_types'
    export default {
        name:'wangyi-shop-detail',
        data(){
            return{
                shop:Object.assign({},this.$bus.currentShop)
            }
        },
        components:{
            Count,
            Button
        },
        methods:{
            ...mapActions([ADDSHOPTOCART]),
            addShop(){
                console.log(this.shop)
                this[ADDSHOPTOCART]({data:this.shop,isSubmit:true})
            },
            toCart(){
                this.$router.push('/cart')
            }
        },
        mounted(){
            Dialog.confirm({
                title: '注意！',
                message: '由于没有商品对应的API，所以请确定您是从首页新品模块和大促模块点击商品进来的本页，点击取消即跳转回首页，点击确认即仍在该详情页'
            }).then(() => {
                
            }).catch(() => {
                this.$router.replace('/home')
            });
            console.log(this.$bus.currentShop)
        }
    }
</script>

<style lang="stylus" scoped>

</style>