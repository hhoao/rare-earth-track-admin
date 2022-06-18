<template>
  <span>
    <el-button
      type="primary"
      @click="addDialogVisible = true"
    >
      添加用户
    </el-button>
    <el-dialog
      v-model="addDialogVisible"
      title="添加用户"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="70px"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="addForm.username" />
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="addForm.password"
            type="password"
          />
        </el-form-item>

        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="addForm.email" />
        </el-form-item>

        <el-form-item
          label="手机"
          prop="phone"
        >
          <el-input v-model="addForm.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span
          class="dialog-footer"
        >
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addUser"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </span>

</template>

<script setup>
import {inject, reactive, ref} from 'vue';
import {checkEmail, checkMobile} from '@/utils/check';

const getUserList = inject('getUserList')

const addDialogVisible = ref(false)
const addFormRef = ref()
const addForm = reactive({
  username: '',
  password: '',
  email: '',
  phone: '',
})
const addFormRules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 10, message: '用户名的长度在3~10个字符之间', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 15, message: '密码的长度在6~15个字符之间', trigger: 'blur'}
  ],
  email: [
    {required: true, validator: checkEmail, trigger: 'blur'}
  ],
  phone: [
    {required: true, validator: checkMobile, trigger: 'blur'}
  ]
}
const addDialogClosed = () => {
  addFormRef.value.resetFields()
}
const addUser = () => {
  addFormRef.value.validate(valid => {
    if (!valid) {
      return
    }
    let temp = {}
    temp.username = addForm.username
    temp.email = addForm.email
    temp.phone = addForm.phone
    temp.status = false
    temp.roleName = '管理员'
    temp.id = '105'
    addDialogVisible.value = false
    getUserList()
  })
}
defineExpose({
  addDialogVisible,
})
</script>

<style scoped>

</style>
