<template>
  <div class="app-container">
    <template v-if="data.listForm && data.listForm.items">
      <query-form ref="queryFormRef" :data="data.queryForm" />
      <div style="margin-top: 20px">
        <el-card shadow="never">
          <div class="card-header">
            <svg-icon icon-class="list" />
            <span style="margin-left: 5px">数据列表</span>
            <template v-if="data.addForm && data.addForm.items">
              <el-button
                :type="data.addForm.buttonType ? data.addForm.buttonType : 'default'"
                :size="data.addForm.size ? data.addForm.size : 'default'"
                @click="addFormRef.showDialog()"
                style="float: right;margin-right: 15px"
              > 添加
              </el-button>
            </template>
          </div>
        </el-card>
      </div>
      <list-table
        style="margin-top: 20px"
        ref="listTableRef"
        :data="data.listForm"
      />
    </template>

    <template v-if="data.addForm && data.addForm.items">
      <operation-form
        ref="addFormRef"
        :data="data.addForm"
      />
    </template>
  </div>
</template>

<script setup>
import {onMounted, provide, reactive, ref, toRef} from 'vue';
import ListTable from './ListTable';
import QueryForm from './QueryForm';
import OperationForm from './OperationForm'
import SvgIcon from '@/components/SvgIcon';
import {ElMessage} from 'element-plus';

//初始化熟悉
const props = defineProps({
  items: Array,
  data: Object,
})

//获取List函数 用来获取表格数据
const data = toRef(props, 'data');
//公用仓库
const repository = reactive({
  page: {},
  // 表格数据
  list: [],
  // 查询参数
  queryParams: ref({}),
  // 操作成功提示
  success: (message) => ElMessage({
    message: `${message}`,
    type: 'success',
    duration: 3 * 1000
  }),
  // 刷新list
  refreshList: ()=>{},
  // 延迟刷新表单
  delayRefreshList: ()=>{},
  // 配置
  config: {
    autoRefresh: true,
  },
})


provide('repository', repository)

//Ref
const addFormRef = ref(null)
const listTableRef = ref(null)
const queryFormRef = ref(null)

onMounted(()=>{
  if (listTableRef.value){
    repository.page = listTableRef.value.page
  }
})

defineExpose({
  repository
})

</script>

<style scoped>
.app-container {
  padding: 20px;
}

</style>
