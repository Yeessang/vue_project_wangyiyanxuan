import {SAVECATEGORYID,ADDSHOPTOCART,DELSHOP,CHANGEBUYCHOSEN,CHANGELOGIN} from './mutation_types'

export default {
    [SAVECATEGORYID](store,data){
        store.commit(SAVECATEGORYID,data)
    },
    [ADDSHOPTOCART](store,{data,isSubmit}){
        store.commit(ADDSHOPTOCART,{data,isSubmit})
    },
    [DELSHOP](store){
        store.commit(DELSHOP)
    },
    [CHANGEBUYCHOSEN](store){
        store.commit(CHANGEBUYCHOSEN)
    },
    [CHANGELOGIN](store,userInfo){
        store.commit(CHANGELOGIN,userInfo)
    }
}