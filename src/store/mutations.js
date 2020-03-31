import {SAVECATEGORYID,ADDSHOPTOCART,DELSHOP,CHANGEBUYCHOSEN} from './mutation_types'

export default {
    [SAVECATEGORYID](state,data){
        state.storeCategoryId = data
    },
    [ADDSHOPTOCART](state,{data,isSubmit}){
        data =  Object.assign({},data,{isBuyChosen:true,isEditChosen:false})
        let localCartList = []
        if(localStorage.getItem('cartList')){
            localCartList = JSON.parse(localStorage.getItem('cartList'))
        }
        const isAddIndex = state.shopCartList.findIndex(item => (item.id ? item.id : item.itemId) === (data.id ? data.id : data.itemId))
        if(isAddIndex >= 0 && typeof isAddIndex === 'number'){
            if(isSubmit){
                state.shopCartList[isAddIndex].count += data.count
            }else{
                state.shopCartList[isAddIndex].count = data.count
            }
        }else{
            state.shopCartList.push(data)
        }
        const isLocalHaveIndex = localCartList.findIndex(item => (item.id ? item.id : item.itemId) === (data.id ? data.id : data.itemId))
        if(isLocalHaveIndex >= 0 && typeof isLocalHaveIndex === 'number' && localCartList.length !== 0){
            if(isSubmit){
                localCartList[isLocalHaveIndex].count += data.count
            }else{
                localCartList[isLocalHaveIndex].count = data.count
            }
        }else{
            localCartList.push(data)
        }
        localStorage.setItem('cartList',JSON.stringify(localCartList))
    },
    [DELSHOP](state){
        state.shopCartList.forEach((item,index) => {
            if(item.isEditChosen){
                state.shopCartList.splice(index,1)
            }
        })
        localStorage.setItem('cartList',JSON.stringify(state.shopCartList))
    },
}