<template>
    <div>
        <Count :shop="shop" :needAllCount="false"></Count>
        <Button @click="addShop">加入购物车</Button>
        <Button @click="toCart">去购物车</Button>
    </div>
</template>

<script>
    import Count from 'components/wangyi_count/wangyi_count'
    import {Button} from 'vant'
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
            console.log(this.$bus.currentShop)
        }
    }
</script>

<style lang="stylus" scoped>

</style>