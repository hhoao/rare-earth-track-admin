import Layout from "@/components/Layout";
import {shallowRef} from 'vue';
export default [
  {
    path: '',
    component: shallowRef(Layout),
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
