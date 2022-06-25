<template>
  <scroll-bar>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse()"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes" />
    </el-menu>
  </scroll-bar>
</template>

<script setup>
import SidebarItem from './SidebarItem';
import ScrollBar from '@/components/ScrollBar';
import {computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore()
const sidebar = computed(() => store.getters.sidebar)
const routes = computed(() => store.getters.routers)

const isCollapse = () => {
  return !sidebar.value.opened
}
</script>
