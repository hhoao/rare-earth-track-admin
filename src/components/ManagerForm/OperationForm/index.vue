<template>
  <el-dialog
    :title="data.title"
    v-model="operationDialogVisible"
    @open="init(operationForm)"
    width="50%"
  >
    <template v-if="data.contentType === 'tree' && treeData">
      <el-tree
        ref="operationTree"
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-checked-keys="treeDefaultCheckedKeys"
      />
    </template>
    <template v-else>
      <el-form :model="operationForm" :rules="getFormRules()" ref="FormRef" label-width="80px">
        <el-form-item
          v-for="item in data.items"
          :key="item.name"
          :label="item.label + ': '"
        >
          <template v-if="item.style && item.style.type === 'select'">
            <el-select v-model="operationForm[item.name]">
              <el-option
                v-for="option of item.style.options"
                :key="option.name"
                :label="option.name"
                :value="option.value"
              />
            </el-select>
          </template>
          <template v-else-if="item.style && item.style.type === 'switch'">
            <el-switch
              v-model="operationForm[item.name]"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
          <template v-else>
            <el-input
              v-model="operationForm[item.name]"
              :disabled="item.style ? item.style.isDisable : false"
            />
          </template>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="operationDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOperation(data.handler)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {inject, ref} from 'vue';

const props = defineProps({
  data: Object,
  index: Number,
});

const repository = inject('repository');
//是否现实
const operationDialogVisible = ref(false);
//表单数据
const operationForm = ref({});
const operationTree = ref({});
// 树数据
const treeData = ref(null);
const treeDefaultCheckedKeys = ref([]);
const init = (rowData) => {
  if (props.data.contentType === 'tree') {
    let handleRet = props.data.getTreeHandler(rowData);
    if (handleRet instanceof Promise) {
      handleRet.then((ret) => {
        treeData.value = ret.data;
        treeDefaultCheckedKeys.value = ret.defaultCheckedKeys;
      });
    } else {
      treeData.value = handleRet;
    }
  }
};

//动态表单校验规则
const getFormRules = () => {
  let operationFormRules = {};
  for (let item in props.data.items) {
    if (item.style && item.style.rule) {
      operationFormRules[item.name] = {required: true, validator: item.style.rule.validator, trigger: 'blur'};
    }
  }
  return operationFormRules;
};
const showDialog = (item) => {
  if (item) {
    operationForm.value = item;
  }
  operationDialogVisible.value = true;
};
const handleOperation = (handlerProxy) => {
  let promise;
  if (props.data.contentType === 'tree') {
    let checkedNodes = operationTree.value.getCheckedNodes()
    let rowData = operationForm.value
    promise = handlerProxy({checkedNodes, rowData})
  }else {
    promise = handlerProxy(operationForm.value);
  }

  if (promise && promise instanceof Promise) {
    promise.then(() => {
      if (repository.config.autoRefresh) {
        repository.refreshList();
      }
      operationDialogVisible.value = false;
    });
  } else {
    if (repository.config.autoRefresh) {
      repository.refreshList();
    }
    operationDialogVisible.value = false;
  }

};
defineExpose({
  showDialog,
});
</script>

<style scoped>

</style>
