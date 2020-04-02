export default {
    cartCount(state){
        let count = 0
        state.shopCartList.forEach((shop) => {
            count += shop.count
        })
        console.log(count)
        return count
    }
}