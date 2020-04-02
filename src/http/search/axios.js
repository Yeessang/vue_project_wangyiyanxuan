import axios from 'axios'
import search from './config'

export const searchAxios = axios.create({
    timeout:10000
})

searchAxios.interceptors.request.use((config)=>{
    search.hooks.beforeContactReq()
    // 因为已经将各个请求模块 通过高阶函数http重新封装了一次
    // 所以有关请求的处理 最好最优都是放在http高阶函数中处理最好
    // const token = localStorage.getItem('token')
    // if(token){
    //     config.headers.Authorization = token
    // }
    return config
})

searchAxios.interceptors.response.use((response)=>{
    search.hooks.receiveContactRes()
    return response.data
},(error) => {
    search.hooks.receiveContactRes()
    return Promise.reject(error)
})

