<template>
  <div>
    <el-card>
      <template v-if="data.listForm && data.listForm.items">
        <query-form ref="queryFormRef" :data="data.queryForm" />
        <list-table
          ref="listTableRef"
          :data="data.listForm"
        />
      </template>
      <div>
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
    </el-card>
  </div>
</template>

<script setup>
import {provide, reactive, ref, toRef} from 'vue';
import ListTable from './ListTable';
import QueryForm from './QueryForm';

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
const queryParams = ref({})
//公用仓库
const repository = reactive({
  //表格数据
  list: [],
  //查询参数
  queryParams: [],
  //刷新list
  refreshList: ()=>{},
  //配置
  config: {
    autoRefresh: true,
  },
})

repository.refreshList=()=>{
  let promise = props.data.listForm.handler({page, queryParams});
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
const listTableRef = ref()
const queryFormRef = ref()

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
  queryParams,
  repository
})

</script>

<style scoped>

</style>
