<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {addProduct, deleteProduct, listProducts, updateProduct} from '@/api/product';
import {deleteMenu} from '@/api/menu';
import {checkNotEmpty} from '@/utils/check';

const updateHandler = ref((data) => {
  return updateProduct(data);
});
const addHandler = ref((data) => {
  return addProduct(data);
});
const deleteHandler = ref((data) => {
  return deleteProduct(data.name);
});
const multiDeleteHandler = async(data)=>{
  for (let product of data) {
    await deleteProduct(product.name);
  }
}
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
        label: '工厂id',
        name: 'factoryId',
        style: {placeholder: '工厂id'},
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
  addForm: {
    title: '添加产品',
    items: [
      {
        label: '名称',
        name: 'name',
        style: {placeholder: '名称', rule: {validator: checkNotEmpty}},
      },
      {
        label: '工厂id',
        name: 'factoryId',
        style: {placeholder: '工厂id', rule: {validator: checkNotEmpty}},
      },
      {
        label: '批次',
        name: 'batchId',
        style: {placeholder: '批次', rule: {validator: checkNotEmpty}}
      },
    ],
    handler: addHandler
  },
  listForm: {
    items: [
      {
        label: 'id',
        name: 'id',
      },
      {
        label: '工厂id',
        name: 'factoryId',
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
    multiOperations: [
      {
        label: '删除多个产品',
        handler: multiDeleteHandler,
      }
    ],
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
            label: '工厂id',
            name: 'factoryId',
            style: {placeholder: '工厂id', rule: {validator: checkNotEmpty}},
          },
          {
            label: '名称',
            name: 'name',
            style: {placeholder: '名称', rule: {validator: checkNotEmpty}},
          },
          {
            label: '批次',
            name: 'batchId',
            style: {placeholder: '批次', rule: {validator: checkNotEmpty}}
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
