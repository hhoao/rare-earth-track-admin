<template>
  <span>
    <el-dialog
      v-model="setDialogVisible"
      title="data.setForm.title"
      width="50%"
    >
      <el-form v-model="setForm" ref="setRoleFormRef" label-width="70px">
        <el-form-item
          v-for="item in data.setForm.items"
          :key="item.name"
          :label="item.label"
        >
          <template v-if="item.style && item.style.type === 'select'">
            <el-select v-model="setForm[item.name]">
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
              v-model="setForm[item.name]"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
          <template v-else>
            <el-input
              v-model="setForm[item.name]"
            />
          </template>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="setDialogClosed">取 消</el-button>
          <el-button type="primary" @click="handleSetForm()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </span>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({
  data: Object
})

const setFormRef = ref()
const setForm = ref()
const setDialogVisible = ref(false)

const showSetDialog = (listData) => {
  setForm.value = listData
  setDialogVisible.value = true
}
const setDialogClosed = () => {
  setFormRef.value.resetFields()
  setDialogVisible.value = false
}
const handleSetForm = () => {
  props.data.setForm.onSubmit(setForm)
  setDialogVisible.value = false
}

defineExpose({
  showSetDialog
});
</script>

<style scoped>

</style>
