<template>
  <div>
    <el-card>
      <template v-if="props.items">
        <query-form ref="queryFormRef" :items="items" />
        <list-table
          ref="listTableRef"
          :items="items"
          :deleteItem="props.deleteItem"
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
import {provide, reactive, ref, toRef, toRefs, watch} from 'vue';
import ListTable from './ListTable';
import QueryForm from './QueryForm';

//初始化熟悉
const props = defineProps({
  items: Array,
  getList: Function,
  updateItem: Function,
  deleteItem: Function
})
const page = reactive({
  total: 0,
  pageNum: 1,
  pageSize: 5,
});

//配置项
const config = reactive({
  enable: false,
})
//需要展示的熟悉
const showItems = ref()
//获取List函数 用来获取表格数据
const getList = toRef(props, 'getList')
//需要查询的项目
const queryItems = ref()
//查询参数
const queryParams = ref({})
const refreshList = ref()
//公用仓库
const repository = reactive({
  list: [],
  getList: ()=>{},
  queryParams,
  refreshList,
  updateItem: toRef(props, 'updateItem'),
  deleteItem: toRef(props, 'deleteItem'),
})

repository.queryParams = queryParams
refreshList.value=()=>{
  if (getList.value != null) {
    getList.value()
  }
}

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

//enable发生变化时自动获取数据
watch(()=>props.getList, ()=>{
  if (getList.value){
    refreshList.value()
  }
})


defineExpose({
  page: page,
  config,
  showItems,
  queryItems,
  queryParams,
  repository
})

</script>

<style scoped>

</style>
