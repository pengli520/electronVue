<!--
 * @Author: your name
 * @Date: 2020-10-27 13:34:48
 * @LastEditTime: 2020-11-02 16:36:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-electron\src\components\optionInput.vue
-->
<template>
    <div>
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select" @input="changeInput">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option v-for="(item, index) in list" 
                    :key="index" 
                    :label="item.label" 
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button @click="search" slot="append" icon="el-icon-search" :disabled="!inputStatus" :class="{'el-icon-search-gray': inputStatus}"></el-button>
        </el-input>
    </div>
</template>  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class OptionInput extends Vue {

    @Prop({default: ''})
    private select!: string;

    @Prop({default: () =>  ([{label: 'test',value: 1}])})
    private list!: object[]

    private input: string = 'https://v.douyin.com/JPU6cfJ/';
    private inputStatus = false;
    private changeInput() {
        if (this.input.trim() === '') {
            this.inputStatus = false;
        } else {
            this.inputStatus = true;
        }
    }
    // 搜索用户
    private search() {
        this.$emit('search', this.input)
    }
}
</script>
<style lang="css">
    .el-icon-search-gray{
        color: greenyellow;
    }
</style>