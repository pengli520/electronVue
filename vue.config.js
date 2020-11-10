/*
 * @Author: your name
 * @Date: 2019-10-31 17:02:17
 * @LastEditTime: 2020-11-09 09:58:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MRStarBurstWeb2\vue.config.js
 */
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