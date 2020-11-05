<!--
 * @Author: your name
 * @Date: 2020-10-27 09:57:15
 * @LastEditTime: 2020-11-05 15:22:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-electron\src\views\Home.vue
-->
<template>
  <div class="home">
    <el-tabs v-model="activeIndex" @tab-click="handleClick">
        <el-tab-pane label="抖音批量解析" name="0">
          <pl-option-input :list="[]" @search="search"/>
          <pl-video-list/>
        </el-tab-pane>
        <el-tab-pane label="视频编辑" name="1">
          <pl-deal-with/>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import optionInput from '@/components/optionInput.vue'
import { Component, Prop, Vue } from 'vue-property-decorator';
import videoList from '@/components/videoList.vue';
import { Loading } from 'element-ui';
import dealWith from '@/components/dealWith.vue';
import db from '@/nodeModule/db.ts';
import store from '@/store/index.ts';
// Loading.service({ fullscreen: true });
const { ipcRenderer } = window.require('electron')
ipcRenderer.on('getProcessPath', (event: any, arg: any) => {
  console.log(arg)
})


// 视频下载目录
ipcRenderer.on('BackShowSaveDirectory', (event: any, arg: any) => {
  db.insert({videoSaveDirectory: arg}).then((res: any) => {
    store.commit('setSaveDirectoryVideo',res);
    console.log(res);
  });
  
})


@Component({
  name: 'Home',
  components: {
    'pl-option-input': optionInput,
    'pl-video-list': videoList,
    'pl-deal-with': dealWith,
  }
})
export default class OptionInput extends Vue {
  // 导航下标
  activeIndex: string = '1';

  // 搜索
  search(val: String) {
    ipcRenderer.send('GetDouYiPlayUrl', val);
  }

  handleClick(val: any) {
      // console.log(val)
  }

}
</script>

<style lang="scss">


</style>
