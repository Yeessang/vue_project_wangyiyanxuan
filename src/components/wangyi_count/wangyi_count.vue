<template>
    <div class="count-container">
        <button :disabled="count <= 1" @click="decCount" :class="{disabled:count <= 1}">-</button>
        <span>{{count}}</span>
        <button @click="addCount">+</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {ADDSHOPTOCART} from 'store/mutation_types'
    export default {
        name:'wangyi-count',
        props:{
            shop:Object,
            needAllCount:Boolean,
        },
        data(){
            return{
                countInit:1,
                processShop:this.shop
            }
            
        },
        computed:{
            count:{
                get(){
                    console.log(this.processShop.count)
                    return this.needAllCount ? this.processShop.count : this.countInit
                },
                set(value){
                    console.log(value,this.needAllCount)
                    this.processShop.count = value
                    this[ADDSHOPTOCART]({data:this.processShop,isSubmit:false})
                }                
            }
        },
        methods:{
            ...mapActions([ADDSHOPTOCART]),
            decCount(){
                if(this.needAllCount){
                    this.count--
                }else{
                    this.countInit--
                    this.processShop.count--
                }
            },
            addCount(){
                if(this.needAllCount){
                    this.count++
                }else{
                    this.countInit++
                    this.processShop.count++
                }
            }
        },
        mounted() {
            if(!this.needAllCount && !this.processShop.count){
                this.$set(this.processShop,'count',1)
                console.log(this.processShop,this.shop)
            }else if(!this.needAllCount && this.processShop.count){
                this.processShop.count++
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .count-container 
        display flex
        width 90px
        height 25px
        font-size 14px
        text-align center
        line-height 25px
        button 
            flex 1
            padding 0
            line-height 22px
            background #fff
            box-sizing border-box
            border 1px solid rgba(200,200,200,.6)
            &.disabled
                border 1px solid rgba(200,200,200,.2)
        span
            flex 1
            border 1px solid rgba(200,200,200,.6)
</style>