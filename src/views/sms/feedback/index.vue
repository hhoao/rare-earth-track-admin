<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {addFeedback, deleteFeedback, listFeedbacks, updateFeedback} from '@/api/feedback';
import {deleteMenu} from '@/api/menu';

const updateHandler = ref((data) => {
  return updateFeedback(data);
});
const addHandler = ref((data) => {
  return addFeedback(data);
})
const deleteHandler = ref((data) => {
  return deleteFeedback(data.name);
});
const multiDeleteHandler = async(data)=>{
  for (let feedback of data) {
    await deleteFeedback(feedback.name);
  }
}
const getListHandler = async ({page, queryParams}) => {
  let response = await listFeedbacks({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams);
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
        label: 'title',
        name: '标题',
        style: {placeholder: '标题'},
      },
      {
        label: '类型',
        name: 'type',
        style: {placeholder: '类型'}
      },
      {
        label: '是否启用',
        name: 'status',
        style: {type: 'select', options: allStatus},
      },
    ],
  },
  addForm: {
    title: '添加反馈信息',
    items: [
      {
        label: 'title',
        name: '标题',
        style: {placeholder: '标题'},
      },
      {
        label: '类型',
        name: 'type',
        style: {placeholder: '类型'}
      },
      {
        label: '是否启用',
        name: 'status',
        style: {type: 'select', options: allStatus},
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
        label: 'title',
        name: '标题',
      },
      {
        label: '类型',
        name: 'type',
      },
      {
        label: '是否启用',
        name: 'status',
      },
    ],
    handler: getListHandler,
    multiOperations: [
      {
        label: '删除多个反馈',
        handler: multiDeleteHandler,
      }
    ],
    operations: [
      {
        title: '修改反馈信息',
        label: '编辑',
        type: 'primary',
        items: [
          {
            label: 'id',
            name: 'id',
            style: {placeholder: 'id号', isDisable: true},
          },
          {
            label: 'title',
            name: '标题',
            style: {placeholder: '标题'},
          },
          {
            label: '类型',
            name: 'type',
            style: {placeholder: '类型'}
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
