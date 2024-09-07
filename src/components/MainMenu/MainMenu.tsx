import { Menu, MenuProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import router from '@/router';

type MenuItem = Required<MenuProps>['items'][number] & {
  parentPathList: string[];
};

const renderSubRouterToMenu = (routerList: any[], parentPaths: string[] = []) => {
  const subMenu: MenuItem[] = [];
  routerList.forEach((r: any) => {
    subMenu.push({
      label: r.title || '未命名',
      key: r.path,
      icon: r.menuIcon,
      parentPathList: [...parentPaths, r.path],
      children: Array.isArray(r.children)
        ? renderSubRouterToMenu(r.children, [...parentPaths, r.path].filter(Boolean))
        : undefined,
    });
    pathToPathListMap.set(r.path, [...parentPaths, r.path].filter(Boolean));
  });
  return subMenu;
};

const renderMenuFromRouter = (router: any[], parentPaths: string[] = []) => {
  const homeRoute = router[1];
  const menuItems = [];
  menuItems.push({
    label: homeRoute.title || '未命名',
    key: homeRoute.path,
    icon: homeRoute.menuIcon,
    parentPathList: [...parentPaths, homeRoute.path],
    children: Array.isArray(homeRoute.children)
      ? renderSubRouterToMenu(homeRoute.children, [...parentPaths, homeRoute.path].filter(Boolean))
      : undefined,
  });
  pathToPathListMap.set(homeRoute.path, [...parentPaths, homeRoute.path]);
  return menuItems[0]?.children as MenuItem[];
};

const pathToPathListMap = new Map<string, string[]>();

const MainMenu: React.FC = () => {
  // 组件加载完成
  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   if (!token) {
  //     navigateTo("/login", { replace: true })
  //   }
  // }, [])
  // 当前路由信息

  const navigateTo = useNavigate();
  const currentRoute = useLocation();

  const menuItems = renderMenuFromRouter(router);

  // 菜单展开项的初始值
  const defaultOpenKeys = useMemo(() => {
    return pathToPathListMap.get(currentRoute.pathname) as string[];
  }, [currentRoute]);

  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys([...keys]);
  };

  const menuClick: MenuProps['onClick'] = (e) => {
    const { keyPath } = e;
    const openKeys = [...keyPath].slice(1);
    setOpenKeys(openKeys);
    navigateTo(e.key);
  };

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[currentRoute.pathname]}
      mode="inline"
      items={menuItems}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={menuClick}
    />
  );
};
export default MainMenu;
