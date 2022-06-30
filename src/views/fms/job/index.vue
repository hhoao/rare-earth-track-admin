<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {
  addJob, allocPermissions,
  deleteJob,
  listJobAllPermissions,
  listJobs,
  updateJob,
} from '@/api/job';
import {listPermissions} from '@/api/permission';

const updateHandler = ref((data) => {
  return updateJob(data);
})
const deleteHandler = ref((data) => {
  return deleteJob(data.name);
});


const setJobPermissionsHandler = async ({checkedNodes, rowData})=>{
  let permissionIds = []
  for (let permission of checkedNodes){
    permissionIds.push(permission.id)
  }
  allocPermissions(rowData.name, permissionIds)
}
const getJobPermissionsHandler = async (data)=>{
  let tree = {data: [], defaultCheckedKeys: []}
  await listPermissions(null, {pageSize: 0}).then((response) => {
    console.log(response)
    for (let permission of response.data.list) {
      let treeMetaData = permission
      treeMetaData.label = permission.name;
      treeMetaData.id = permission.id
      tree.data.push(treeMetaData)
    }
  });

  await listJobAllPermissions(data.id).then((jobMenus)=>{
    for (let jobMenu of jobMenus.data.list){
      tree.defaultCheckedKeys.push(jobMenu.id)
    }
  })
  return tree;
}

const getListHandler = async ({page, queryParams}) => {
  let response = await listJobs({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams);
  let retPage = {};
  retPage.total = response.data.total;
  return {page: retPage, list: response.data.list};
};
const addJobHandler = ref((data)=>{
  return addJob(data)
})

const multiDeleteHandler = async(data)=>{
  for (let job of data) {
    await deleteJob(job.name);
  }
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
        label: '描述',
        name: 'description',
        style: {placeholder: '描述'},
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
    handler: addJobHandler
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
    ],
    handler: getListHandler,
    operations: [
      {
        contentType: 'tree',
        title: '设置资源',
        label: '设置资源',
        type: 'warning',
        getTreeHandler: getJobPermissionsHandler,
        handler: setJobPermissionsHandler,
      },
      {
        title: '修改角色',
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
        ],
        handler: updateHandler,
      },
      {
        label: '删除',
        type: 'danger',
        handler: deleteHandler,
      },
    ],
    multiOperations: [
      {
        label: '删除多个角色',
        handler: multiDeleteHandler,
      }
    ],
  },
});


</script>
<style>

</style>
