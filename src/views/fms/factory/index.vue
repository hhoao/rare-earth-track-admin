<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {addFactory, deleteFactory, listFactories, updateFactory} from '@/api/factory';
import {deleteMenu} from '@/api/menu';

const updateHandler = ref((data) => {
  return updateFactory(data);
});
const deleteHandler = ref((data) => {
  return deleteFactory(data.name);
});
const multiDeleteHandler = async(data)=>{
  for (let factory of data) {
    await deleteFactory(factory.name);
  }
}
const addHandler = ref((data) => {
  return addFactory(data);
})
const getListHandler = async ({page, queryParams}) => {
  let response = await listFactories({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams);
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
        label: '手机号',
        name: 'phone',
        style: {placeholder: '手机号'}
      },
      {
        label: '邮箱',
        name: 'email',
        style: {placeholder: '邮箱'}
      },
      {
        label: '地址',
        name: 'address',
        style: {placeholder: '地址'}
      },
    ],
  },
  addForm: {
    title: '添加工厂',
    items: [
      {
        label: '名称',
        name: 'name',
        style: {placeholder: '名称'},
      },
      {
        label: '手机号',
        name: 'phone',
        style: {placeholder: '手机号'}
      },
      {
        label: '邮箱',
        name: 'email',
        style: {placeholder: '邮箱'}
      },
      {
        label: '地址',
        name: 'address',
        style: {placeholder: '地址'}
      }
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
        label: '手机号',
        name: 'phone',
      },
      {
        label: '邮箱',
        name: 'email',
      },
      {
        label: '地址',
        name: 'address',
      },
    ],
    handler: getListHandler,
    multiOperations: [
      {
        label: '删除多个工厂',
        handler: multiDeleteHandler,
      }
    ],
    operations: [
      {
        title: '修改资料',
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
            label: '手机号',
            name: 'phone',
            style: {placeholder: '手机号'}
          },
          {
            label: '邮箱',
            name: 'email',
            style: {placeholder: '邮箱'}
          },
          {
            label: '地址',
            name: 'address',
            style: {placeholder: '地址'}
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
