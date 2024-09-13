import { Breadcrumb, Layout, Row, Space, Tabs } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '@/assets/antd-logo.svg';
import MainMenu from '@/components/MainMenu';
import { useMenuStore } from '@/store/global';

import ToolBar from '../ToolBar';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC = () => {
  const { isMenuClosed, toggleMenuOpenStatus, setCurTabKey } = useMenuStore();

  const { curOpenedMenuItems, openedPageTabs, curTabKey } = useMenuStore();

  const breadItems = curOpenedMenuItems.map((menu) => ({
    href: menu.isAccessed ? menu.key : undefined,
    title: (
      <Space size="small">
        {menu.icon}
        {menu.label}
      </Space>
    ),
  }));

  const tabItems = openedPageTabs.map((menu) => ({
    label: (
      <Space size="small">
        {menu.icon}
        {menu.label}
      </Space>
    ),
    key: menu.key,
  }));

  return (
    <Layout>
      <Sider collapsible collapsed={isMenuClosed} onCollapse={() => toggleMenuOpenStatus()}>
        <Row justify="center" align="middle" className="h-[56px]">
          <Space size="small">
            <img src={Logo} alt="antd-logo" width={32} />
            {!isMenuClosed && <h1 className="text-white text-size-lg">Vite-AntD-Admin</h1>}
          </Space>
        </Row>
        <MainMenu />
      </Sider>
      <Layout className="h-screen">
        <Header className="flex items-center justify-between h-[56px] p-8 bg-white">
          <Breadcrumb items={breadItems} className="leading-normal" />
          <ToolBar />
        </Header>
        <Tabs items={tabItems} type="editable-card" activeKey={curTabKey} onChange={setCurTabKey} />
        <Content className="p-10 pb-0  overflow-auto ">
          <Outlet />
        </Content>
        <Footer className="h-[48px] flex justify-center items-center border-t-neutral border-t-solid border-t-2">
          Ant Design ©2022 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
