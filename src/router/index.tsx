import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import MainLayout from "@/compoments/main-layout"
import Login from "@/views/login"
import NotFind from "@/views/not-find"

/**
 * 路由懒加载
 * 外框需要嵌套一层 loading => React.Suspense
 */
const Index = lazy(() => import("@/views/index"))
const Test01 = lazy(() => import("@/views/test/01"))
const UserIndex = lazy(() => import("@/views/user/index"))
const UserList = lazy(() => import("@/views/user/user-list/index"))
const UserDetail = lazy(() => import("@/views/user/user-detail/index"))
const UserCreate = lazy(() => import("@/views/user/user-create/index"))

const MusicList = lazy(() => import("@/views/music/music-list/index"))
const MusicDetail = lazy(() => import("@/views/music/music-detail/index"))

const widthLoading = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading</div>}>{comp}</React.Suspense>
)
const routes = [
  {
    path: "/",
    element: <Navigate to="/index" />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/index",
        element: widthLoading(<Index />),
      },
      {
        path: "/test/01",
        element: widthLoading(<Test01 />),
      },
      {
        path: "/user/",
        element: widthLoading(<UserIndex />),
        children: [
          {
            path: "/user/list",
            element: widthLoading(<UserList />),
          },
          {
            path: "/user/detail",
            element: widthLoading(<UserDetail />),
          },
          {
            path: "/user/create",
            element: widthLoading(<UserCreate />),
          },
        ],
      },
      {
        path: "/music/",
        element: widthLoading(<UserIndex />),
        // element: UserIndex,
        children: [
          {
            path: "/music/list",
            element: widthLoading(<MusicList />),
          },
          {
            path: "/music/detail",
            element: widthLoading(<MusicDetail />),
          }
        ],
      },
      
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFind />,
  },
]
export default routes
