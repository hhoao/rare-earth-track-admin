<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const scrollWrapper = ref(null);
const scrollContainer = ref(null);
const delta = 15;
const top = 0;
const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 3;
  const $containerHeight = scrollContainer.value.offsetHeight;
  const $wrapperHeight = scrollWrapper.value.offsetHeight;
  if (eventDelta > 0) {
    this.top = Math.min(0, this.top + eventDelta);
  } else {
    if ($containerHeight - delta < $wrapperHeight) {
      if (!(this.top < -($wrapperHeight - $containerHeight + delta))) {
        this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta);
      }
    } else {
      this.top = 0;
    }
  }
};

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';

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
