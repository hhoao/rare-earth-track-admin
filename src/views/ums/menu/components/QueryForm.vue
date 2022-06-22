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
        <el-form-item
          v-for="item in items"
          :label="item.label + ':'"
          :key="item.name"
          clearable
        >
          <template v-if="item.queryStyle && item.queryStyle.type==='select'">
            <el-select v-model="queryParams[item.name]">
              <el-option
                v-for="option of item.queryStyle.options"
                :key="option.name"
                :label="option.name"
                :value="option.value"
              />
            </el-select>
          </template>
          <template v-else-if="item.queryStyle && item.queryStyle.type === 'switch'">
            <el-switch
              v-model="queryParams[item.name]"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
          <template v-else>
            <el-input
              v-model="queryParams[item.name]"
              :placeholder="item.placeholder"
              clearable
            />
          </template>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup>
import {inject, ref} from 'vue';

defineProps({
  items: Array
})

const formRef = ref()
const queryParams = ref({})
const repository = inject("repository")


const handleSearchList = () => {
  repository.queryParams = queryParams
  repository.refreshList()
}
const handleResetSearch = () => {
  queryParams.value = {}
  repository.refreshList()
}
</script>
<style scoped>

</style>
