import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import MainLayout from '@/components/MainLayout';
import Login from '@/views/login';
import NotFind from '@/views/not-find';

// TODO: 使用 import.glob 重构 https://cn.vitejs.dev/guide/features#glob-import

/**
 * 路由懒加载
 * 外框需要嵌套一层 loading => React.Suspense
 */
const Index = lazy(() => import('@/views/index'));

const Demo1 = lazy(() => import('@/views/demos/demo-1/index'));

const Demo3 = lazy(() => import('@/views/demos/demo-3/index'));
const Demo4 = lazy(() => import('@/views/demos/demo-4/index'));
const Demo5 = lazy(() => import('@/views/demos/demo-5/index'));
const Demo6 = lazy(() => import('@/views/demos/demo-6/index'));
const Demo7 = lazy(() => import('@/views/demos/demo-7/index'));

const UserIndex = lazy(() => import('@/views/product/index'));
const UserList = lazy(() => import('@/views/product/list/index'));
const UserDetail = lazy(() => import('@/views/product/detail/index'));

const MusicList = lazy(() => import('@/views/music/music-list/index'));
const MusicDetail = lazy(() => import('@/views/music/music-detail/index'));

const widthLoading = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading</div>}>{comp}</React.Suspense>
);
const routes = [
  {
    path: '/',
    element: <Navigate to="/index" />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        title: '首页',
        path: '/index',
        menuIcon: <HomeOutlined />,
        element: widthLoading(<Index />),
      },
      {
        path: '/demos',
        title: '测试demo',
        menuIcon: <UserOutlined />,
        children: [
          {
            title: '图片文件查看器-新',
            path: '/demos/demo-1/index',
            element: widthLoading(<Demo1 />),
          },
          {
            title: 'React 闭包陷阱',
            path: '/demos/demo-3/index',
            element: widthLoading(<Demo3 />),
          },
          {
            title: '水印案例',
            path: '/demos/demo-4/index',
            element: widthLoading(<Demo4 />),
          },
          {
            title: 'hook 返回组件',
            path: '/demos/demo-5/index',
            element: widthLoading(<Demo5 />),
          },
          {
            title: '页面生成器',
            path: '/demos/demo-6/index',
            element: widthLoading(<Demo6 />),
          },
          {
            title: '测试jotai',
            path: '/demos/demo-7/index',
            element: widthLoading(<Demo7 />),
          },
        ],
      },
      {
        title: '商品管理',
        path: '/product/',
        menuIcon: <UserOutlined />,
        element: widthLoading(<UserIndex />),
        children: [
          {
            title: '商品列表',
            path: '/product/list',
            element: widthLoading(<UserList />),
          },
          {
            title: '商品详情',
            path: '/product/detail/:id',
            element: widthLoading(<UserDetail />),
          },
          // {
          //   path: '/user/create',
          //   element: widthLoading(<UserCreate />),
          // },
        ],
      },
      {
        title: '音乐中心',
        path: '/music/',
        menuIcon: <UserOutlined />,
        element: widthLoading(<UserIndex />),
        // element: UserIndex,
        children: [
          {
            title: '音乐列表',
            path: '/music/list',
            element: widthLoading(<MusicList />),
          },
          {
            title: '音乐详情',
            path: '/music/detail',
            element: widthLoading(<MusicDetail />),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFind />,
  },
];
export default routes;
