const Home = () => import('pages/wangyi_home/wangyi_home')
const IndexCategory = () => import('pages/wangyi_indexCategory/wangyi_indexCategory')
const Category = () => import('pages/wangyi_category/wangyi_category')
const CategoryList = () => import('pages/wangyi_category_list/wangyi_category_list')
const WorthBuying = () => import('pages/wangyi_worthBuying/wangyi_worthBuying')
const Cart = () => import('pages/wangyi_cart/wangyi_cart')
const Personal = () => import('pages/wangyi_personal/wangyi_personal')
const Login = () => import('pages/wangyi_login/wangyi_login')

// const ShopDetail = () => import('pages/wangyi_shop_detail/wangyi_shop_detail')
import ShopDetail from 'pages/wangyi_shop_detail/wangyi_shop_detail'
const routes = [
    {path:'/home',component:Home,meta:{showFooter:true},
        children:[
            {
                path:'indexCategory/:id',
                component:IndexCategory,
                props:true
            }
        ]
    },
    {path:'/category',component:Category,meta:{showFooter:true},redirect:'/category/categoryList/11',
        children:[
            {
                path:'categoryList/:id',
                component:CategoryList,
                props:true
            },
        ],
    },
    {path:'/worthBuying',component:WorthBuying,meta:{showFooter:true}},
    {path:'/cart',component:Cart,meta:{showFooter:true}},
    {path:'/personal',component:Personal,meta:{showFooter:true}},
    {path:'/login',component:Login,meta:{showFooter:false}},
    {path:'/shopDetail/:id',component:ShopDetail,meta:{shoFooter:false}},
    {path:'/',redirect:'/home'}
]

export default routes