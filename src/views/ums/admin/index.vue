<!-- 后台管理界面的用户管理 -->
<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="page.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="角色" prop="roleName"></el-table-column>
        <el-table-column label="是否启用" prop="status">
          <template #default="scope">
            <el-switch
                @change="handleStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="244px">
          <template v-slot="scope">
            <el-button
                type="primary"
                size="small"
                @click="showEditDialog(scope.row.id)">
              编辑
            </el-button>
            <el-button
                type="danger"
                size="small"
                @click.native.prevent="deleteUser(scope.$index)"
            >
              删除用户
            </el-button>

            <el-button
                type="warning"
                size="small"
                @click="setRole(scope.row)">
              分配角色
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
      </el-pagination>
      <el-dialog
          title="添加用户"
          width="50%"
          v-model="addDialogVisible"
          @close="addDialogClosed"
      >
        <el-form
            :model="addForm"
            :rules="addFormRules"
            ref="addFormRef"
            label-width="70px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" type="password"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
          title="修改用户"
          v-model="editDialogVisible"
          width="50%"
      >
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>


    </el-card>
  </div>
</template>

<script setup>
import {reactive, ref, toRefs} from "vue";
import {getUserAuths, list, updateUser} from "@/api/user";
import {getRoleNameByRoleId} from "/src/api/role";

// page
const userList = ref([])
const page = reactive({
  total: 0,
  pageNum: 1,
  pageSize: 5,
  pageCount: 0,
})
const handleSizeChange = (newSize) => {
  page.pageSize = newSize
  getUserList()
}
const handleCurrentChange = (newPage) => {
  page.pageNum = newPage
  getUserList()
}

const handleStatusChange = (index, row) =>{
  let newUser = {
    id: row.id,
    status: row.status
  }
  updateUser(newUser)
}
// rules
const checkEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else {
    const regEmail = /^([a-zA-Z\d_-])+@([a-zA-Z\d])+(\.[a-zA-Z\d_-])+/
    if (regEmail.test(value)) {
      callback()
    }
    callback(new Error('请输入合法的邮箱'))
  }
}
const checkMobile = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else {
    const regMobile = /^(0|86|17951)?(13\d|15[0-3,5-9]|17[678]|18\d)\d{8}$/
    if (regMobile.test(value)) {
      callback()
    }
    callback(new Error('请输入合法的手机号'))
  }
}
const addFormRules = reactive({
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
})

const editFormRules = reactive({
  email: [
    {required: true, validator: checkEmail, trigger: 'blur'}
  ],
  phone: [
    {required: true, validator: checkMobile, trigger: 'blur'}
  ]
})

const getUserList = (isInit) => {
  list(page.pageNum, page.pageSize).then((userResponse) => {
    if (isInit) {
      page.total = userResponse.data.total
      page.pageNum = userResponse.data.pageNum
    }
    userList.value = []
    for (let i = 0; i < userResponse.data.list.length; i++) {
      let user = userResponse.data.list[i]
      getUserAuths(user.id).then((authResponse) => {
        user.roleName = getRoleNameByRoleId(user.roleId)
        user.phone = authResponse.data.phone
        user.email = authResponse.data.email
        user.username = authResponse.data.username
        userList.value[i] = user
      })
    }
  })
}
getUserList(true)



// addForm
const addDialogVisible = ref(false)
const addFormRef = ref()
const addForm = reactive({
  username: '',
  password: '',
  email: '',
  phone: '',
})
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
// Edit
const editDialogVisible = ref(false)
const editForm = ref({})
const editFormRef = ref()
const showEditDialog = (id) => {
  for (let user in userList){
    if (user.id === id){
      editForm.value = user
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


// delete User
const deleteUser = (index) => {
  getUserList()
}

// set
const setRoleDialogVisible = ref(false)
const setRole = (userInfo) => {
}

</script>

<style scoped>

</style>