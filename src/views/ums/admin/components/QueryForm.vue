<template>
  <el-input
    v-model="query"
    placeholder="请输入内容"
    clearable
    @clear="getUserList.value"
  >
    <el-button
      icon="el-icon-search"
      @click="getUserList.value"
    />
  </el-input>
</template>

<script setup>
import {inject, ref} from 'vue';

const query = ref("")
const getUserList = inject("getUserList")
defineExpose({
  query
})
</script>

<style scoped>

</style>
