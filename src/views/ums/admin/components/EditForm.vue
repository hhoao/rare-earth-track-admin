<template>
  <el-dialog
    title="修改用户"
    v-model="editDialogVisible"
    width="50%"
  >
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="editForm.phone" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {inject, ref} from 'vue';
import {updateUser} from '/src/api/user';
import {checkEmail, checkMobile} from '@/utils/check';


const getUserList = inject('getUserList')
const userList = inject('userList')
const editDialogVisible = ref(false)
const editForm = ref({})
const editFormRef = ref()
const editFormRules = {
  email: [
    {required: true, validator: checkEmail, trigger: 'blur'}
  ],
  phone: [
    {required: true, validator: checkMobile, trigger: 'blur'}
  ]
}

const showEditDialog = (id) => {
  for (let user of userList.value){
    if (user.id === id){
      editForm.value = user
      console.log(editForm.value)
      break;
    }
  }
  editDialogVisible.value = true
}
const editUserInfo = () => {
  editFormRef.value.validate(valid => {
    if (!valid) {
      return
    }
    updateUser(editForm.value)
    editDialogVisible.value = false
    getUserList()
    this.$message.success('更新用户信息成功！')
  })
}
defineExpose({
  showEditDialog
})
</script>

<style scoped>

</style>
