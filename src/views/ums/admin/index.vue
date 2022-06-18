<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <query-form ref="queryFormRef" />
        </el-col>
        <el-col :span="4">
          <add-form />
        </el-col>
      </el-row>
      <user-table ref="userTableRef" :userList="userList" :getUserList="userList" />
    </el-card>
  </div>
</template>

<script setup>
import {provide, reactive, ref} from 'vue';
import UserTable from './components/UserTable';
import AddForm from './components/AddForm';
import QueryForm from './components/QueryForm'

const queryFormRef = ref()
const userList = reactive({value: []})
const getUserList = reactive({value: ()=>{}})
provide('userList', userList)
provide('getUserList', getUserList)


</script>

<style scoped>

</style>
