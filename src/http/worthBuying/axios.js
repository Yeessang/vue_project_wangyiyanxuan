import axios from 'axios'
import worthBuying from './config'

export const worthBuyingAxios = axios.create({
    timeout:10000
})

worthBuyingAxios.interceptors.request.use((config)=>{
    worthBuying.hooks.beforeContactReq()
    // 因为已经将各个请求模块 通过高阶函数http重新封装了一次
    // 所以有关请求的处理 最好最优都是放在http高阶函数中处理最好
    // const token = localStorage.getItem('token')
    // if(token){
    //     config.headers.Authorization = token
    // }
    return config
})

worthBuyingAxios.interceptors.response.use((response)=>{
    worthBuying.hooks.receiveContactRes()
    return response.data
},(error) => {
    worthBuying.hooks.receiveContactRes()
    return Promise.reject(error)
})

