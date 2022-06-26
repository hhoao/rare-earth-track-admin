import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {ElMessage} from 'element-plus'
import {getToken} from '@/utils/auth'
import {getUserMenus} from "@/api/user";

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'})
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
          //判断是否已经登陆
            if (store.getters.roleId == null) {
                getUserMenus()
                    .then(menuRes => {
                        let menus = menuRes.data;
                        if (menus == null) {
                            throw "普通用户无法登陆后台";
                        } else {
                            store.dispatch('GetInfo')
                                .then(async ()=>await store.dispatch('GenerateRoutes', menus.list)
                                    .then(() => { // 生成可访问的路由表
                                        for (let newRouter of store.getters.addRouters){
                                            router.addRoute(newRouter)
                                        }
                                        router.replace(to.path)
                                    })
                                )
                        }
                    })
                    .catch((err) => {
                        store.dispatch('FedLogOut').then(() => {
                            ElMessage.error(err || 'Verification failed, please login again')
                            next({path: '/login'})
                        })
                    })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
