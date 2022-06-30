<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {deleteMember, listMember, updateMember} from '@/api/member';
import {ref} from 'vue';

const setJob = ref((data) => {
  return updateMember(data);
});

const updateHandler = ref((data) => {
  return updateMember(data);
});

const deleteHandler = ref((data) => {
  return deleteMember(data.id);
});

const multiDeleteHandler = async (data) => {
  for (let member of data) {
    await deleteMember(member.id);
  }
};

const getListHandler = async ({page, queryParams}) => {
  let memberResponse = await listMember({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams);
  console.log(memberResponse)
  let retList = memberResponse.data.list;
  let retPage = {};
  retPage.total = memberResponse.data.total;
  return {page: retPage, list: retList};
};

const jobs = [
  {value: 1, name: '超级管理员'},
  {value: 2, name: '产品管理员'},
  {value: 3, name: '工厂管理员'},
  {value: 4, name: '运营人员'},
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
        label: '姓名',
        name: 'nickname',
        style: {placeholder: '姓名'},
      },
      {
        label: '用户id',
        name: 'userId',
        style: {placeholder: '用户id'},
      },
      {
        label: '工厂id',
        name: 'factoryId',
        style: {placeholder: '工厂id'},
      },
      {
        label: '职业id',
        name: 'jobId',
        style: {type: 'select', options: jobs, placeholder: '职业名'},
      }
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
        name: 'nickname',
      },
      {
        label: '用户id',
        name: 'userId',
      },
      {
        label: '工厂id',
        name: 'factoryId',
      },
      {
        label: '职业id',
        name: 'jobId',
      }
    ],
    handler: getListHandler,
    multiOperations: [
      {
        label: '删除多个成员',
        handler: multiDeleteHandler,
      },
    ],
    operationStyle: {
      width: 220,
    },
    operations: [
      {
        title: '修改成员',
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
            name: 'nickname',
            style: {placeholder: '姓名'},
          },
          {
            label: '用户id',
            name: 'userId',
            style: {placeholder: '用户id'},
          },
          {
            label: '工厂id',
            name: 'factoryId',
            style: {placeholder: '工厂id'},
          },
          {
            label: '职业id',
            name: 'jobId',
            style: {type: 'select', options: jobs, placeholder: '职业名'},
          }
        ],
        handler: updateHandler,
      },
      {
        label: '设置职位',
        type: 'warning',
        title: '设置职位',
        items: [
          {
            label: '职位',
            name: 'roleId',
            style: {type: 'select', options: jobs, placeholder: '职位名'},
          },
        ],
        handler: setJob,
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
