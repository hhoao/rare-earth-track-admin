<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template v-if="item.children">
        <router-link v-if="isHome(item) && item.children && !item.children[0].children&&!item.alwaysShow"
                     :to="item.path+'/'+item.children[0].path"
                     :key="item.children[0].name">
          <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
            <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon"
                      :icon-class="item.children[0].meta.icon"></svg-icon>
            <span v-if="item.children[0].meta&&item.children[0].meta.title"
                  slot="title">{{ item.children[0].meta.title }}</span>
          </el-menu-item>
        </router-link>
        <el-sub-menu v-else :index="item.name||item.path" :key="item.name">
          <template #title>
            <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span v-if="item.meta&&item.meta.title">{{ item.meta.title }}</span>
          </template>
          <template v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0"
                            :routes="[child]" :key="child.path"></sidebar-item>
              <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                <el-menu-item :index="item.path+'/'+child.path">
                  <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                  <span v-if="child.meta&&child.meta.title" slot="title">{{ child.meta.title }}</span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isHome(item){
      if (item.name && item.name === 'home'){
        return true;
      }else if ((item.children)){
        for (let itemChildren of item.children){
          if (itemChildren.name === 'home'){
            return true;
          }
        }
      }
      return false;
    },
  }
}
</script>
