/*
 * @Author: your name
 * @Date: 2020-10-28 15:18:37
 * @LastEditTime: 2020-11-12 10:08:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \electronVue\vue.config.js
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
  },
}