<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {deleteFile, listFiles, uploadFile} from '@/api/file';
import {getToken} from '@/utils/auth';

const deleteHandler = ref((data) => {
  return deleteFile(data.id);
});
const multiDeleteHandler = async (data) => {
  for (let file of data) {
    await deleteFile(file.id);
  }
};
const getListHandler = async ({page, queryParams}) => {
  let response = await listFiles({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams);
  let retPage = {};
  retPage.total = response.data.total;
  return {page: retPage, list: response.data.list};
};
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
        label: '文件名',
        name: '类型',
        style: {placeholder: '文件类型'},
      },
      {
        label: '大小',
        name: 'size',
        style: {placeholder: '文件大小'},
      },
      {
        label: 'url',
        name: 'url',
        style: {placeholder: 'url'},
      },
      {
        label: '是否启用',
        name: 'status',
        style: {type: 'select', options: allStatus},

      },
    ],
  },
  addForm: {
    title: '上传文件',
    items: [
      {
        label: '文件',
        name: 'file',
        style: {
          type: 'file',
          action: uploadFile,
          headers: new Headers({"Authorization": getToken()}),
          drag: true,
          multiple: true,
          showFileList: true,
        },
      },
    ],
    contentType: 'formData',
  },
  listForm: {
    items: [
      {
        label: 'id',
        name: 'id',
      },
      {
        label: '文件名',
        name: 'fileName',
      },
      {
        label: '类型',
        name: 'type',
      },
      {
        label: '大小',
        name: 'size',
      },
      {
        label: 'url',
        name: 'url',
      },
      {
        label: '图片',
        name: 'url',
        style: {type: 'image'},
      },
      {
        label: '是否启用',
        name: 'enable',
      },
    ],
    handler: getListHandler,
    multiOperations: [
      {
        label: '删除多个文件',
        handler: multiDeleteHandler,
      },
    ],
    operationStyle: {
      width: 220,
    },
    operations: [
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
