export default function(Vue){
    const loadedImageList = []
    //初始化图片的默认选项（比如图片的路径）
    const init = {
        default:'https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg',
    }
    //判断图片是否已下载的函数
    const hasLoad = (src) => {
        return loadedImageList.includes(src) ? true : false
    }
    //使图片进行加载的函数
    const loadImage = (el,src) => {
        let img = document.createElement('img')
        img.onload = () => {
            el.src = src
            loadedImageList.push(src)
        }
        img.src = src
    }
    //判断图片是否在展示区域可视区域内
    const isShouldShow = (el,isShowConfig) => {
        const {src,wrapHeight,scrollY} = isShowConfig
        // console.log(src,wrapHeight,scrollY)

        //如果每次在判断图片是否在展示可视区域内的话，这个函数会被执行很多而下面两行代码会执行很多
        //而获取DOM对象的信息，这样会 适浏览器渲染多次重新计算
        //所以我要把这两行获取DOM信息，放到初始化的方法中
        //把这些信息保存到DOM对象的一般属性中
        //
        const {offsetWrapTop,selfHeight} = el
        //节点el距离定位父元素的偏移量
        // let offsetWrapTop = el.offsetTop
        // //节点el的高度
        // let selfHeight = el.offsetHeight
        //wrapHeight为传进来指令value对象的属性，代表懒加载图片所在的可视区域高度
        //scrollY代表懒加载图片所在区域的Y轴滑动距离
        //下一行判断为图片是否在可视区域内
        if((offsetWrapTop - scrollY) < wrapHeight && offsetWrapTop + selfHeight > -scrollY){
            //下一行判断，当前的区域内展示的图片是否已经被加载过
            //如果有加载，直接将指令的value对象中的src赋值给当前dom对象el
            //如果没有加载，则执行图片进行加载的函数
            if(hasLoad(src)){
                el.src = src
            }else{
                loadImage(el,src)
            }
        }
    }
    
    //给指令的周期钩子函数绑定监听函数
    const addListener = (el,bind) => {
        const isShowConfig = bind.value
        isShouldShow(el,isShowConfig)
    }
    const initAddListener =(el,bind) => {
        const isShowConfig = bind.value
        const {offsetWrapTopLevel} = isShowConfig
        let judgeEl = el
        for(let i = 0; i < offsetWrapTopLevel; i++){
            judgeEl = judgeEl.parentNode
        }
        el.src = init.default
        el.offsetWrapTop = judgeEl.offsetTop
        el.selfHeight = el.offsetHeight
        isShouldShow(el,isShowConfig)
    }
    Vue.directive('lazy', {
        inserted: initAddListener,
        // update : addListener,
        componentUpdated : addListener
    })
}