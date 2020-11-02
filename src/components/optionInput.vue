<!--
 * @Author: your name
 * @Date: 2020-10-27 13:34:48
 * @LastEditTime: 2020-10-27 15:09:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-electron\src\components\optionInput.vue
-->
<template>
    <div>
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option v-for="(item, index) in list" 
                    :key="index" 
                    :label="item.label" 
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
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

    private input: string = '';

    // 搜索用户
    private search() {
        this.$emit('search', this.input)
    }
}
</script>
<style lang="scss">

</style>