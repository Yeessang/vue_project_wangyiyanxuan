export default (insOfAxios,api) => {
    if(api === undefined) 
        throw new Error('该函数第二个参数是必须传的')
    if(!(api instanceof Object)) 
        throw new Error('该函数的第二个参数必须是一个对象') 
    if(Object.keys(api).length === 0) 
        throw new Error('该函数第二个参数不能为一个空对象')
    let processedApi = {}
    /* let emptyObj = Object.create(null)
    let newPrototype = Object.assign(
                                emptyObj,
                                Object.getPrototypeOf(async function(){}),
                                {
                                    beforeReq(callback){
                                        callback && callback()
                                        console.log('beforeReq')
                                    },
                                    receiveRes:null
                                })
    console.log(newPrototype)
    Object.setPrototypeOf(processedApi[name],newPrototype) */
    for(let [name,itemApi] of Object.entries(api)){
        let {url,method,isForm,hooks,crosUrl,needToken,postWithUrlencoded} = itemApi
        processedApi[name] = async (data = {},paramsStr) => {
            if(!(data instanceof Object)){
                throw new Error('参数必须是一个对象')
            }
            if(hooks){
                Object.assign(processedApi[name],hooks)
            }
            let transformData = null
            if(isForm && Object.keys(data) !== 0){
                transformData = new FormData()
                for(let key in data){
                    transformData.append(key,data[key])
                }
            }else if(postWithUrlencoded && Object.keys(data) !== 0){
                let urlencodedStr = ''
                for(let [key,value] of Object.entries(data)){
                    urlencodedStr += `${key}=${value}&`
                }
                transformData = urlencodedStr.split('').slice(0,-1).join('')
            }else{
                transformData = data
            }
            if(crosUrl){
                url = crosUrl + url 
                crosUrl = '' 
            }
            let newUrl = url
            if(paramsStr){
                newUrl = newUrl + '/' + paramsStr
            }
            let result = null
            let configAxios = null
            switch (method.toLowerCase()) {
                case 'get':
                case 'delete':
                    processedApi[name].beforeReq && processedApi[name].beforeReq()
                    configAxios = {
                        url:newUrl,
                        method,
                        params:transformData,
                        headers:{}
                    }
                    if(needToken){
                        configAxios.headers.Authorization = localStorage.getItem('token') || ''
                    }
                    result = await insOfAxios(configAxios)
                    processedApi[name].receiveRes && processedApi[name].receiveRes()
                    break;
                case 'post':
                case 'put':
                    processedApi[name].beforeReq && processedApi[name].beforeReq()
                    configAxios = {
                        url:newUrl,
                        method,
                        data:transformData,
                        headers:{}
                    }
                    if(needToken){
                        configAxios.headers.Authorization = localStorage.getItem('token') || ''
                    }
                    if(postWithUrlencoded){
                        configAxios.headers['content-type'] = 'application/x-www-form-urlencoded'
                    }
                    console.log(configAxios)
                    result = await insOfAxios(configAxios)
                    processedApi[name].receiveRes && processedApi[name].receiveRes()
                    break;
            }
            return result
        }
    }
    console.log(processedApi)
    return processedApi
}
