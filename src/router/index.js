import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const routes = []
const asyncRouterContext = require.context('./asyncModules', true, /\.js$/);
const constantRouterContext = require.context('./constantModules', true, /\.js$/)
export var asyncRouterMap = []
export var constantRouterMap = []

asyncRouterContext.keys().forEach(route => {
    let routerModule = asyncRouterContext(route)
    asyncRouterMap = [...asyncRouterMap, ...(routerModule.default || routerModule)]
})
constantRouterContext.keys().forEach(route => {
    let routerModule = constantRouterContext(route)
    routes.push(...routerModule.default)
    constantRouterMap = [...constantRouterMap, ...(routerModule.default || routerModule)]
})

export default createRouter({
    history: createWebHistory(process.env["VUE_APP_BASE_URL"]),
    routes
})