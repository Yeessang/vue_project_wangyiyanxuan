
export default {
    storeCategoryId:'',
    shopCartList:localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')) : [],
    userInfo:localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null
}