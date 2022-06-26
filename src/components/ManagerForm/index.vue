<template>
  <div class="app-container">
    <template v-if="data.listForm && data.listForm.items">
      <query-form ref="queryFormRef" :data="data.queryForm" />
      <div style="margin-top: 20px">
        <el-card shadow="never">
          <div class="card-header">
            <span>数据列表</span>
            <template v-if="data.addForm && data.addForm.items">
              <el-button
                :type="data.addForm.type ? data.addForm.type : 'default'"
                :size="data.addForm.size ? data.addForm.size : 'default'"
                @click="addFormRef.showDialog()"
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
    <div style="margin-top: 20px">
      <el-pagination
        :current-page="page.pageNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <template v-if="data.addForm && data.addForm.items">
      <operation-form
        ref="addFormRef"
        :data="data.addForm"
      />
    </template>
  </div>
</template>

<script setup>
import {provide, reactive, ref, toRef} from 'vue';
import ListTable from './ListTable';
import QueryForm from './QueryForm';
import OperationForm from './OperationForm'

//初始化熟悉
const props = defineProps({
  items: Array,
  data: Object,
})
const page = reactive({
  total: 0,
  pageNum: 1,
  pageSize: 5,
});

//获取List函数 用来获取表格数据
const data = toRef(props, 'data');
//公用仓库
const repository = reactive({
  //表格数据
  list: [],
  //查询参数
  queryParams: ref({}),
  //刷新list
  refreshList: ()=>{},
  //配置
  config: {
    autoRefresh: true,
  },
})

repository.refreshList=()=>{
  let promise = props.data.listForm.handler({page, queryParams: repository.queryParams});
  if (promise && promise instanceof Promise){
    promise.then((ret)=>{
      repository.list = ret.list
      page.total = ret.page.total
    })
  }
}
repository.refreshList()
provide('repository', repository)

//Ref
const addFormRef = ref(null)
const listTableRef = ref(null)
const queryFormRef = ref(null)

const handleSizeChange = (newSize) => {
  page.pageSize = newSize;
  repository.refreshList();
};
const handleCurrentChange = (newPage) => {
  page.pageNum = newPage;
  repository.refreshList();
};

defineExpose({
  page: page,
  repository
})

</script>

<style scoped>
.app-container {
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
