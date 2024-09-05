import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    label: '登录页面',
    key: '/login/',
    icon: <UserOutlined />,
  },
  {
    label: '面试测试',
    key: '/demos/',
    icon: <HomeOutlined />,
    children: [
      {
        label: '测试jotai',
        key: '/demos/demo-7/index',
        icon: <HomeOutlined />,
      },
      {
        label: '页面生成器',
        key: '/demos/demo-6/index',
        icon: <HomeOutlined />,
      },
      {
        label: '图片文件查看器-新',
        key: '/demos/demo-1/index',
        icon: <HomeOutlined />,
      },
      {
        label: 'React 闭包陷阱',
        key: '/demos/demo-3/index',
      },
      {
        label: '水印案例',
        key: '/demos/demo-4/index',
      },
      {
        label: 'hook 返回组件',
        key: '/demos/demo-5/index',
      },
    ],
  },

  {
    label: '首页',
    key: '/index',
    icon: <HomeOutlined />,
  },
  {
    label: '商品管理',
    key: '/product/',
    icon: <UserOutlined />,
    children: [
      {
        label: '列表页',
        key: '/product/list',
      },
      {
        label: '详情页',
        key: '/product/detail/-1',
      },
      // {
      //   label: '创建页',
      //   key: '/product/create',
      // },
    ],
  },
  {
    label: '音乐中心',
    key: '/music/',
    icon: <UserOutlined />,
    children: [
      {
        label: '列表页',
        key: '/music/list',
      },
      {
        label: '详情页',
        key: '/music/detail',
      },
    ],
  },
  {
    label: 'test',
    key: 'test',
    icon: <UserOutlined />,
    children: [
      {
        label: '测试01',
        key: '01',
        children: [
          {
            label: '01页面',
            key: '/test/01',
          },
        ],
      },
    ],
  },
  {
    label: '404页面',
    key: '/not-found/',
    icon: <UserOutlined />,
  },
];

type MenuNode = {
  key?: string;
  parent?: string;
  leave: number;
  children?: MenuNode[];
};

const getNodeMap = (node: MenuNode, parent?: string | undefined, leave: number = 0) => {
  node.parent = parent;
  node.leave = leave;
  const nodeMap = [node];
  if (node.children && node.children.length) {
    leave++;
    node.children.forEach((item) => nodeMap.push(...getNodeMap(item, node.key, leave)));
  }
  return nodeMap;
};
const getTreeMap = (tree: MenuNode[]) => {
  const treeMap: MenuNode[] = [];
  tree.forEach((node) => {
    treeMap.push(...getNodeMap(node));
  });
  return treeMap;
};
const MainMenu: React.FC = () => {
  // 编程式跳转路由,利用到 hooks
  const navigateTo = useNavigate();
  // 组件加载完成
  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   if (!token) {
  //     navigateTo("/login", { replace: true })
  //   }
  // }, [])
  // 当前路由信息
  const currentRoute = useLocation();
  const getTreeMenuList = getTreeMap(items as MenuNode[]);
  const getNowActive = (
    currentPath?: string | undefined,
    arr: MenuNode[] = getTreeMenuList,
    resultList: string[] = [],
  ) => {
    const path = currentPath ? currentPath : currentRoute.pathname;
    const currentMenuObj = arr.find((item) => item!.key === path);
    if (currentMenuObj) {
      resultList.unshift(currentMenuObj.key as string);
      currentMenuObj.parent ? getNowActive(currentMenuObj.parent, arr, resultList) : '';
    }
    return resultList;
  };
  // 菜单展开项的初始值
  const firstOpenKey: string[] = getNowActive();
  const [openKeys, setOpenKeys] = useState(firstOpenKey);
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys([...keys]);
  };
  const menuClick: MenuProps['onClick'] = (e) => {
    console.log('e.key: ', e.key);
    navigateTo(e.key);
    setOpenKeys(getNowActive(e.key));
  };

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[currentRoute.pathname]}
      mode="inline"
      items={items}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={menuClick}
    />
  );
};
export default MainMenu;
