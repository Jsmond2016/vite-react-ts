import {
  CustomerServiceOutlined,
  DotChartOutlined,
  ExclamationCircleOutlined,
  FormatPainterOutlined,
  FormOutlined,
  HomeOutlined,
  LineChartOutlined,
  LockOutlined,
  PieChartOutlined,
  ProductOutlined,
  ProfileOutlined,
  TableOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
import React from 'react';
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

const ProductIndex = lazy(() => import('@/views/product/index'));
const ProductList = lazy(() => import('@/views/product/list/index'));
const UserDetail = lazy(() => import('@/views/product/detail/index'));

const MusicList = lazy(() => import('@/views/music/music-list/index'));
const MusicDetail = lazy(() => import('@/views/music/music-detail/index'));

const NormalEchartsPage = lazy(() => import('@/views/NormalComponentsSamples/ECharts'));
const NormalStaticsPage = lazy(() => import('@/views/NormalComponentsSamples/Statics'));

// ===
const BasicTablePage = lazy(() => import('@/views/ListSamples/TableList'));
const EditTablePage = lazy(() => import('@/views/ListSamples/EditTableList'));
const NormalListPage = lazy(() => import('@/views/ListSamples/TableList'));

// ====
const DataBigScreenPage = lazy(() => import('@/views/DataBigScreen'));
const PermissionPage = lazy(() => import('@/views/PermissionManagement/PagePermission'));
const ButtonPermissionPage = lazy(() => import('@/views/PermissionManagement/ButtonPermission'));

// ===
const BasicFormPage = lazy(() => import('@/views/FormSamples/FormPage'));
const StepFormPage = lazy(() => import('@/views/FormSamples/StepFormPage'));
const AdvanceFormPage = lazy(() => import('@/views/FormSamples/AdvanceFormPage'));

// ===
const BasicDetailPage = lazy(() => import('@/views/DetailSamples/NormalDetail'));

// ===

const AboutPage = lazy(() => import('@/views/About'));

const widthLoading = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading</div>}>{comp}</React.Suspense>
);

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/',
    title: '首页',
    isAccessed: true,
    element: <MainLayout />,
    children: [
      {
        path: '/home',
        title: 'Home',
        menuIcon: <HomeOutlined />,
        element: widthLoading(<Index />),
      },
      {
        title: '数据大屏',
        path: '/static',
        menuIcon: <PieChartOutlined />,
        element: widthLoading(<DataBigScreenPage />),
      },
      {
        title: '权限管理',
        path: '/permission-management',
        menuIcon: <LockOutlined />,
        children: [
          {
            title: '页面权限',
            path: '/permission-management/page-permission',
            menuIcon: <LockOutlined />,
            element: widthLoading(<PermissionPage />),
          },
          {
            title: '按钮级权限',
            path: '/permission-management/button-permission',
            menuIcon: <LockOutlined />,
            element: widthLoading(<ButtonPermissionPage />),
          },
        ],
      },
      {
        title: '常用组件',
        path: '/normal-components',
        menuIcon: <HomeOutlined />,
        children: [
          {
            title: 'E-Charts 图表页',
            path: '/normal-components/e-charts',
            menuIcon: <DotChartOutlined />,
            element: widthLoading(<NormalEchartsPage />),
          },
          {
            title: '统计数值',
            path: '/normal-components/statics',
            menuIcon: <LineChartOutlined />,
            element: widthLoading(<NormalStaticsPage />),
          },
        ],
      },
      {
        title: '列表页',
        path: '/list-page',
        menuIcon: <TableOutlined />,
        children: [
          {
            title: '正常Table',
            path: '/list-page/table',
            menuIcon: <TableOutlined />,
            element: widthLoading(<BasicTablePage />),
          },
          {
            title: 'EditTable',
            path: '/list-page/edit-table',
            menuIcon: <TableOutlined />,
            element: widthLoading(<EditTablePage />),
          },
          {
            title: 'List列表',
            path: '/list-page/list',
            menuIcon: <UnorderedListOutlined />,
            element: widthLoading(<NormalListPage />),
          },
        ],
      },
      {
        title: '表单页',
        path: '/form-samples',
        menuIcon: <FormOutlined />,
        children: [
          {
            title: '基础表单',
            path: '/form-samples/basic-form',
            menuIcon: <FormOutlined />,
            element: widthLoading(<BasicFormPage />),
          },
          {
            title: '分步表单',
            path: '/form-samples/step-form',
            menuIcon: <FormatPainterOutlined />,
            element: widthLoading(<StepFormPage />),
          },
          {
            title: '高级表单',
            path: '/form-samples/advance-form',
            menuIcon: <ProfileOutlined />,
            element: widthLoading(<AdvanceFormPage />),
          },
        ],
      },
      {
        title: '详情页示例',
        path: '/detail-samples',
        menuIcon: <ProfileOutlined />,
        children: [
          {
            title: '基础详情页',
            path: '/detail-samples/basic-detail',
            menuIcon: <ProfileOutlined />,
            element: widthLoading(<BasicDetailPage />),
          },
        ],
      },

      {
        title: '商品管理',
        path: '/product/',
        menuIcon: <ProductOutlined />,
        element: widthLoading(<ProductIndex />),
        children: [
          {
            title: '商品列表',
            path: '/product/list',
            menuIcon: <ProductOutlined />,
            element: widthLoading(<ProductList />),
          },
          {
            title: '商品详情',
            path: '/product/detail/:id',
            menuIcon: <ProductOutlined />,
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
        menuIcon: <CustomerServiceOutlined />,
        // element: widthLoading(<ProductIndex />),
        children: [
          {
            title: '音乐列表',
            path: '/music/list',
            menuIcon: <CustomerServiceOutlined />,
            element: widthLoading(<MusicList />),
          },
          {
            title: '音乐详情',
            path: '/music/detail',
            menuIcon: <CustomerServiceOutlined />,
            element: widthLoading(<MusicDetail />),
          },
        ],
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
        title: '关于项目',
        path: '/about/',
        menuIcon: <ExclamationCircleOutlined />,
        element: widthLoading(<AboutPage />),
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
