import { Menu, MenuProps } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import router from '@/router';
import { useMenuStore } from '@/store/global';

type MenuItem = Required<MenuProps>['items'][number] & {
  parentPathList: string[];
};

const menuKeyMap = new Map();

const renderSubRouterToMenu = (routerList: any[], parentPaths: string[] = []) => {
  const subMenuItem: MenuItem[] = [];
  routerList.forEach((r: any) => {
    const subMenu = {
      label: r.title || '未命名',
      key: r.path,
      icon: r.menuIcon,
      isAccessed: r.isAccessed ?? !(r.children?.length > 0), // 父菜单不能跳转；
      parentPathList: [...parentPaths, r.path],
      children: Array.isArray(r.children)
        ? renderSubRouterToMenu(r.children, [...parentPaths, r.path].filter(Boolean))
        : undefined,
    };
    menuKeyMap.set(r.path, subMenu);
    subMenuItem.push(subMenu);
  });
  return subMenuItem;
};

const renderMenuFromRouter = (router: any[], parentPaths: string[] = []) => {
  const homeRoute = router[1];
  const menuItems = [];
  const menuItem = {
    label: homeRoute.title || '未命名',
    key: homeRoute.path,
    icon: homeRoute.menuIcon,
    isAccessed: homeRoute.isAccessed ?? !(homeRoute.children?.length > 0), // 父菜单不能跳转；
    parentPathList: [...parentPaths, homeRoute.path],
    children: Array.isArray(homeRoute.children)
      ? renderSubRouterToMenu(homeRoute.children, [...parentPaths, homeRoute.path].filter(Boolean))
      : undefined,
  };
  menuKeyMap.set(homeRoute.path, menuItem);
  menuItems.push(menuItem);
  return menuItems[0]?.children as MenuItem[];
};

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

  const { setMenuList, menuList } = useMenuStore();
  const { openedMenuKeys, setOpenedMenuKeys } = useMenuStore();

  useEffect(() => {
    const menuItems = renderMenuFromRouter(router);
    setMenuList(menuItems);
  }, [router]);

  const { setCurOpenedMenuItems } = useMenuStore();

  useEffect(() => {
    // 菜单展开项的初始值
    const curMenuItem = menuKeyMap.get(currentRoute.pathname);
    const openedKeys = curMenuItem.parentPathList;
    setOpenedMenuKeys(openedKeys);
    const curOpenedMenuItems = openedKeys.map((v) => menuKeyMap.get(v));
    setCurOpenedMenuItems(curOpenedMenuItems);
  }, [currentRoute]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenedMenuKeys([...keys]);
  };

  const handleSelect = (ev) => {
    const { keyPath } = ev;
    const openKeys = [...keyPath].slice(1);
    const curMenuItem = openKeys.map((key) => menuKeyMap.get(key));
    setCurOpenedMenuItems(curMenuItem);
    navigateTo(ev.key);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      items={menuList}
      defaultSelectedKeys={[currentRoute.pathname]}
      openKeys={openedMenuKeys}
      selectedKeys={openedMenuKeys}
      onSelect={handleSelect}
      onOpenChange={onOpenChange}
    />
  );
};
export default MainMenu;
