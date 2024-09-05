import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import MainLayout from '@/components/main-layout';
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
        path: '/index',
        element: widthLoading(<Index />),
      },
      {
        path: '/demos/',
        // element: widthLoading(<UserIndex />),
        children: [
          {
            path: '/demos/demo-1/index',
            element: widthLoading(<Demo1 />),
          },
          // {
          // 	path: "/demos/demo-2/index",
          // 	element: widthLoading(<Demo2 />),
          // },
          {
            path: '/demos/demo-3/index',
            element: widthLoading(<Demo3 />),
          },
          {
            path: '/demos/demo-4/index',
            element: widthLoading(<Demo4 />),
          },
          {
            path: '/demos/demo-5/index',
            element: widthLoading(<Demo5 />),
          },
          {
            path: '/demos/demo-6/index',
            element: widthLoading(<Demo6 />),
          },
          {
            path: '/demos/demo-7/index',
            element: widthLoading(<Demo7 />),
          },
        ],
      },
      {
        path: '/product/',
        element: widthLoading(<UserIndex />),
        children: [
          {
            path: '/product/list',
            element: widthLoading(<UserList />),
          },
          {
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
        path: '/music/',
        element: widthLoading(<UserIndex />),
        // element: UserIndex,
        children: [
          {
            path: '/music/list',
            element: widthLoading(<MusicList />),
          },
          {
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
