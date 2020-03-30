<template>
    <div>
        {{$route.params.id}}
    </div>
</template>

<script>
    export default {
        name:'wangyi-indexCategory',
        mounted(){
            console.log(this.$route.params.id)
        }
    }
</script>

<style lang="stylus" scoped>

</style>