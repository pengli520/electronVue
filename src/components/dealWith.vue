<!--
 * @Author: your name
 * @Date: 2020-11-03 17:37:29
 * @LastEditTime: 2020-11-05 15:42:01
 * @LastEditors: Please set LastEditors
 * @Description: 视频合并列表
 * @FilePath: \electronVue\src\components\dealWith.vue
-->
<template>
    <div class="deal-with">
        <div class="main" id="main">
            <div class="import-video">视频拖在这里</div>
            <div class="synthetic-video">
                <video class="video" preload controls>
                    <source :src="mergevideo" type='video/mp4'>
                </video>
            </div>
        </div>
        <pl-sort-mode :list="videoUrl"/>
        <!-- :disabled="false || !videoUrl.length" -->
        <el-button type="success" class="btn" @click="videoMerge" >合并视频</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Message } from 'element-ui';
import sortMode from '@/components/sortMode.vue';
import { State, namespace, Mutation } from 'vuex-class';
const { ipcRenderer } = window.require('electron')
const fs = window.require('fs')
interface VideoUrl {
    path: string; // 临时文件路径
    absolutePath: string; // 绝对地址
}
@Component({
    components: {
        'pl-sort-mode': sortMode,
    }
})
export default class DealWith extends Vue {
    @State((s) => s.saveDirectoryVideo) private saveDirectoryVideo!: string;
    // 视频格式
    videoFormat = ['MP4','3GP','AVI','MKV','WMV','MPG','VOB','FLV','SWF','MOV'];
    // 选择的视频路径
    videoUrl: VideoUrl[] = [];
    // 合并好的视频
    mergevideo: string = '';
    // 合成文件名
    fileName: string = `${this.saveDirectoryVideo}/1.txt`;
    mounted() {
        const dragWrapper: any = document.getElementById("main");
        dragWrapper.addEventListener("drop",(e: any)=>{
            e.preventDefault(); //阻止e的默认行为
            const files: any = e.dataTransfer.files;
            if (files && files.length>=1){
                for (const item of files) {
                    const arr = item.path.split('.');
                    const suffix = arr[arr.length - 1].toUpperCase();
                    if (this.videoFormat.includes(suffix)) {
                        this.videoUrl.push({
                            path: window.URL.createObjectURL(item),
                            absolutePath: item.path,
                        })
                    } else {
                        Message({
                            type: 'error',
                            message: '请上传视频文件'
                        });
                    }
                }
            }
        })    
        dragWrapper.addEventListener("dragover",(e: any)=>{
            e.preventDefault();
        })    
    }

    // 合成视频
    videoMerge() {
        this.produceTxt();
        ipcRenderer.send('CmdMergeVideo', this.saveDirectoryVideo);
    }

    // 生成txt
    produceTxt() {
        for (const item of this.videoUrl) {
            let path = `file ${item.path} \n`;
            fs.readFile(this.fileName, 'utf8', (error: string, data: any) => { 
                if (error) {
                    fs.writeFileSync(this.fileName, path, (error: any) => { 
                        if(error) { 
                            console.log('错诶'+error)
                        }
                    })
                } else {
                    fs.appendFile(this.fileName, path, (error: any) => { 
                        if(error) { 
                            console.log(error)
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
.deal-with{
    width: 96%;
    @include ma;
    .main {
        @include flexsb();
        div {
            @include wh(200px, 200px, #eee);
        }
        .import-video{
            width: 200px;
            height: 200px;
            line-height: 200px;
            text-align: center;
        }
        .synthetic-video{
            width: 200px;
            height: 200px;
            overflow: hidden;
            .video{
                width: 100%;
            }
        }
    }
    .btn{
        @include ma;
        margin-top: 20px;
    }
}
</style>
