import { HomeOutlined, UserOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { Menu, MenuProps } from "antd"
import { useNavigate, useLocation } from "react-router-dom"

type MenuItem = Required<MenuProps>["items"][number]
const items: MenuItem[] = [
  {
    label: "登录页面",
    key: "/login/",
    icon: <UserOutlined />,
  },
  {
    label: "案例-1",
    key: "/demo-1/index",
    icon: <HomeOutlined />
  },
  {
    label: "案例-2",
    key: "/demo-2/index",
    icon: <HomeOutlined />
  },
  {
    label: "首页",
    key: "/index",
    icon: <HomeOutlined />
  },
  {
    label: "个人中心",
    key: "/user/",
    icon: <UserOutlined />,
    children: [
      {
        label: "列表页",
        key: "/user/list"
      },
      {
        label: "详情页",
        key: "/user/detail"
      },
      {
        label: "创建页",
        key: "/user/create"
      },
    ]
  },
  {
    label: "音乐中心",
    key: "/music/",
    icon: <UserOutlined />,
    children: [
      {
        label: "列表页",
        key: "/music/list"
      },
      {
        label: "详情页",
        key: "/music/detail"
      },
    ]
  },
  {
    label: "test",
    key: "test",
    icon: <UserOutlined />,
    children: [
      {
        label: "测试01",
        key: "01",
        children: [
          {
            label: "01页面",
            key: "/test/01"
          }
        ]
      }
    ]
  },
  {
    label: "404页面",
    key: "/not-found/",
    icon: <UserOutlined />,
  }
]
const getNodeMap = (node: any, parent?: string | undefined, leave: number = 0) => {
  node.parent = parent
  node.leave = leave
  const nodeMap = [ node ]
  if (node.children && node.children.length) {
    leave++
    node.children.forEach((item: any) => nodeMap.push(...getNodeMap(item, node.key, leave)))
  }
  return nodeMap
}
const getTreeMap = (tree: any) => {
  const treeMap: [] = []
  tree.forEach((node: any) => {
    // @ts-ignore
    treeMap.push(...getNodeMap(node))
  })
  return treeMap
}
const MainMenu: React.FC = () => {
  // 编程式跳转路由,利用到 hooks
  const navigateTo = useNavigate()
  // 组件加载完成
  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   if (!token) {
  //     navigateTo("/login", { replace: true })
  //   }
  // }, [])
  // 当前路由信息
  const currentRoute = useLocation()
  const getTreeMenuList = getTreeMap(items)
  const getNowActive = (currentPath?: string | undefined, arr: [] = getTreeMenuList, resultList: string[] = []) => {
    const path = currentPath ? currentPath : currentRoute.pathname
    const currentMenuObj: any = arr.find((item: { key: string }) => item.key === path)
    if (currentMenuObj) {
      resultList.unshift(currentMenuObj.key)
      currentMenuObj.parent ? getNowActive(currentMenuObj.parent, arr, resultList) : ""
    }
    return resultList
  }
  // 菜单展开项的初始值
  let firstOpenKey: string[] = getNowActive()
  const [ openKeys, setOpenKeys ] = useState(firstOpenKey)
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys([ ...keys ])
  }
  const menuClick: MenuProps["onClick"] = (e) => {
    console.log('e.key: ', e.key);
    navigateTo(e.key)
    setOpenKeys(getNowActive(e.key))
  }

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={ [ currentRoute.pathname ] }
      mode="inline"
      items={ items }
      openKeys={ openKeys }
      onOpenChange={ onOpenChange }
      onClick={ menuClick }
    />
  )
}
export default MainMenu