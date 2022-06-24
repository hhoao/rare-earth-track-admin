<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {getRoleNameByRoleId} from '@/api/role';
import {deleteUser, getUserAuths, list, updateUser} from '@/api/user';
import {ref} from 'vue';
import {checkEmail, checkMobile} from '@/utils/check';

const setRole = ref((data) => {
  return updateUser(data)
});
const roleUpdateHandler = ref((data)=>{
  return updateUser(data.id)
})
const updateHandler = ref((data)=>{
  return updateUser(data)
})
const deleteHandler = ref((data)=>{
  return deleteUser(data.id);
})
const getListHandler = async ({page, queryParams})=>{
  let userResponse =  await list({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams)
  let retList = []
  let retPage = {}
  retPage.total = userResponse.data.total;
  for (let i = 0; i < userResponse.data.list.length; i++) {
    let user = userResponse.data.list[i];
    await getUserAuths(user.id).then((authResponse) => {
      user.roleId = getRoleNameByRoleId(user.roleId);
      user.phone = authResponse.data.phone;
      user.email = authResponse.data.email;
      user.name = authResponse.data.username;
      retList[i] = user;
    });
  }
  return {page: retPage, list: retList}
}
const roles = [
  {value: 1, name: '超级管理员'},
  {value: 2, name: '产品管理员'},
  {value: 3, name: '工厂管理员'},
  {value: 4, name: '运营人员'},
];
const allStatus = [
  {value: '0', name: 'False'},
  {value: '1', name: 'True'},
];

const managerFormData = ref({
  queryForm: {
    items: [
      {
        label: 'id',
        name: 'id',
        style: {isDisable: true, placeholder: 'id号'},
      },
      {
        label: '姓名',
        name: 'name',
        style: {isDisable: true, placeholder: '姓名'},
      },
      {
        label: '邮箱',
        name: 'email',
        style: {rule: {validator: checkEmail}, placeholder: '邮箱'},
      },
      {
        label: '电话',
        name: 'phone',
        style: {rule: {validator: checkMobile}, placeholder: '电话'},
      },
      {
        label: '角色',
        name: 'roleId',
        style: {type: 'select', options: roles, placeholder: '角色名'},
      },
      {
        label: '是否启用',
        name: 'status',
        style: {type: 'select', options: allStatus},
      },
    ],
  },
  listForm: {
    items: [
      {
        label: 'id',
        name: 'id',
      },
      {
        label: '姓名',
        name: 'name',
      },
      {
        label: '邮箱',
        name: 'email',
      },
      {
        label: '电话',
        name: 'phone',
      },
      {
        label: '角色',
        name: 'roleId',
      },
      {
        label: '是否启用',
        name: 'status',
        style: {type: 'switch'},
        handler: roleUpdateHandler
      },
    ],
    handler: getListHandler,
    operationStyle: {
      width: 220,
    },
    operations: [
      {
        label: '编辑',
        type: 'primary',
        items: [
          {
            label: 'id',
            name: 'id',
            style: {isDisable: true, placeholder: 'id号'},
          },
          {
            label: '姓名',
            name: 'name',
            style: {isDisable: true, placeholder: '姓名'},
          },
          {
            label: '邮箱',
            name: 'email',
            style: {rule: {validator: checkEmail}, placeholder: '邮箱'},
          },
          {
            label: '电话',
            name: 'phone',
            style: {rule: {validator: checkMobile}},
            placeholder: '电话',
          },
          {
            label: '角色',
            name: 'roleId',
            style: {type: 'select', options: roles, placeholder: '角色名'},
          },
          {
            label: '是否启用',
            name: 'status',
            style: {type: 'switch', options: allStatus},
          },
        ],
        handler: updateHandler
      },
      {
        label: '设置角色',
        type: 'warning',
        title: '设置角色',
        items: [
          {
            label: '角色',
            name: 'roleId',
            style: {type: 'select', options: roles, placeholder: '角色名'},
          },
        ],
        handler: setRole,
      },
      {
        label: '删除',
        type: 'danger',
        handler: deleteHandler
      },
    ],
  },
});



</script>
<style>

</style>
