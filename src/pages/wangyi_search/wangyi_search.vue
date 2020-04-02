<template>
    <div class="search-container">
        <header class="search-header">
            <form action="/search">
                <Icon name="search" class="search-icon"></Icon>
                <input 
                    type="text" 
                    class="search-input" 
                    :placeholder="initSuggestion ? initSuggestion.defaultKeyword.keyword : '搜索'"
                    v-model="searchKeyword"    
                    @input="getSearchList"
                />
            </form>
            <span @click="goBack">取消</span>
        </header>
        <div class="search-suggestion" v-if="!searchKeyword">
            <header class="suggestion-title">热门搜索</header>
            <ul class="suggestion-list" v-if="initSuggestion">
                <li 
                    class="suggestion-item" 
                    v-for="(suggestion,index) in initSuggestion.hotKeywordVOList"
                    :key="index"
                >
                    <a :href="suggestion.schemeUrl" :class="{highLight:suggestion.highlight == 1}">
                        <span>{{suggestion.keyword}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="search-list-container" v-else>
            <ul class="search-list">
                <li class="search-item" v-for="(item,index) in searchKeywordList" :key="index">
                    <span>{{item}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {Icon} from 'vant'
    export default {
        name:'wangyi-search',
        data(){
            return {
                initSuggestion:null,
                searchKeyword:'',
                searchKeywordList:[]
            }
        },
        methods:{
            goBack(){
                this.$router.back()
            },
            async getInitSuggestion(){
                const result = await this.$http.search.getSearchInitMessage()
                console.log(result)
                if(result.code == '200'){
                    this.initSuggestion = result.data
                }
            },
            async getSearchWithKeyword(data){
                const result = await this.$http.search.getSearchWithKeyword(data)
                console.log(result)
                this.searchKeywordList = result.data
            },
            getSearchList(){
                const {searchKeyword} = this
                if(this.searchLastTimerId) clearTimeout(this.searchLastTimerId)
                this.searchLastTimerId = setTimeout(() => {
                    this.getSearchWithKeyword({keywordPrefix:searchKeyword})   
                },300)
                if(this.searchTimerId) return 
                clearTimeout(this.searchLastTimerId)
                this.searchTimerId = setTimeout(() => {
                    this.searchTimerId = null
                    this.getSearchWithKeyword({keywordPrefix:searchKeyword})   
                },300)
            }
        },
        mounted(){
            this.getInitSuggestion()
            // this.getSearchWithKeyword({keywordPrefix:'锅'})
        },
        components:{
            Icon
        }
    }
</script>

<style lang="stylus" scoped>
    .search-container
        width 100%
        height 100%
        overflow hidden
        .search-header
            width 100%
            height 44px
            background-color #fff
            box-sizing border-box
            padding 0 15px
            display flex
            justify-content space-between
            align-items center
            form
                width 302px
                height 28px
                background-color #f4f4f4
                box-sizing border-box
                padding 0 10px
                display flex
                justify-content space-around
                align-items center
                .search-icon
                    font-size 16px
                .search-input
                    width 260px
                    height 20px
                    background-color #f4f4f4
                    &::-webkit-input-placeholder
                        color #ccc
                        font-size 14px
            span 
                font-size 14px
        .search-suggestion
            width 100%
            padding 0 15px 15px 15px
            box-sizing border-box
            margin-bottom 10px
            background-color #fff
            .suggestion-title
                width 100%
                height 45px
                line-height 45px
                font-size 16px
            .suggestion-list
                display flex
                flex-wrap wrap
                width 100%
                .suggestion-item
                    margin-right 16px
                    margin-bottom 16px
                    a
                        display blcok
                        padding 3px 7.5px
                        width 100%
                        height 100%
                        color #000
                        line-height 24px
                        border 0.5px solid #999
                        border-radius 2px
                        &.highLight
                            color #dd1a1a
                            border 0.5px solid #dd1a1a
        .search-list-container
            width 100%
            padding 10px
            padding-top 0
            padding-bottom 0
            box-sizing border-box
            background-color #fff
            .search-list
                width 100%
                .search-item
                    width 100%
                    height 50px
                    line-height 70px
                    font-size 14px
                    border-bottom 0.5px solid rgba(200,200,200,.8)
                    &:last-child
                        border-bottom none  

            

</style>        