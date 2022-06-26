<template>
  <manager-form
    :data="managerFormData"
  />
</template>
<script setup>
import ManagerForm from '@/components/ManagerForm';
import {ref} from 'vue';
import {deleteMenu, listMenus, updateMenu} from '@/api/menu';

const menuUpdateHandler = ref((data)=>{
  return updateMenu(data.name, data)
})
const deleteMenuHandler = ref((data)=>{
  return deleteMenu(data.name);
})
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
        label: '隐藏',
        name: 'hidden',
        style: {type: 'select', options: allHidden},
      },
    ],
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
        label: '标题',
        name: 'title',
        style: {placeholder: '姓名'},
      },
      {
        label: '隐藏',
        name: 'hidden',
      },
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
