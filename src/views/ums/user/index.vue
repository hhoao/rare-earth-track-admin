<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {deleteUser, list, updateUser} from '@/api/user';
import {ref} from 'vue';
import {checkEmail, checkMobile} from '@/utils/check';


const updateHandler = ref((data)=>{
  return updateUser(data)
})
const deleteHandler = ref((data)=>{
  return deleteUser(data.id);
})
const multiDeleteHandler = async (data)=>{
  for (let user of data){
    await deleteUser(user.id);
  }
}
const getListHandler = async ({page, queryParams})=>{
  let userResponse =  await list({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams)
  let retList = [...userResponse.data.list]
  let retPage = {}
  retPage.total = userResponse.data.total;
  return {page: retPage, list: retList}
}

const allStatus = [
  {value: 0, name: 'False'},
  {value: 1, name: 'True'},
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
        label: '是否启用',
        name: 'status',
        style: {type: 'switch'},
        handler: updateHandler
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
            label: '是否启用',
            name: 'status',
            style: {type: 'switch', options: allStatus},
          },
        ],
        handler: updateHandler
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
