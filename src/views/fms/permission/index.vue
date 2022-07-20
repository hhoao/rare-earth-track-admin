<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {addPermission, deletePermission, listPermissions, updatePermission} from '@/api/permission';
import {checkNotEmpty} from '@/utils/check';

const updateHandler = ref((data) => {
  return updatePermission(data);
});
const addHandler = ref((data) => {
  return addPermission(data);
});
const deleteHandler = ref((data) => {
  return deletePermission(data.name);
});
const multiDeleteHandler = async (data) => {
  for (let permission of data) {
    await deletePermission(permission.name);
  }
};
const getListHandler = async ({page, queryParams}) => {
  let response = await listPermissions({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams);
  let retPage = {};
  retPage.total = response.data.total;
  return {page: retPage, list: response.data.list};
};

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
        label: '方法',
        name: 'method',
        style: {placeholder: '方法'},
      },
      {
        label: 'url',
        name: 'url',
        style: {placeholder: 'url'},
      },
    ],
  },
  addForm: {
    title: '添加资源',
    items: [
      {
        label: '名称',
        name: 'name',
        style: {placeholder: '名称', rule: {validator: checkNotEmpty}},
      },
      {
        label: '方法',
        name: 'method',
        style: {placeholder: '方法', rule: {validator: checkNotEmpty}},
      },
      {
        label: 'url',
        name: 'url',
        style: {placeholder: 'url', rule: {validator: checkNotEmpty}},
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
        label: '名称',
        name: 'name',
      },
      {
        label: '方法',
        name: 'method',
      },
      {
        label: 'url',
        name: 'url',
      },
    ],
    handler: getListHandler,
    multiOperations: [
      {
        label: '删除多个资源',
        handler: multiDeleteHandler,
      },
    ],
    operations: [
      {
        title: '修改资源',
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
            style: {placeholder: '名称', rule: {validator: checkNotEmpty}},
          },
          {
            label: '方法',
            name: 'method',
            style: {placeholder: '方法', rule: {validator: checkNotEmpty}},
          },
          {
            label: 'url',
            name: 'url',
            style: {placeholder: 'url', rule: {validator: checkNotEmpty}},
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
