<template>
  <div class="scroll-container">
    <el-scrollbar class="scroll-wrapper">
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
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarItem from './SidebarItem';
import {computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore();
const sidebar = computed(() => store.getters.sidebar);
const routes = computed(() => store.getters.routers);

const isCollapse = () => {
  return !sidebar.value.opened;
};
</script>
<style lang="scss">
@import '@/styles/variables.scss';

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;

  .scroll-wrapper {
    position: absolute;
    width: 100% !important;
  }

}
</style>
