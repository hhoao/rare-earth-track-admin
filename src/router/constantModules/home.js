import Layout from "@/components/Layout";
export default [
  {
    path: '',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: {title: '首页', icon: 'home'},
        hidden: false,
      },
    ],
  },
];
