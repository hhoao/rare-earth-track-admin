<!-- 后台管理界面的用户管理 -->
<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="roleName"></el-table-column>
        <el-table-column label="状态" prop="state">
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="showEditDialog(scope.row.id)"></el-button>
            <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click.native.prevent="deleteUser(scope.$index)"
            ></el-button>
            <el-tooltip
                effect="dark"
                content="分配角色"
                placement="top"
                :enterable="false">
              <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="small"
                  @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
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
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="addForm.userName"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" type="password"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
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
            <el-input v-model="editForm.userName" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
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
import {reactive, ref} from "vue";

const usersArray = reactive([
  {
    id: '100',
    userName: '张三',
    email: '123@qq.com',
    mobile: '13711111111',
    roleName: '超级管理员',
    state: true
  },
  {
    id: '101',
    userName: '李四',
    email: '1234@qq.com',
    mobile: '13721111111',
    roleName: '管理员',
    state: false
  },
  {
    id: '102',
    userName: '王五',
    email: '12345@qq.com',
    mobile: '13731111111',
    roleName: '普通员工',
    state: false
  },
  {
    id: '103',
    userName: '赵六',
    email: '321@qq.com',
    mobile: '13741111111',
    roleName: '管理员',
    state: true
  },
  {
    id: '104',
    userName: '孙七',
    email: '231@qq.com',
    mobile: '13751111111',
    roleName: '员工',
    state: false
  }
])
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
// 查询信息
const queryInfo = reactive({
  // 搜索关键词
  query: '',
  // 当前页数
  pageNum: 1,
  // 当前每页显示的条数
  pageSize: 10
})
// 用户数据
const userData = reactive({
  pageNum: 1,           // 当前页数
  users: usersArray,    // 用户数组
})
// 所有用户列表数据 数组
const userList = ref([])
// 用户数
const total = ref(0)
// 所有角色的数据列表
const roleList = ref(['超级管理员', '管理员', '测试角色', '领导', '员工'])
// 需要被分配角色的用户信息
const userInfo = ref({})
// 控制添加用户对话框的显示与隐藏
const addDialogVisible = ref(false)
const editDialogVisible = ref(false)
const editForm = ref({})
const setRoleDialogVisible = ref(false)
//已经获取到的用户id
const selectedRoleId = ref('')
//修改表单引用
const editFormRef = ref()
const addFormRef = ref()

// 添加用户的表单数据
const addForm = reactive({
  userName: '',
  password: '',
  email: '',
  mobile: '',
})
// 添加用户表单的验证规则对象
const addFormRules = reactive({
  userName: [
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
  mobile: [
    {required: true, validator: checkMobile, trigger: 'blur'}
  ]
})

const editFormRules = reactive({
  email: [
    {required: true, validator: checkEmail, trigger: 'blur'}
  ],
  mobile: [
    {required: true, validator: checkMobile, trigger: 'blur'}
  ]
})

const getPageData = (currentPage, data) => {
  let result = []
  let temp
  if (data === undefined) {
    temp = userData.users
  } else {
    temp = data
  }
  if (currentPage * queryInfo.pageSize > temp.length) {
    for (let i = (currentPage - 1) * queryInfo.pageSize; i < temp.length; i++) {
      result.push(userData.users[i])
    }
  } else {
    for (let i = (currentPage - 1) * queryInfo.pageSize; i < currentPage * queryInfo.pageSize; i++) {
      result.push(userData.users[i])
    }
  }
  return result
}
const getUserList = () => {
  // 判断是否在查询
  if (queryInfo.query === '') {
    // 按分页查询数据
    userList.value = getPageData(queryInfo.pageNum)
    total.value = userList.value.length
  } else {
    let tempData = userData.users.filter(item => {
      return item.userName.includes(queryInfo.query)
    })
    userList.value = getPageData(queryInfo.pageNum, tempData)
    total.value = userList.value.length
  }
}
getUserList();
// 监听 pageSize 改变的事件
const handleSizeChange = (newSize) => {
  // console.log(newSize)
  queryInfo.pagesize = newSize
  getUserList()
}
// 监听 页码值 改变的事件
const handleCurrentChange = (newPage) => {
  // console.log(newPage)
  queryInfo.pagenum = newPage
  getUserList()
}

// 监听 添加用户 对话框的关闭事件
const addDialogClosed = () => {
  // 每次关闭完都重置一下表单
  addFormRef.resetFields()
}

// 点击按钮、添加新用户
const addUser = () => {
  addFormRef.validate(valid => {
    if (!valid) {
      return
    }
    // 校验通过，将表单内容加入到数组中
    let temp = {}    // 创建一个临时 表单数据 对象
    temp.userName = addForm.userName
    temp.email = addForm.email
    temp.mobile = addForm.mobile
    temp.state = false
    temp.roleName = '管理员'
    temp.id = '105'
    userData.users.push(temp)
    addDialogVisible.value = false
    getUserList()

  })
}
// 展示编辑用户 的对话框
const showEditDialog = (id) => {
  let temp = []    // 临时数组 存放的是用户数据对象
  temp = userList.value.filter(item => {
    return item.id.includes(id)
  })
  editForm.value = temp[0]
  editDialogVisible.value = true
}
// 修改用户信息并提交
const editUserInfo = () => {
  editFormRef.validate(valid => {
    if (!valid) {
      return
    }

    editDialogVisible.value = false
    getUserList()
    this.$message.success('更新用户信息成功！')
  })
}

const deleteUser = (index) => {
  userData.users.splice(index, 1)
  getUserList()
}
const setRole = (userInfo) => {
}
</script>

<style scoped>

</style>