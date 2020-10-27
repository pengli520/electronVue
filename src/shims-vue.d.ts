/*
 * @Author: your name
 * @Date: 2020-10-27 09:57:15
 * @LastEditTime: 2020-10-27 11:07:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-electron\src\shims-vue.d.ts
 */
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
declare module 'electron-devtools-installer';