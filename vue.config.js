const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave:false,
    devServer:{
        port:5000,
        open:true,
        proxy:{
            '/api':{
                target:'https://m.you.163.com',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/4000':{
              target:'http://localhost:4000',
              ws: false,
              changeOrigin: true,
              pathRewrite: {
                  '^/4000': ''
              }
          }
        },
    },
    configureWebpack:{
        resolve: {
            alias: {
                'components': resolve('src/components'),
                'pages': resolve('src/pages'),
                'http':resolve('src/http'),
                'store':resolve('src/store')
            }
        }
    },
    css: {
        loaderOptions: {
          postcss: {
            plugins: [
              require('postcss-plugin-px2rem')({
                rootValue:37.5,      // 新版本的是这个值
                mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
              }),
            ]
          }
        }
      },
}