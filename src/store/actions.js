import {SAVECATEGORYID} from './mutation_types'

export default {
    [SAVECATEGORYID](store,data){
        store.commit(SAVECATEGORYID,data)
    }
}