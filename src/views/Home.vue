<!--
 * @Author: your name
 * @Date: 2020-10-27 09:57:15
 * @LastEditTime: 2020-10-27 15:37:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-electron\src\views\Home.vue
-->
<template>
  <div class="home">
    <el-tabs v-model="activeIndex" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="0">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <pl-option-input
      :list="[]"
      @search="search"
    />
  </div>
</template>

<script lang="ts">
import optionInput from '@/components/optionInput.vue'
import { Component, Prop, Vue } from 'vue-property-decorator';
import downVideo from '@/node/index.js'
console.log(downVideo)
@Component({
  name: 'Home',
  components: {
    'pl-option-input': optionInput
  }
})
export default class OptionInput extends Vue {
  activeIndex: string = '0';
  // 搜索
  search(val: String) {
    console.log(val)
    // new DouYiVideo({userUrl: 'https://v.douyin.com/JPAGUg3/'})
  }

  handleClick(val: any) {
      console.log(val)
  }
}
</script>
