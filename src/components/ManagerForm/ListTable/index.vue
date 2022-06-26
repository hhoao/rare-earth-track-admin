<template>
  <div>
    <el-table
      :data="repository.list"
      style="margin-top: 20px"
      stripe
      border
    >
      <el-table-column
        v-for="item in data.items"
        :prop="item.name"
        :key="item.name"
        :label="item.label"
      >
        <template v-if="item.style" #default="scope">
          <template v-if="item.style.type=== 'switch'">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleColumnChange(item.handler, scope.row)"
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
            @click="operation.items ? operationRefs[index].showDialog(tableData.row): handleOperation(operation.handler, tableData.row)"
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
  </div>
</template>

<script setup>
//
import {inject, reactive, ref} from 'vue';
import OperationForm from '@/components/ManagerForm/OperationForm';

const props= defineProps({
  data: Object,
})

const operationRefs = ref([])
const config = reactive({
  enable: false,
  hasEdit: true,
  hasDelete: true,
  hasSet: true,
  autoRefresh: true,
})

const repository = inject('repository');
const list = repository.list

const handleColumnChange = (handlerProxy, row) => {
  let promise = handlerProxy(row);
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
};

const handleOperation = (handlerProxy, rowData) => {
  let promise = handlerProxy(rowData)
  if (promise && promise instanceof Promise) {
    promise.then(()=> {
      if (repository.config.autoRefresh) {
        repository.refreshList()
      }
    })
  }else{
    if (repository.config.autoRefresh){
      repository.refreshList()
    }
  }
}

defineExpose({
  config
})


</script>

<style scoped>

</style>
