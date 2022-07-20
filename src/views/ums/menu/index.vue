<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {addMenu, deleteMenu, listMenus, updateMenu} from '@/api/menu';
import {checkNotEmpty, checkPassword, checkUsername} from '@/utils/check';

const menuUpdateHandler = ref((data)=>{
  return updateMenu(data.name, data)
})
const addHandler = ref((data) => {
  return addMenu(data)
})
const deleteMenuHandler = ref((data)=>{
  return deleteMenu(data.name);
})
const multiDeleteHandler = async(data)=>{
  for (let menu of data) {
    await deleteMenu(menu.name);
  }
}
const getListHandler = async ({page, queryParams})=>{
  let menuResponse =  await listMenus({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams)
  let retList = []
  let retPage = {}
  retPage.total = menuResponse.data.total;
  for (let i = 0; i < menuResponse.data.list.length; i++) {
    retList.push(menuResponse.data.list[i]);
  }
  return {page: retPage, list: retList}
}

const allHidden = [
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
        label: '名称',
        name: 'name',
        style: {placeholder: '姓名'},
      },
      {
        label: '标题',
        name: 'title',
        style: {placeholder: '姓名'},
      },
      {
        label: '前端图标',
        name: 'icon',
        style: {placeholder: '图标'},
      },
      {
        label: '隐藏',
        name: 'hidden',
        style: {type: 'select', options: allHidden},
      },
    ],
  },
  addForm: {
    title: '添加菜单',
    items: [
      {
        label: '名称',
        name: 'name',
        style: {placeholder: '姓名', rule:{validator: checkUsername}},
      },
      {
        label: '标题',
        name: 'title',
        style: {placeholder: '姓名', rule: {validator: checkNotEmpty}},
      },
      {
        label: '前端图标',
        name: 'icon',
        style: {placeholder: '前端图标', rule:{validator: checkNotEmpty}},
      },
      {
        label: '隐藏',
        name: 'hidden',
        style: {type: 'select', options: allHidden},
      },
    ],
    handler: addHandler,
  },
  listForm: {
    items: [
      {
        label: 'id',
        name: 'id',
        style: {placeholder: 'id号'},
      },
      {
        label: '名称',
        name: 'name',
        style: {placeholder: '姓名'},
      },
      {
        label: '前端图标',
        name: 'icon',
        style: {type: 'svg-icon', iconName: 'icon', placeholder: '前端图标'},
      },
      {
        label: '标题',
        name: 'title',
        style: {placeholder: '姓名'},
      },
      {
        label: '隐藏',
        name: 'hidden',
      },
    ],
    multiOperations: [
      {
        label: '删除多个菜单',
        handler: multiDeleteHandler,
      }
    ],
    handler: getListHandler,
    operations: [
      {
        title: '修改菜单',
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
            style: {placeholder: '姓名', rule:{validator: checkNotEmpty}},
          },
          {
            label: '标题',
            name: 'title',
            style: {placeholder: '标题', rule:{validator: checkNotEmpty}},
          },
          {
            label: '前端图标',
            name: 'icon',
            style: {placeholder: '前端图标', rule:{validator: checkNotEmpty}},
          },
          {
            label: '隐藏',
            name: 'hidden',
            style: {type: 'switch'},
          },
        ],
        handler: menuUpdateHandler
      },
      {
        label: '删除',
        type: 'danger',
        handler: deleteMenuHandler
      },
    ],
  },
});



</script>
<style>

</style>
