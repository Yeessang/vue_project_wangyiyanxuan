
export default {
    storeCategoryId:'',
    shopCartList:localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')) : []
}