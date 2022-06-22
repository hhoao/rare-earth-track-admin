<template>
  <div>
    <el-card>
      <query-form ref="queryFormRef" />
      <user-table ref="userTableRef" />
    </el-card>
  </div>
</template>

<script setup>
import {provide, reactive, ref} from 'vue';
import UserTable from './components/UserTable';
import QueryForm from './components/QueryForm'

const queryFormRef = ref()

const userRepository = reactive({
  userList:[],
  getUserList: ()=>{},
  queryParams: {}
})
provide('userRepository', userRepository)


</script>

<style scoped>

</style>
