<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {getRoleNameByRoleId, listRoles} from '@/api/role';
import {addAdministrator, deleteAdministrator, list, updateAdministrator} from '@/api/administrator';
import {ref} from 'vue';
import {checkEmptyOption, checkPassword, checkUsername} from '@/utils/check';

const addHandler = ref((data) => {
  return addAdministrator(data)
})
const setRole = ref((data) => {
  return updateAdministrator(data)
});
const roleUpdateHandler = ref((data)=>{
  return updateAdministrator(data.id)
})
const updateHandler = ref((data)=>{
  return updateAdministrator(data)
})
const deleteHandler = ref((data)=>{
  return deleteAdministrator(data.id);
})
const multiDeleteHandler = async (data)=>{
  for (let administrator of data){
    await deleteAdministrator(administrator.id);
  }
}
const getListHandler = async ({page, queryParams})=>{
  let administratorResponse =  await list({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams)
  let retList = administratorResponse.data.list
  let retPage = {}
  retPage.total = administratorResponse.data.total
  for (let i = 0; i < administratorResponse.data.list.length; i++) {
      let administrator = administratorResponse.data.list[i]
      await getRoleNameByRoleId(administrator.roleId).then(name => {
        administrator.roleId = name;
      })
      retList[i] = administrator;
  }
  return {page: retPage, list: retList}
}

const roles = []
listRoles({pageSize: 0}, {}).then(response => {
  let list = response.data.list
  for (let role of list){
    // console.log(role)
    // console.log({value: role.id.toString(), name: role.name})
    roles.push({value: role.id, name: role.name})
  }
})

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
        name: 'username',
        style: {isDisable: true, placeholder: '姓名'},
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
  addForm: {
    title: '添加管理员',
    items: [
      {
        label: '名称',
        name: 'username',
        style: {placeholder: '姓名', rule:{validator: checkUsername}},
      },
      {
        label: '密码',
        name: 'password',
        style: {placeholder: '密码', rule:{validator: checkPassword}},
      },
      {
        label: '角色名',
        name: 'roleId',
        style: {type: 'select', options: roles, rule: {validator: checkEmptyOption}},
      },
    ],
    handler: addHandler,
  },
  listForm: {
    items: [
      {
        label: 'id',
        name: 'id',
      },
      {
        label: '姓名',
        name: 'username',
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
    multiOperations: [
      {
        label: '删除多个用户',
        handler: multiDeleteHandler,
      }
    ],
    operationStyle: {
      width: 220,
    },
    operations: [
      {
        title: '修改用户',
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
            name: 'username',
            style: {placeholder: '姓名', rule:{validator: checkUsername}},
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
