<template>
  <div class="home-flashSaleModule" v-if="module">
    <header class="title">
      <span>{{title}}</span>
      <div class="remainTime" v-if="module.remainTime">
        <span class="hour time">{{hour}}</span>
        <span class="tag">:</span>
        <span class="minute time">{{minute}}</span>
        <span class="tag">:</span>
        <span class="second time">{{second}}</span>
      </div>
    </header>
    <ul class="flashSaleList" v-if="!(module instanceof Array)">
      <li class="sale-item" v-for="item in module.itemList" :key="item.itemId">
        <a href="javascript:;">
          <div class="item-img">
            <img :src="item.picUrl" alt />
          </div>
          <div class="item-price">
            <span class="now-price" v-if="item.activityPrice">￥{{item.activityPrice}}</span>
            <del class="old-price" v-if="item.originPrice">￥{{item.originPrice}}</del>
          </div>
        </a>
      </li>
    </ul>
    <ul class="flashSaleList" v-if="(module instanceof Array)">
      <li class="sale-item" v-for="item in module" :key="item.id">
        <a href="javascript:;" style="color:#000">
          <div class="item-img">
            <img :src="item.scenePicUrl" alt />
          </div>
          <p class="item-desc">{{item.name}}</p>
          <div class="item-price" :style="{'paddingLeft':0}">
            <span class="now-price" v-if="item.retailPrice" style="font-size:15px">￥{{item.retailPrice}}</span>
            <del class="old-price" v-if="item.originPrice">￥{{item.originPrice}}</del>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "wangyi-home-saleModule",
  props:['title','module'],
  computed:{
        hour(){
            return this.module ? moment(this.module.remainTime).format("HH") : '00'
        },
        minute(){
            return this.module ? moment(this.module.remainTime).format("MM") : '00'
        },
        second(){
            return this.module ? moment(this.module.remainTime).format("SS") : '00'
        },
    },
};
</script>

<style lang="stylus" scoped>
.home-flashSaleModule
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
    display flex
    >span
        margin-right 6px
    .time
      background-color #000
      color #fff
      font-size 12px
      border-radius 3px
      padding 2px 4px
    .tag
      margin 0 3px
  .flashSaleList
    display flex
    flex-wrap wrap
    padding 0 10px 0 15px
    justify-content space-between
    .sale-item
      width 108px
      padding-bottom 15px
      box-sizing border-box
      a
        display block
        width 100%
        height 100%
        .item-img
          width 100%
          margin-bottom 6px
          img
            display block
            width 100%
        .item-desc
            overflow hidden
            display -webkit-box
            text-overflow ellipsis
            -webkit-line-clamp 2
            -webkit-box-orient vertical
            white-space normal
            line-height 16px
            margin-bottom 5px
        .item-price
          height 21px
          line-height 21px
          padding-left 10px
          .now-price
            font-size 14px
            color #DD1A21
            margin-right 5px
          .old-price
            font-size 10px
</style>