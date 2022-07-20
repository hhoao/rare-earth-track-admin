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
      <el-form :model="operationForm" :rules="getFormRules()" ref="operationFormRef" label-width="80px">
        <el-form-item
          v-for="item in data.items"
          :prop="item.name"
          :key="item.name"
          :label="item.label + ': '"
        >
          <template
            v-if="item.style && item.style.type === 'file'">
            <el-upload
              class="upload-demo"
              :drag="item.style.drag ? item.style.drag : false"
              :action="item.style.action"
              :on-change="item.style.onChangeHandler"
              :headers="item.style.headers"
              :multiple="item.style.multiple ? item.style.multiple : false"
              :auto-upload="item.style.autoUpload ? item.style.autoUpload : true"
              :accept="item.style.accept"
              :show-file-list="item.style.showFileList ? item.style.showFileList : true"
              :with-credentials="item.style.withCredentials ? item.style.withCredentials : false"
              :data="item.style.data"
              :list-type="item.style.listType ? item.style.listType : 'text' "
              :method="item.style.method ? item.style.method : 'post'"
              :name="item.style.name ? item.style.name : 'file'"
              :limit="item.style.limit"
              :http-request="item.style.httpRequest"
              :disable="item.style.disable ? item.style.disable: false"
            >
              <svg-icon icon-class="cloud-upload" style="width: auto; height: auto" />
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
              <template v-if="item.style.upLoadButton">
                <el-button :type="item.style.upLoadButton.type">{{ item.style.upLoadButton.content }}</el-button>
              </template>
              <template v-if="item.style.tip" #tip>
                <div class="el-upload__tip">
                  {{ item.style.tip }}
                </div>
              </template>
            </el-upload>
          </template>
          <template v-else-if="item.style && item.style.type === 'select'">
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
import SvgIcon from '@/components/SvgIcon';

const props = defineProps({
  data: Object,
  index: Number,
});
//仓库
const repository = inject('repository');
//是否显示
const operationDialogVisible = ref(false);
//表单数据
const operationForm = ref({});
const formData = ref({});
const operationTree = ref({});
const operationFormRef = ref(null);
// 树数据
const treeData = ref(null);
const treeDefaultCheckedKeys = ref([]);
const fileList = ref([]);

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
  for (let item of props.data.items) {
    if (item.style && item.style.rule) {
      operationFormRules[item.name] = [{
        required: true,
        validator: item.style.rule.validator,
        trigger: 'blur',
      }];
    }
  }
  return operationFormRules;
};
//展示对话框
const showDialog = (item) => {
  if (item) {
    //浅拷贝
    operationForm.value = {...item};
  }
  operationDialogVisible.value = true;
};
//处理操作
const handleOperation = (handlerProxy) => {
  let promise;
  let isValid;
  if (handlerProxy) {
    if (fileList.value.length !== 0) {
      operationForm.value.fileList = fileList;
    }
    if (props.data.contentType === 'tree') {
      let checkedNodes = operationTree.value.getCheckedNodes();
      let rowData = operationForm.value;
      promise = handlerProxy({checkedNodes, rowData});
    } else {
      operationFormRef.value.validate(valid => {
        if (valid) {
          isValid = valid
          promise = handlerProxy(operationForm.value);
        }
      })
    }
  }
  if (!isValid){
    return;
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
