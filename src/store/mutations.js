import {SAVECATEGORYID} from './mutation_types'

export default {
    [SAVECATEGORYID](state,data){
        state.storeCategoryId = data
    }
}