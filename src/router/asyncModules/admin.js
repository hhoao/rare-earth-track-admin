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
                name: 'material',
                path: 'material',
                component: () => import('@/views/pms/material'),
                meta: {title: '材料列表', icon: 'pms-material'},
                hidden: false,
            },
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
    },
    {
        name: 'fms',
        path: '/fms',
        redirect: '/fms/factory',
        component: Layout,
        meta: {title: '工厂', icon: 'fms'},
        hidden: false,
        children: [
            {
                name: 'factory',
                path: 'factory',
                component: () => import('@/views/fms/factory'),
                meta: {title: '工厂列表', icon: 'fms-factory'},
                hidden: false,
            },
            {
                name: 'member',
                path: 'member',
                component: () => import('@/views/fms/member'),
                meta: {title: '成员列表', icon: 'fms-member'},
                hidden: false,
            },
            {
                name: 'job',
                path: 'job',
                component: () => import('@/views/fms/job'),
                meta: {title: '职位列表', icon: 'fms-job'},
                hidden: false,
            },

            {
                name: 'permission',
                path: 'permission',
                component: () => import('@/views/fms/permission'),
                meta: {title: '权限列表', icon: 'fms-permission'},
                hidden: false,
            }
        ]
    }
]
