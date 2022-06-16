import Layout from "@/views/layout/Layout";

export default [
    {
        path: '',
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/home'),
                meta: {title: '首页', icon: 'home'},
                hidden: false
            }
        ]
    }
]