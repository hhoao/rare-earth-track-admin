import Layout from "@/components/Layout";

export default [
    {
        name: 'ums',
        path: '/ums',
        component: Layout,
        redirect: '/ums/admin',
        meta: {title: '用户', icon: 'ums'},
        hidden: false,
        children: [
            {
                name: 'admin',
                path:'admin',
                component: () => import('@/views/ums/admin'),
                meta: {title: '用户列表', icon: 'ums-admin'},
                hidden: false
            },
            {
                name: 'role',
                path: 'role',
                component: () => import('@/views/ums/role'),
                meta: {title: '角色列表', icon: 'ums-role'},
                hidden: false
            },
            {
                name: 'resource',
                path: 'resource',
                component: () => import('@/views/ums/resource'),
                meta: {title: '权限列表', icon: 'ums-resource'},
                hidden: false
            },
            {
                name: 'menu',
                path: 'menu',
                component: () => import('@/views/ums/menu'),
                meta: {title: '权限列表', icon: 'ums-menu'},
                hidden: false
            },

        ]
    },
    {
        name: 'pms',
        path: '/pms',
        redirect: '/pms/product',
        component: Layout,
        meta: {title: '产品', icon: 'product'},
        hidden: false,
        children: [
            {
                name: 'product',
                path: 'product',
                component: () => import('@/views/pms/product'),
                meta: {title: '产品列表', icon: 'product-list'},
                hidden: false,
            },
            {
                name: 'factory',
                path: 'factory',
                component: () => import('@/views/pms/factory'),
                meta: {title: '工厂列表', icon: 'factory-list'}
            }
        ]
    },
    {
        name: 'sms',
        path: '/sms',
        redirect: '/sms/feedback',
        component: Layout,
        meta: {title: '营销', icon: 'sms'},
        hidden: false,
        children: [
            {
                name: 'feedback',
                path: 'feedback',
                component: () => import('@/views/sms/feedback'),
                meta: {title: '反馈', icon: 'sms-feedback'},
                hidden: false,
            },
        ]
    }
]
