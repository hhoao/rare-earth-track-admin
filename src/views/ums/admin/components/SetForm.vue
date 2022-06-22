<template>
  <span>
    <el-dialog
      v-model="setRoleDialogVisible"
      title="分配角色"
      width="50%"
    >
      <el-form ref="setRoleFormRef" label-width="70px">
        <el-form-item label="角色">
          <el-select placeholder="userRoleName" v-model="setRoleForm.roleName">
            <el-option
              v-for="role in roles"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="setDialogClosed">取 消</el-button>
          <el-button type="primary" @click="handleSetRoleForm(setRoleForm)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </span>
</template>

<script setup>
import {getRoleIdByRoleName, roles} from '@/api/role';
import {ref, inject} from 'vue';
import {updateUser} from '@/api/user';

const setRoleFormRef = ref()
const setRoleForm = ref()
const setRoleDialogVisible = ref(false)
const userRepository = inject("userRepository")

const showSetRoleDialog = (user) => {
  setRoleForm.value = user
  setRoleDialogVisible.value = true
}
const setDialogClosed = () => {
  setRoleFormRef.value.resetFields()
  setRoleDialogVisible.value = false
}
const handleSetRoleForm = ({id, roleName}) => {
  let roleId = getRoleIdByRoleName(roleName);
  let user = {id, roleId}
  updateUser(user).then(() =>{
    userRepository.getUserList()
  })
  setRoleDialogVisible.value = false
}

defineExpose({
  showSetRoleDialog
});
</script>

<style scoped>

</style>
