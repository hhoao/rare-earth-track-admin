<template>
  <div></div>
<!--  <manager-form-->
<!--    ref="managerFormRef"-->
<!--    :items="items"-->
<!--    :getList="getList"-->
<!--    :updateItem="updateUser"-->
<!--    :deleteItem="deleteUser"-->
<!--  />-->
</template>
<script setup>
// import ManagerForm from '@/components/ManagerForm';
// import {getRoleNameByRoleId} from '@/api/role';
// import {getUserAuths, list, updateUser, deleteUser} from '@/api/user';
// import {onMounted, ref} from 'vue';
// import {checkEmail, checkMobile} from '@/utils/check';
//
// const managerFormRef = ref();
// const getList = ref(() => {
// });
// const roles = [
//   {value: 1, name: '超级管理员'},
//   {value: 2, name: '产品管理员'},
//   {value: 3, name: '工厂管理员'},
//   {value: 4, name: '运营人员'},
// ];
// const allStatus = [
//   {value: '0', name: 'False'},
//   {value: '1', name: 'True'},
// ];
//
// const items = ref([
//   {
//     label: 'id',
//     name: 'id',
//     showStyle: {type: 'operation'},
//     editStyle: {isDisable: true, placeholder: 'id号'},
//     queryStyle: {isDisable: true, placeholder: 'id号'},
//   },
//   {
//     label: '姓名',
//     name: 'name',
//     showStyle: {type: 'operation'},
//     editStyle: {isDisable: true, placeholder: '姓名'},
//     queryStyle: {isDisable: true, placeholder: '姓名'},
//   },
//   {
//     label: '邮箱',
//     name: 'email',
//     editStyle: {rule: {validator: checkEmail}, placeholder: '邮箱'},
//     queryStyle: {rule: {validator: checkEmail}, placeholder: '邮箱'},
//   },
//   {
//     label: '电话',
//     name: 'phone',
//     editStyle: {rule: {validator: checkMobile}},
//     placeholder: '电话',
//     queryStyle: {rule: {validator: checkMobile}, placeholder: '电话'},
//   },
//   {
//     label: '角色',
//     name: 'roleId',
//     editStyle: {type: 'select', options: roles, placeholder: '角色名'},
//     queryStyle: {type: 'select', options: roles, placeholder: '角色名'},
//   },
//   {
//     label: '是否启用',
//     name: 'status',
//     showStyle: {type: 'switch'},
//     editStyle: {type: 'switch', options: allStatus},
//     queryStyle: {type: 'select', options: allStatus},
//   },
// ]);
//
// onMounted(() => {
//       getList.value = () => {
//         managerFormRef.value.repository.list = [];
//         let page = managerFormRef.value.page;
//         let queryParams = managerFormRef.value.repository.queryParams;
//         list({pageNum: page.pageNum, pageSize: page.pageSize}, queryParams)
//             .then((userResponse) => {
//               page.total = userResponse.data.total;
//               for (let i = 0; i < userResponse.data.list.length; i++) {
//                 let user = userResponse.data.list[i];
//                 getUserAuths(user.id).then((authResponse) => {
//                   user.roleId = getRoleNameByRoleId(user.roleId);
//                   user.phone = authResponse.data.phone;
//                   user.email = authResponse.data.email;
//                   user.name = authResponse.data.username;
//                   managerFormRef.value.repository.list[i] = user;
//                 });
//               }
//             });
//       };
//     },
// );


</script>
<style>

</style>
