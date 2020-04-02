<template>
    <div class="login-wrap">
        <CommonHeader :title="'网易严选'" :height="44" class="login-header"></CommonHeader>
        <div class="login-container" v-if="!isPhoneMethod && !isMailMethod">
            <div class="login-logo">
                <img src="https://yanxuan.nosdn.127.net/39c5e4583753d4c3cb868a64c2c109ea.png" alt="">
            </div>
            <div class="login-method">
                <Button type="danger" class="button" @click="isPhoneMethod = true">
                    <Icon name="phone" class="icon"></Icon>
                    <span>手机号快捷登录</span>
                </Button>
                <Button type="default" class="button" @click="isMailMethod = true">
                    <Icon name="envelop-o" class="icon"></Icon>
                    <span>邮箱账户登录</span>
                </Button>
            </div> 
        </div>
        <div class="login-container-phone" v-if="isPhoneMethod"> 
            <div class="login-logo">
                <img src="https://yanxuan.nosdn.127.net/39c5e4583753d4c3cb868a64c2c109ea.png" alt="">
            </div>
            <div class="login-input">
                <Form @submit="onPhoneSubmit">
                     <Field
                        class="input-item"
                        v-model="phone"
                        name="手机号码"
                        placeholder="手机号码"

                        :right-icon="phone ? 'close' : '' "
                        @click-right-icon="clickClose"
                        :rules="[{required: true,pattern:/^1[3456789]\d{9}$/, message: '请填写正确的手机号' }]"
                    />
                    <Field
                        class="input-item"
                        v-model="code"
                        name="验证码"
                        placeholder="验证码"
                        :rules="[{required: true, pattern: /^\d{6}$/, message: '请填写用户名' }]"
                    >
                        <template #button>
                            <Button size="small" type="default" style="border:1px solid #666">获取验证码</Button>
                        </template>
                    </Field>
                    <div class="input-question">
                        <span style="color:#999">遇到问题</span>
                        <span @click="toAnotherMethod">使用密码验证登录</span>
                    </div>
                    <div style="margin-top:10px">
                        <Button block type="danger" native-type="submit">
                        登录
                        </Button>
                    </div>
                </Form>
            </div>
            <div class="agreement">
                <label for="agree">
                    <input type="checkbox" id="agree" v-model="isAgree"/>
                    <span>我同意</span>
                    <a href="https://reg.163.com/agreement_mobile_wap.shtml?v=20171127">《服务条款》</a>
                    <span>和</span>
                    <a href="https://reg.163.com/agreement_mobile_ysbh_wap.shtml?v=20171127">《网易隐私政策》</a>
                </label>
            </div>
            <div class="changeMethod">
                <span @click="changeMethod">切换登录方式</span>
                <Icon name="arrow" class="icon"></Icon>
            </div>
        </div>
        <div class="login-container-mail" v-if="isMailMethod">
            <div class="login-logo">
                <img src="https://yanxuan.nosdn.127.net/39c5e4583753d4c3cb868a64c2c109ea.png" alt="">
            </div>
            <div class="login-input">
                <Form @submit="onMailSubmit">
                     <Field
                        class="input-item"
                        v-model="mail"
                        name="邮箱"
                        placeholder="邮箱"
                        :rules="[{ required: true,pattern:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, message: '请填写正确的邮箱' }]"
                    />
                    <Field
                        class="input-item"
                        v-model="password"
                        type="password"
                        name="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <div class="input-question">
                        <span>注册账号</span>
                        <span v-if="methodChangedFrom === 'login'">忘记密码？</span>
                        <span v-else @click="toAnotherMethod">使用手机验证码登录</span>
                    </div>
                    <div style="margin-top:10px">
                        <Button block type="danger" native-type="submit">
                        登录
                        </Button>
                    </div>
                </Form>
            </div>
            <div class="changeMethod">
                <span  @click="changeMethod">切换登录方式</span>
                <Icon name="arrow" class="icon"></Icon>
            </div>
        </div>
    </div>
</template>

