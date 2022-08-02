<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {
  addRole,
  allocMenus,
  allocResources,
  deleteRole,
  listRoleAllMenus,
  listRoleAllResources,
  listRoles,
  updateRole,
} from '@/api/role';
import {listMenus} from '@/api/menu';
import {listResources} from '@/api/resource';
import {checkNotEmpty} from '@/utils/check';

const updateHandler = ref((data) => {
  return updateRole(data);
})
const deleteHandler = ref((data) => {
  return deleteRole(data.name);
});
const getTreeHandler  = async (data) => {
  let tree = {data: [], defaultCheckedKeys: []}
  await listMenus(null, {pageSize: 0}).then((response) => {
    let childNodes = []
    for (let menu of response.data.list) {
      let treeMetaData = menu
      treeMetaData.label = menu.title;
      treeMetaData.id = menu.id
      if (menu.parentId === 0){
        tree.data.push(treeMetaData)
      }else{
        treeMetaData.parentId = menu.parentId
        childNodes.push(treeMetaData)
      }
    }
    for (let childNode of childNodes) {
      for (let parentData of tree.data) {
        if (parentData.id === childNode.parentId) {
          parentData.children = parentData.children ? parentData.children : []
          parentData.children.push(childNode)
        }
      }
    }
  });

  await listRoleAllMenus(data.name).then((roleMenus)=>{
    for (let roleMenu of roleMenus.data.list){
        tree.defaultCheckedKeys.push(roleMenu.id)
    }
  })
  return tree;
}

const setRoleResourcesHandler = async ({checkedNodes, rowData})=>{
  let resourceIds = []
  for (let resource of checkedNodes){
    resourceIds.push(resource.id)
  }
  allocResources(rowData.name, resourceIds)
}
const getRoleResourcesHandler = async (data)=>{
  let tree = {data: [], defaultCheckedKeys: []}
  await listResources(null, {pageSize: 0}).then((response) => {
    for (let resource of response.data.list) {
      let treeMetaData = resource
      treeMetaData.label = resource.name;
      treeMetaData.id = resource.id
      tree.data.push(treeMetaData)
    }
  });

  await listRoleAllResources(data.name).then((roleMenus)=>{
    for (let roleMenu of roleMenus.data.list){
      tree.defaultCheckedKeys.push(roleMenu.id)
    }
  })
  return tree;
}
const setTreeHandler = ({checkedNodes, rowData}) => {
  let menuIds = []
  for (let menu of checkedNodes){
    menuIds.push(menu.id)
  }
  allocMenus(rowData.name, menuIds)
}
const getListHandler = async ({page, queryParams}) => {
  let response = await listRoles({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams);
  let retPage = {};
  retPage.total = response.data.total;
  return {page: retPage, list: response.data.list};
};
const addRoleHandler = (data)=>{
  return addRole(data)
}
const allStatus = [
  {value: '0', name: 'False'},
  {value: '1', name: 'True'},
];
const multiDeleteHandler = async(data)=>{
  for (let role of data) {
    await deleteRole(role.name);
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
      {
        label: '是否启用',
        name: 'status',
        style: {type: 'select', options: allStatus},
      },
    ],
  },
  addForm: {
    title: '添加角色',
    items: [
      {
        label: '名称',
        name: 'name',
        style: {placeholder: '名称', rule: {validator: checkNotEmpty}},
      },
      {
        label: '描述',
        name: 'description',
        style: {placeholder: '描述'},
      },
    ],
    handler: addRoleHandler
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
      {
        label: '是否启用',
        name: 'status',
      },
    ],
    handler: getListHandler,
    operations: [
      {
        contentType: 'tree',
        title: '设置菜单',
        label: '设置菜单',
        type: 'warning',
        getTreeHandler: getTreeHandler,
        handler: setTreeHandler,
      },
      {
        contentType: 'tree',
        title: '设置资源',
        label: '设置资源',
        type: 'warning',
        getTreeHandler: getRoleResourcesHandler,
        handler: setRoleResourcesHandler,
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
            style: {placeholder: '名称', rule: {validator: checkNotEmpty}},
          },
          {
            label: '描述',
            name: 'description',
            style: {placeholder: '描述'},
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
