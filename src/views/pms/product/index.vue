<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {deleteProduct, listProducts, updateProduct} from '@/api/product';

const updateHandler = ref((data) => {
  return updateProduct(data);
});
const deleteHandler = ref((data) => {
  return deleteProduct(data.name);
});
const getListHandler = async ({page, queryParams}) => {
  let response = await listProducts({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams);
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
        label: '批次',
        name: 'batchId',
        style: {placeholder: '批次'}
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
        label: '批次',
        name: 'batchId',
      },
    ],
    handler: getListHandler,
    operations: [
      {
        title: '修改产品',
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
            label: '批次',
            name: 'batchId',
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
