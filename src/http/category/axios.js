import axios from 'axios'
import Category from './config'

export const CategoryAxios = axios.create({
    timeout:10000
})

CategoryAxios.interceptors.request.use((config)=>{
    Category.hooks.beforeContactReq()
    // 因为已经将各个请求模块 通过高阶函数http重新封装了一次
    // 所以有关请求的处理 最好最优都是放在http高阶函数中处理最好
    // const token = localStorage.getItem('token')
    // if(token){
    //     config.headers.Authorization = token
    // }
    return config
})

CategoryAxios.interceptors.response.use((response)=>{
    Category.hooks.receiveContactRes()
    return response.data
},(error) => {
    Category.hooks.receiveContactRes()
    return Promise.reject(error)
})

