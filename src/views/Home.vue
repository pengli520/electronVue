<!--
 * @Author: your name
 * @Date: 2020-10-27 09:57:15
 * @LastEditTime: 2020-11-02 17:58:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-electron\src\views\Home.vue
-->
<template>
  <div class="home">
    <el-tabs v-model="activeIndex" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="0">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    </el-tabs>
    <pl-option-input
      :list="[]"
      @search="search"
    />
    <el-button @click="getPath"> 55</el-button>
    <div class="main">
      <div class="list-div">
        <img src="" alt="">
        <p></p>
        <el-button @click="getPath">下载视频</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import optionInput from '@/components/optionInput.vue'
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Loading } from 'element-ui';
// Loading.service({ fullscreen: true });
const { ipcRenderer } = window.require('electron')
ipcRenderer.on('getProcessPath', (event: any, arg: any) => {
  console.log(arg)
})

// 获取视频列表
ipcRenderer.on('BackGetDouYiPlayUrl', (event: any, arg: any) => {
  console.log(arg, window, this)
})

@Component({
  name: 'Home',
  components: {
    'pl-option-input': optionInput
  }
})
export default class OptionInput extends Vue {
  videoInfo = [];
  activeIndex: string = '0';
  // 搜索
  search(val: String) {
    ipcRenderer.send('GetDouYiPlayUrl', val);
  }

  handleClick(val: any) {
      console.log(val)
  }

  getPath() {
    ipcRenderer.send('getProcessPath')
  }
}
</script>

<style lang="scss">
.main{
  .list-div{
    width: 200px;
    height: auto;
    background: greenyellow;
    @include br();
  }
}
</style>
