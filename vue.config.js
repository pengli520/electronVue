/*
 * @Author: your name
 * @Date: 2019-10-31 17:02:17
 * @LastEditTime: 2020-10-28 17:04:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MRStarBurstWeb2\vue.config.js
 */
const webpack = require('webpack')
module.exports = {
    css: {
        sourceMap: false,
        extract: false,
        loaderOptions: {
          sass: {
            data: `@import '@/assets/scss/index.scss';`
          }        
        }
      }
}
