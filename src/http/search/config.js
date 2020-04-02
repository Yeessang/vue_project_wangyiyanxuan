export default {
    api:{
        getSearchInitMessage:{
            url:'/xhr/search/init.json',
            method:'get',
            crosUrl:'/api',
            hooks:{
                beforeReq(callback){
                    callback && callback()
                    // console.log('beforeReq')
                },
                receiveRes(callback){
                    callback && callback()
                    // console.log('receiveRes')
                },
            }
        },
        getSearchWithKeyword:{
            url:'/xhr/search/searchAutoComplete.json',
            method:'post',
            crosUrl:'/api',
            postWithUrlencoded:true,
            hooks:{
                beforeReq(callback){
                    callback && callback()
                    // console.log('beforeReq')
                },
                receiveRes(callback){
                    callback && callback()
                    // console.log('receiveRes')
                },
            }
        }
    },
    hooks:{
        beforeContactReq(callback){
            callback && callback()
        },
        receiveContactRes(callback){
            callback && callback()
        }
    }
}