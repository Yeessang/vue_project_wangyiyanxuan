export default {
    api:{
        getWorthNavList:{
            url:'/topic/v1/know/navWap.json',
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
        getInitWorthList:{
            url:'/topic/v1/find/recManual.json',
            method:'get',
            crosUrl:'/api',
            hooks:{
                beforeReq(callback){
                    callback && callback()
                },
                receiveRes(callback){
                    callback && callback()
                },
            }
        },
        getWorthList:{
            url:'/topic/v1/find/recAuto.json',
            method:'get',
            crosUrl:'/api',
            hooks:{
                beforeReq(callback){
                    callback && callback()
                },
                receiveRes(callback){
                    callback && callback()
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