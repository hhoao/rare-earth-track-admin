<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import AppMain from './AppMain';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import {computed, markRaw, onBeforeMount, onMounted, watch} from 'vue';
import store from '@/store';
import {useRouter} from 'vue-router';

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
    const router = useRouter();
    const isMobile = () => {
      const rect = body.getBoundingClientRect();
      return rect.width - RATIO < WIDTH;
    }

    watch(() => router, () => {
          if (this.device === 'mobile' && this.sidebar.opened) {
            store.dispatch('CloseSideBar', {withoutAnimation: false});
          }
        }
    )

    onBeforeMount(() => {
      window.addEventListener('resize', resizeHandler);
    })

    onMounted(() => {
      const isMobileRet = isMobile();
      if (isMobileRet) {
        store.dispatch('ToggleDevice', 'mobile');
        store.dispatch('CloseSideBar', {withoutAnimation: true});
      }
    })

    const resizeHandler = () => {
      if (!document.hidden) {
        const isMobileRet = isMobile();
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop');

        if (isMobileRet) {
          store.dispatch('CloseSideBar', {withoutAnimation: true});
        }
      }
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
    return {
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
