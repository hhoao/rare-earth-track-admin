const { defineConfig } = require('@vue/cli-service')
const path = require("path");
const resolve = dir => path.join(__dirname, dir)
module.exports = defineConfig({
    publicPath: "/",
  chainWebpack: config => {
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end();
      config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
              symbolId: 'icon-[name]',
          })
          .end();
  },
  /*devServer: {
    proxy: {
      '/': {
        ws: false, // proxy websockets
        target: 'http://192.168.23.125:8080',
        pathRewrite: {
          '^/': '/bpp/'
        },
        cookiePathRewrite: {
          '/bpp': '/'
        }
      }
    }
  },*/
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false
})
