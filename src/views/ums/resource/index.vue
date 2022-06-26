<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {deleteResource, listResources, updateResource} from '@/api/resource';

const updateHandler = ref((data)=>{
  return updateResource(data)
})
const deleteHandler = ref((data)=>{
  return deleteResource(data.name);
})
const getListHandler = async ({page, queryParams})=>{
  let response =  await listResources({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams)
  let retPage = {}
  retPage.total = response.data.total;
  return {page: retPage, list: response.data.list}
}

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
