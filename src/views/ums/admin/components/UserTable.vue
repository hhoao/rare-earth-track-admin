<template>
  <div>
    <el-table
      :data="userList.value"
      stripe
      border
    >
      <el-table-column
        type="index"
        label="#"
      />
      <el-table-column
        label="姓名"
        prop="username"
      />
      <el-table-column
        label="邮箱"
        prop="email"
      />
      <el-table-column
        label="电话"
        prop="phone"
      />
      <el-table-column
        label="角色"
        prop="roleName"
      />
      <el-table-column
        label="是否启用"
        prop="status"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="244px"
      >
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="editFormRef.showEditDialog(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteUser(scope.$index)"
          >
            删除用户
          </el-button>

          <el-button
            type="warning"
            size="small"
            @click="setRole(scope.row)"
          >
            分配角色
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-form ref="editFormRef" />
    <div>
      <el-pagination
        :current-page="page.pageNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import {getUserAuths, list, updateUser} from '@/api/user';
import {getRoleNameByRoleId} from '@/api/role';
import {inject, reactive, ref} from 'vue';
import EditForm from './EditForm';

const userList = inject("userList")
const getUserList = inject("getUserList")
const editFormRef = ref()
const page = reactive({
  query: '',
  total: 0,
  pageNum: 1,
  pageSize: 5,
  pageCount: 0,
})

const handleStatusChange = (index, row) =>{
  let newUser = {
    id: row.id,
    status: row.status
  }
  updateUser(newUser)
}

getUserList.value = (init ) => {
  userList.value = []

  list(page.pageNum, page.pageSize).then((userResponse) => {
    if (init){
      page.total =userResponse.data.total
      page.pageSize = userResponse.data.pageSize
    }
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
getUserList.value(true)

const handleSizeChange = (newSize) => {
  page.pageSize = newSize
  getUserList.value()
}
const handleCurrentChange = (newPage) => {
  page.pageNum = newPage
  getUserList.value()
}


</script>

<style scoped>

</style>
