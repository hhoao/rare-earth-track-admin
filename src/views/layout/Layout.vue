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
import {AppMain, Navbar, Sidebar} from './components';
import ResizeMixin from './mixin/ResizeHandler';
import {markRaw} from 'vue';

export default markRaw({
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/mixin";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
