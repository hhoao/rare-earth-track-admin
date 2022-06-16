export default [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import( /* webpackChunkName: "404" */ '@/views/error/404'),
        hidden: true
    }
]