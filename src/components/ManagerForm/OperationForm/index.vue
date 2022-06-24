<template>
  <el-dialog
    :title="data.title"
    v-model="operationDialogVisible"
    width="50%"
  >
    <el-form :model="operationForm" :rules="getFormRules()" ref="FormRef" label-width="70px">
      <el-form-item
        v-for="item in data.items"
        :key="item.name"
        :label="item.label"
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
            :disabled="item.style.isDisable"
          />
        </template>
      </el-form-item>
    </el-form>
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
  operationForm.value = item;
  operationDialogVisible.value = true;
};
const handleOperation = (handlerProxy) => {
  //判断是否需要后续操作
  let promise = handlerProxy(operationForm.value);
  if (promise && promise instanceof Promise) {
    promise.then(() => {
      if (repository.config.autoRefresh) {
        repository.refreshList();
      }
      operationDialogVisible.value = false;
    });
  }else{
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
