<template>
  <el-card class="filter-container" shadow="never">
    <div>
      <i class="el-icon-search"></i>
      <span>筛选搜索</span>
      <el-button
        style="float: right"
        @click="handleSearchList()"
        type="primary"
      >
        查询结果
      </el-button>
      <el-button
        style="float: right;margin-right: 15px"
        @click="handleResetSearch"
      >
        重置
      </el-button>
    </div>
    <div>
      <el-form
        style="margin-top: 15px"
        :inline="true"
        label-width="140px"
        :model="queryParams"
        ref="formRef"
      >
        <el-form-item label="姓名:">
          <el-input
            v-model="queryParams.name"
            placeholder="姓名"
            clearable
            @clear="userRepository.getUserList"
          />
        </el-form-item>
        <el-form-item label="id号:">
          <el-input
            v-model="queryParams.id"
            placeholder="id"
            clearable
            @clear="userRepository.getUserList"
          />
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="queryParams.roleId">
            <el-option
              v-for="role in roles"
              :key="role.id"
              :value="role.id"
              :label="role.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input
            v-model="queryParams.email"
            placeholder="email"
            clearable
            @clear="userRepository.getUserList"
          />
        </el-form-item>
        <el-form-item label="电话:">
          <el-input
            v-model="queryParams.phone"
            placeholder="phone"
            clearable
            @clear="userRepository.getUserList"
          />
        </el-form-item>
        <el-form-item label="是否启用:">
          <el-select v-model="queryParams.status">
            <el-option
              v-for="status of allStatus"
              :key="status.value"
              :label="status.name"
              :value="status.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup>
import {inject, ref} from 'vue';
import {roles} from '@/api/role';
import {allStatus} from '@/api/user';

const queryParams = ref({
  id: null,
  name: null,
  roleId: null,
  email: null,
  phone: null,
  status: null,
})

const formRef = ref()
const userRepository = inject("userRepository")
userRepository.queryParams = queryParams

const handleSearchList = () => {
  userRepository.getUserList()
}
const handleResetSearch = () => {
  queryParams.value = {}
  userRepository.getUserList()
}
</script>
<style scoped>

</style>
