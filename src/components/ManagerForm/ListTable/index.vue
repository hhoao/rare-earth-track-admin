<template>
  <div>
    <el-table
      :data="repository.list"
      style="margin-top: 20px"
      ref="listTableRef"
      stripe
      border
    >
      <template v-if="data.multiOperations">
        <el-table-column type="selection" width="55" />
      </template>
      <el-table-column
        v-for="(item, index) in data.items"
        :prop="item.name"
        :min-width="100"
        :width="item.width"
        :key="index"
        :label="item.label"
      >
        <template v-if="item.style" #default="scope">
          <template v-if="item.style.type==='image'">
            <el-image :src="scope.row.url">
              <template #placeholder>
                <div class="image-slot">Loading<span class="dot">...</span></div>
              </template>
            </el-image>
          </template>
          <template v-else-if="item.style.type=== 'switch'">
            <el-switch
              :model-value="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleColumnChange(item.handler, scope.row)"
            />
          </template>
          <template v-else-if="item.style.type=== 'svg-icon'">
            <svg-icon
              :icon-class="scope.row[item.style.iconName]"
            />
          </template>
        </template>
      </el-table-column>
      <el-table-column
        v-if="data.operations"
        label="操作"
        :width="(data.operationStyle && data.operationStyle.width) ? data.operationStyle.width : ''"
        align="center"
      >
        <template #default="tableData">
          <el-button
            v-for="(operation, index) in data.operations"
            :key="operation.label"
            :type="operation.type ? operation.type : 'primary'"
            :size="operation.size ? operation.size : 'small'"
            @click="(operation.items || operation.contentType) ? operationRefs[index].showDialog(tableData.row): handleOperation(operation.handler, tableData.row)"
          >{{ operation.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <operation-form
      v-for="(operation, index) in data.operations"
      :ref="el=>{if (el) operationRefs[index] = el}"
      :key="operation.label"
      :data="operation"
    />
    <div style="margin-top: 20px">
      <template v-if="data.multiOperations">
        <el-select v-model="curMultiOperation" placeholder="批量操作">
          <el-option
            v-for="(operation, index) in data.multiOperations"
            :label="operation.label"
            :value="operation"
            :key="index"
          />
        </el-select>
        <el-button @click="handleSelectionRows(curMultiOperation.handler)" style="margin: 10px">确定</el-button>
      </template>
      <!--分页-->
      <div style="float: right">
        <el-pagination
          style="padding-top: 0;"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @update:page-size="handleSizeChange"
          @update:current-page="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {inject, onMounted, reactive, ref, watch} from 'vue';
import OperationForm from '@/components/ManagerForm/OperationForm';
import SvgIcon from '@/components/SvgIcon';
const props= defineProps({
  data: Object,
})

const repository = inject('repository');
const page = reactive({
  total: 0,
  pageNum: 1,
  pageSize: 5,
});
repository.page = page

const handleSizeChange = (newSize) => {
  page.pageSize = newSize;
  repository.refreshList();
};
const handleCurrentChange = (newPage) => {
  page.pageNum = newPage;
  repository.refreshList();
};

const curMultiOperation = ref(null)
const listTableRef = ref(null)
const operationRefs = ref([])
const config = reactive({
  enable: false,
  hasEdit: true,
  hasDelete: true,
  hasSet: true,
  autoRefresh: true,
})
const list = repository.list
const success = repository.success

//刷新数据列表
repository.refreshList=()=>{
  let promise = props.data.handler({page, queryParams: repository.queryParams});
  if (promise && promise instanceof Promise){
    promise.then((ret)=>{
      // console.log(ret)
      repository.list = ret.list
      if (ret.page.total)
        page.total = ret.page.total
    })
  }
}
// 延迟刷新数据()
repository.delayRefreshList = (promise) =>{
  if (promise && promise instanceof Promise) {
    if (repository.config.autoRefresh) {
      promise.then(()=> {
        repository.refreshList()
      })
    }
  }else{
    if (repository.config.autoRefresh){
      repository.refreshList()
    }
  }
}
onMounted(()=>{
  repository.refreshList()
})

const handleSelectionRows = (curMultiOperationHandler) =>{
  let promise = curMultiOperationHandler(listTableRef.value.getSelectionRows())
  repository.delayRefreshList(promise);

}

const handleColumnChange = (handlerProxy, row) => {
  let promise = handlerProxy(row);
  console.log(row)
  repository.delayRefreshList(promise);
};
// 操作处理
const handleOperation = (handlerProxy, rowData) => {
  let promise = handlerProxy(rowData)
  if (promise) {
    promise.then((res)=> {
      if (res.code === 200 && res.message) {
        success(res.message)
        repository.refreshList()
      }
    })
  }else {
    repository.refreshList()
  }
}

defineExpose({
  page,
  config
})

</script>

<style scoped>

</style>
