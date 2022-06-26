<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {addRole, deleteRole, listRoles, updateRole} from '@/api/role';

const updateHandler = ref((data) => {
  return updateRole(data);
});
const deleteHandler = ref((data) => {
  return deleteRole(data.name);
});
const getListHandler = async ({page, queryParams}) => {
  let response = await listRoles({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams);
  let retPage = {};
  retPage.total = response.data.total;
  return {page: retPage, list: response.data.list};
};
const addRoleHandler = ref((data)=>{
  return addRole(data)
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
        style: {placeholder: 'id号'},
      },
      {
        label: '名称',
        name: 'name',
        style: {placeholder: '名称'},
      },
      {
        label: '描述',
        name: 'description',
        style: {placeholder: '描述'},
      },
      {
        label: '是否启用',
        name: 'status',
        style: {type: 'select', options: allStatus},
      },
    ],
  },
  addForm: {
    title: '添加角色',
    items: [
      {
        label: '名称',
        name: 'name',
        style: {placeholder: '名称'},
      },
      {
        label: '描述',
        name: 'description',
        style: {placeholder: '描述'},
      },
    ],
    handler: addRoleHandler
  },
  listForm: {
    items: [
      {
        label: 'id',
        name: 'id',
      },
      {
        label: '名称',
        name: 'name',
      },
      {
        label: '描述',
        name: 'description',
      },
      {
        label: '是否启用',
        name: 'status',
      },
    ],
    handler: getListHandler,
    operations: [
      {
        label: '编辑',
        type: 'primary',
        items: [
          {
            label: 'id',
            name: 'id',
            style: {placeholder: 'id号', isDisable: true},
          },
          {
            label: '名称',
            name: 'name',
            style: {placeholder: '名称'},
          },
          {
            label: '描述',
            name: 'description',
            style: {placeholder: '描述'},
          },
          {
            label: '是否启用',
            name: 'status',
            style: {type: 'select', options: allStatus},
          },
        ],
        handler: updateHandler,
      },
      {
        label: '删除',
        type: 'danger',
        handler: deleteHandler,
      },
    ],
  },
});


</script>
<style>

</style>
