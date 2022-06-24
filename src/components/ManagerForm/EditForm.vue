<template>
  <el-dialog
    title="修改用户"
    v-model="editDialogVisible"
    width="50%"
  >
    <el-form :model="editForm" :rules="getEditFormRules()" ref="editFormRef" label-width="70px">
      <el-form-item
        v-for="item in data.baseForm.items"
        :key="item.name"
        :label="item.label"
      >
        <template v-if="item.editStyle && item.editStyle.type === 'select'">
          <el-select v-model="editForm[item.name]">
            <el-option
              v-for="option of item.editStyle.options"
              :key="option.name"
              :label="option.name"
              :value="option.value"
            />
          </el-select>
        </template>
        <template v-else-if="item.editStyle && item.editStyle.type === 'switch'">
          <el-switch
            v-model="editForm[item.name]"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
        <template v-else>
          <el-input
            v-model="editForm[item.name]"
            :disabled="item.editStyle.isDisable"
          />
        </template>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditUserInfo">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {inject, ref} from 'vue';

const props = defineProps({
  data: Object
})

const repository = inject('repository')
const editDialogVisible = ref(false)
const editForm = ref({})
const editFormRef = ref()

//动态表单校验规则
const getEditFormRules = () => {
  let editFormRules = {}
  for (let item in props.data.baseForm.items){
    if (item.editStyle && item.editStyle.rule){
      editFormRules[item.name] = {required: true, validator: item.editStyle.rule.validator, trigger: 'blur'}
    }
  }
  return editFormRules
}
const showEditDialog = (item) => {
  editForm.value = item
  editDialogVisible.value = true
}
const handleEditUserInfo = () => {
  editFormRef.value.validate(valid => {
    if (!valid) {
      return
    }
    repository.updateItem(editForm.value).then(()=>{
      repository.refreshList()
      this.$message.success('更新用户信息成功！')
    })
    editDialogVisible.value = false
  })
}
defineExpose({
  showEditDialog
})
</script>

<style scoped>

</style>
