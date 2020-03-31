import {SAVECATEGORYID,ADDSHOPTOCART,DELSHOP,CHANGEBUYCHOSEN} from './mutation_types'

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
    }
}