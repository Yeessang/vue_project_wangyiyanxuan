import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate)
Validator.localize('zh_CN',{
  messages: zh_CN.messages,
  attributes: {
      phone: '手机号',
      code:"验证码",
      name:"用户名",
      pwd:"密码",
      captcha:"验证码"
  }
});

Validator.extend('phone', {
  validate: value => {
    return /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})
export default VeeValidate