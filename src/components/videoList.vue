<!--
 * @Author: your name
 * @Date: 2020-11-03 16:12:42
 * @LastEditTime: 2020-11-05 15:32:49
 * @LastEditors: Please set LastEditors
 * @Description: 视频展示列表
 * @FilePath: \electronVue\src\components\videoList.vue
-->
<template>
  <div class="video-list">
    <div class="msg">
      <el-radio v-model="allSelect" label="1">全选</el-radio>
      <p>【已加载：{{ videoList.length }} 选择：0】</p>
      <p class="btn" @click="downvideo()">批量下载所选</p>
    </div>

    <div class="main" v-InfiniteScroll="{methods: getVideoList, status: true, allTotal, dataListLen: videoList.length}">
      <div class="list-div" v-for="(item, index) in videoList" :key="index">
        <div class="img">
          <img :src="item.cover" alt="">
        </div>
        <el-tooltip class="item" effect="dark" :content="item.desc" placement="top-start">
          <p class="title">{{ item.desc }}</p>
        </el-tooltip>
        <el-button class="btn" size="mini">下载视频</el-button>
        <el-checkbox v-model="item.select"></el-checkbox>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, namespace, Mutation } from 'vuex-class';
import $store from '@/store/index.ts'
const { ipcRenderer } = window.require('electron')
// 获取视频列表
ipcRenderer.on('BackGetDouYiPlayUrl', (event: any, arg: any) => {
  $store.commit('setVideoList', arg)
  console.log(arg, $store)
})
interface VideoListFace {
  cover: string; // 视频封面
  desc: string; // 标题
  videoUrl: string; // 视频地址
}
@Component
export default class VideoList extends Vue {
  @State((s) => s.videoList) private videoList!: VideoListFace;
  @State((s) => s.saveDirectoryVideo) private saveDirectoryVideo!: string;
  // 是否全选当前记载出来的视频
  allSelect: boolean = false;
  // 总条数
  allTotal: number = 100;
  $db: any;

  // 获取视频列表
  private getVideoList() {
    console.log('获取视频列表')
  }
  // 下载视频
  downvideo() {
    if (!this.saveDirectoryVideo) {
      ipcRenderer.send('ShowSaveDirectory');
    }
  }
}
</script>


<style lang="scss">
.video-list{
    .msg{
        @include flexcenter;
        width: auto;
        height: 30px;
        @include br();
        font-size: 14px;
        color: #666;
        line-height: 30px;
        padding: 10px 0;
        .btn{
            @include br(20px);
            background: $background;
            padding: 0 10px;
            color: #fff;
        }
    }
    .main{
        width: 100%;
        height: 1000px;
        min-width: 756px;
        @include flexstart();
        align-items: flex-start;
        overflow: auto;
        @include scrollBar(4px);
        flex-wrap: wrap;
        .list-div{
            width: 150px;
            height: auto;
            background:#fff;
            @include br();
            overflow: hidden;
            background: #f5f5f5;
            .img{
            width: 150px;
            height: 200px;
            img{
                width: 100%;
            }
            }
            .title{
            color: #666;
            font-size: 14px;
            width: 90%;
            margin: 20px auto;
            @include linesH;
            }
            .btn{
            margin-bottom: 20px;
            margin-right: 10px;
            }
        }
    }
}
</style>
