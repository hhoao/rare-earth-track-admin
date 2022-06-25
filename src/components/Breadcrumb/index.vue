<template>
  <el-breadcrumb class="app-breadcrumb" v-if="levelList" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <template v-if="item.meta && item.meta.title">
          <span v-if="index===levelList.length-1" class="no-redirect">
            {{ item.meta.title }}
          </span>
          <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
        </template>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {ref, watch} from 'vue';

const homeRoute = {
  path: '/home',
  meta: {title: '首页'},
};
const router = useRouter();
const levelList = ref(null);
const getBreadcrumb = () => {
  let matched = router.currentRoute.value.matched.filter(item => item.name);
  const first = matched[0];
  if (first && first.name !== 'home') {
    matched = [homeRoute].concat(matched);
  }
  levelList.value = matched;
};
getBreadcrumb();

watch(() => router.currentRoute.value, () => getBreadcrumb());

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
