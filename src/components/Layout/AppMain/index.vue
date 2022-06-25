<template>
  <section class="app-main">
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup>
</script>
