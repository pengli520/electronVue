<!--
 * @Author: your name
 * @Date: 2020-11-03 17:37:29
 * @LastEditTime: 2020-11-03 18:01:55
 * @LastEditors: Please set LastEditors
 * @Description: 视频合并
 * @FilePath: \electronVue\src\components\dealWith.vue
-->
<template>
    <div class="deal-with">
        <div class="main" id="main">
            <p>视频拖在这里</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DealWith extends Vue {
    mounted() {
        const dragWrapper: any = document.getElementById("main");
        dragWrapper.addEventListener("drop",(e: any)=>{
            e.preventDefault(); //阻止e的默认行为
            const files = e.dataTransfer.files;
            if (files && files.length>=1){
                const path = files[0].path;
                console.log("file:",path, files);
                // const content = fs.readFileSync(path);
            }
        })    
        dragWrapper.addEventListener("dragover",(e: any)=>{
            e.preventDefault();
        })    
    }
}
</script>

<style lang="scss">
.deal-with{
    .main {
        @include wh(200px, 200px, #eee);
    }
}
</style>
