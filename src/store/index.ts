/*
 * @Author: your name
 * @Date: 2020-10-28 10:53:17
 * @LastEditTime: 2020-11-05 15:06:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electronVue\src\store\index.ts
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videoList: [], // 视频列表
    saveDirectoryVideo: '', // 文件下载地址
  },
  mutations: {
    'setVideoList'(state, val){
      state.videoList = val;
    },
    'setSaveDirectoryVideo'(state, val){
      state.saveDirectoryVideo = val;
    },
  },
  actions: {
  },
  modules: {
  },
});
