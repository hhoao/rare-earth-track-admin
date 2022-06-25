<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main @click="hideSideBarIfMobile" />
    </div>
  </div>
</template>

<script>
import AppMain from './AppMain';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import {computed, markRaw, onBeforeMount, onMounted, watch} from 'vue';
import store from '@/store';

export default markRaw({
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  setup: ()=> {
    const {body} = document;
    const WIDTH = 1024;
    const RATIO = 3;
    const isMobile = () => {
      const rect = body.getBoundingClientRect();
      return rect.width - RATIO < WIDTH;
    }
    const sidebar = computed(() => store.state.app.sidebar);
    const device = computed(() => store.state.app.device);
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile',
      }
    })
    const hideSideBarIfMobile = () => {
      if (isMobile()){
        store.getters.sidebar.opened = false
      }
    }
    onBeforeMount(() => {
      window.addEventListener('resize', resizeHandler);
    })

    onMounted(() => {
      const isMobileRet = isMobile();
      if (isMobileRet) {
        store.dispatch('ToggleDevice', 'mobile');
      }
    })

    const resizeHandler = () => {
      if (!document.hidden) {
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop');
      }
    }

    return {
      hideSideBarIfMobile,
      classObj
    }
  }
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
