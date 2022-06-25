<template>
  <div>
    <template v-for="item in routes">
      <template v-if="item.children">
        <el-sub-menu v-if="!item.hidden" :key="item.name" :index="item.name">
          <template #title>
            <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon" />
            <span v-if="item.meta&&item.meta.title">{{ item.meta.title }}</span>
          </template>
          <!-- 使用递归 -->
          <sidebar-item :routes="item.children" :base-path="item.path" :cur-indent="35" />
        </el-sub-menu>
        <sidebar-item
          v-else :key="item.name"
          :routes="item.children"
          :base-path="item.path"
        />
      </template>
      <template v-else-if="!item.hidden">
        <router-link
          :to="(basePath ? basePath : '') + '/'+ item.path"
          :key="item.name">
          <el-menu-item
            :index="(basePath ? basePath : '') + '/'+ item.path"
            :style="'padding-left:' +curIndent+'px'+';'">
            <svg-icon
              v-if="item.meta && item.meta.icon"
              :icon-class="item.meta.icon" />
            <template #title>
              <span
                v-if="item.meta&&item.meta.title"
              >{{ item.meta.title }}</span>
            </template>
          </el-menu-item>
        </router-link>
      </template>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  routes: Array,
  basePath: String,
  curIndent: Number,
});
</script>
<style>
</style>
