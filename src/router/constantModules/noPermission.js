export default [
    {
        path: '/noPermission',
        name: 'noPermission',
        hidden: true,
        meta: {
            index: 1
        },
        component: () => import( /* webpackChunkName: "NoPermission" */ '@/views/error/NoPermission')
    },
]