<script>
    import CommonHeader from 'components/wangyi_commonHeader/wangyi_commonHeader'
    import {Button,Icon,Form,Field,Toast} from 'vant'
    import {CHANGELOGIN} from 'store/mutation_types'
    import {mapActions} from 'vuex'
    export default {
        name:'wangyi-login',
        data(){
            return {
                isPhoneMethod:false,
                isMailMethod:false,
                phone:'',
                code:'',
                mail:'',
                password:'',
                methodChangedFrom:'login',
                isAgree:false
            }
        },
        methods:{
            ...mapActions([CHANGELOGIN]),
            onPhoneSubmit(values) {
                if(!this.isAgree){
                    Toast.fail('请您阅读协议并勾选');
                    return
                }
                console.log('submit', values);
                this[CHANGELOGIN](values)
                this.$router.replace('/cart')
            },
            onMailSubmit(values) {
                console.log('submit', values);
                this[CHANGELOGIN](values)
                this.$router.replace('/cart')
            },
            changeMethod(){
                this.isPhoneMethod = false
                this.isMailMethod = false
                this.methodChangedFrom = 'login'
                this.phone = ''
                this.code = ''
                this.mail = ''
                this.password = ''
            },
            clickClose(){
                this.phone = ''
            },
            toAnotherMethod(){
                if(this.isPhoneMethod){
                    this.isPhoneMethod = false
                    this.isMailMethod = true
                    this.methodChangedFrom = 'phone'
                }else{
                    this.isPhoneMethod = true
                    this.isMailMethod = false
                    this.methodChangedFrom = 'mail'
                }
            }
        },
        components:{
            CommonHeader,
            Button,
            Icon,
            Form,
            Field
        }
    }
</script>

<style lang="stylus" scoped>
    .login-wrap
        width 100%
        height 100%
        .login-header
            background-color #eee
        .login-container
            margin-top 44px
            width 100%
            height calc(100% - 44px)
            .login-logo
                width 100%
                padding 80px 0 116px 0
                text-align center
                img 
                    width 134px
                    height 45px
            .login-method
                display flex
                flex-direction column
                align-items center
                .button
                    width 335px
                    height 47px
                    margin-bottom 16px
                    &:nth-child(1)
                        color #fff
                    &:nth-child(2) 
                        color #dd1a1a   
                    .icon
                        font-size 20px
                        position relative
                        top 5px
                        margin-right 10px
        .login-container-phone
            margin-top 44px
            width 100%
            height calc(100% - 44px)
            background-color #fff
            overflow hidden
            .login-logo
                width 100%
                height 45px
                box-sizing border-box
                margin-top 28px
                text-align center
                img
                    width 134px
                    height 45px
            .login-input
                width 100%
                padding-top 57px
                padding-left 20px
                padding-right 20px
                box-sizing border-box
                .input-item
                    border-bottom 0.5px solid rgba(200,200,200,.8)
                .input-question
                    display flex
                    box-sizing border-box
                    padding 10px 16px 
                    height 44px
                    justify-content space-between
                    align-items center
                    font-size 14px
            .agreement
                width 100%
                height 20px
                line-height 20px
                font-size 14px
                margin-top 10px
                padding-left 20px
                input 
                    vertical-align middle
                    position relative
                    top -1px
                    margin-right 3px
                a
                    color blue
            .changeMethod
                width 100%
                height 20px
                text-align center
                line-height 20px
                font-size 14px
                margin-top 20px
                .icon
                    position relative
                    top 3px
                    margin-left 5px
        .login-container-mail
            margin-top 44px
            width 100%
            height calc(100% - 44px)
            background-color #fff
            overflow hidden
            .login-logo
                width 100%
                height 45px
                box-sizing border-box
                margin-top 28px
                text-align center
                img
                    width 134px
                    height 45px
            .login-input
                width 100%
                padding-top 57px
                padding-left 20px
                padding-right 20px
                box-sizing border-box
                .input-item
                    border-bottom 0.5px solid rgba(200,200,200,.8)
                .input-question
                    display flex
                    box-sizing border-box
                    padding 10px 16px 
                    height 44px
                    justify-content space-between
                    align-items center
                    font-size 14px
            .changeMethod
                width 100%
                height 20px
                text-align center
                line-height 20px
                font-size 14px
                margin-top 20px
                .icon
                    position relative
                    top 3px
                    margin-left 5px
</style>