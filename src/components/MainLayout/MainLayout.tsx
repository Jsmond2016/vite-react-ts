import { Breadcrumb, Layout, Row, Space, theme } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '@/assets/antd-logo.svg';
import MainMenu from '@/components/MainMenu';
import { useMenuStore, useThemeConfigStore } from '@/store/global';

import ToolBar from '../ToolBar';
import WorkTab from '../WorkTab';

const { Header, Content, Footer, Sider } = Layout;
const { useToken } = theme;
const MainLayout: React.FC = () => {
  const { isMenuCollapsed, setIsMenuCollapsed } = useMenuStore();

  const { curOpenedMenuItems } = useMenuStore();
  const { token } = useToken();

  const { isShowBreadcrumb, isShowBreadcrumbIcon, isShowFooter, isUseWorkTab } =
    useThemeConfigStore();

  const breadItems = curOpenedMenuItems.map((menu, idx, list) => ({
    // 最后一个 item 是自己，不允许点击
    href: menu.isAccessed && idx !== list.length - 1 ? menu.key : undefined,
    title: (
      <Space size="small" style={{ color: token.colorWhite }}>
        {isShowBreadcrumbIcon && menu.icon}
        {menu.label}
      </Space>
    ),
  }));

  // const isDarkMode = themeAlgoMode.includes('dark');

  return (
    <Layout>
      <Sider collapsible collapsed={isMenuCollapsed} onCollapse={() => setIsMenuCollapsed()}>
        <Row justify="center" align="middle" className="h-[56px]">
          <Space size="small">
            <img src={Logo} alt="antd-logo" width={32} />
            {!isMenuCollapsed && <h1 className="text-white text-size-lg">Vite-AntD-Admin</h1>}
          </Space>
        </Row>
        <MainMenu />
      </Sider>
      <Layout className="h-screen">
        <Header
          style={{ color: token.colorWhite }}
          className="flex items-center justify-between h-[56px] p-8"
        >
          {isShowBreadcrumb ? (
            <Breadcrumb
              style={{ color: token.colorWhite }}
              items={breadItems}
              className="leading-normal"
            />
          ) : (
            <div />
          )}
          <ToolBar />
        </Header>
        {isUseWorkTab && <WorkTab />}
        <Content className="p-10 pb-0  overflow-auto ">
          <Outlet />
        </Content>
        {isShowFooter && (
          <Footer className="h-[48px] flex justify-center items-center border-t-neutral border-t-solid border-t-2">
            Ant Design ©2022 Created by Ant UED
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};
export default MainLayout;
