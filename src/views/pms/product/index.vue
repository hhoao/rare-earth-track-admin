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

const updateHandler = ref((data) => {
  return updateProduct(data);
});
const addHandler = ref((data) => {
  return addProduct(data);
});
const deleteHandler = ref((data) => {
  return deleteProduct(data.name);
});
const multiDeleteHandler = async (data) => {
  for (let product of data) {
    await deleteProduct(product.name);
  }
};
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
        style: {placeholder: '批次'},
      },
    ],
  },
  addForm: {
    title: '添加产品',
    items: [
      {
        label: '名称',
        name: 'name',
        style: {placeholder: '名称'},
      },
      {
        label: '工厂id',
        name: 'factoryId',
        style: {placeholder: '工厂id'},
      },
      {
        label: '批次',
        name: 'batchId',
        style: {placeholder: '批次'},
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
      {
        label: '包装类型',
        name: 'packingType',
      },
    ],
    handler: getListHandler,
    multiOperations: [
      {
        label: '删除多个产品',
        handler: multiDeleteHandler,
      },
    ],
    operationStyle: {
      width: 220,
    },
    operations: [
      {
        title: '详细信息',
        label: '详细信息',
        type: 'warning',
        items: [
          {
            label: 'id',
            name: 'id',
            style: {placeholder: 'id号', isDisable: true},
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
          },
          {
            label: '出货时间',
            name: 'dispatchTime',
          },
          {
            label: '防潮标识',
            name: 'moistureProofLogo',
          },
          {
            label: '规范',
            name: 'specification',
          },
          {
            label: '包装类型',
            name: 'packingType',
          },
          {
            label: '净重',
            name: 'netWeight',
          },
          {
            label: '运输标识',
            name: 'transportLog',
          },
          {
            label: '图片',
            name: 'pic',
          },
          {
            label: '质检报告',
            name: 'qualityCertificate',
          },
          {
            label: '牌号',
            name: 'standardNumber',
          },
          {
            label: '纯度',
            name: 'purity',
          },
          {
            label: '生产设备',
            name: 'productionEquipment',
          },
          {
            label: '物料比例',
            name: 'materialRatio',
          },
          {
            label: '提取单元',
            name: 'extractionUnit',
          },
          {
            label: '图册',
            name: 'albumPics',
          },
          {
            label: '钕成分',
            name: 'nd',
          },
          {
            label: '钴成分',
            name: 'co',
          },
          {
            label: '硼成分',
            name: 'b',
          },
          {
            label: '镝铽镨成分',
            name: 'dyTbPr',
          },
          {
            label: '其他成分',
            name: 'other',
          },
          {
            label: '稀土成分',
            name: 'rE',
          },
          {
            label: '钕稀土混合成分',
            name: 'ndRE',
          },
          {
            label: '镝稀土混合成分',
            name: 'dyRE',
          },
          {
            label: '稀土氧化成分',
            name: 'rEO',
          },
          {
            label: '氧化钕稀土混合成分',
            name: 'nd2O3REO',
          },
          {
            label: '氧化钕成分',
            name: 'nd203',
          },
          {
            label: '氧化镝稀土混合成分',
            name: 'dy2O3REO',
          },
          {
            label: '稀土杂志',
            name: 'rEimpurities',
          },
          {
            label: '非稀土杂质',
            name: 'nonREimpurities',
          },
        ],
      },
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
