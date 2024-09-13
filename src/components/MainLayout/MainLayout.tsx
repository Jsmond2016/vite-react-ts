import { Breadcrumb, Layout, message, Row, Space, Tabs } from 'antd';
import { last } from 'ramda';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Logo from '@/assets/antd-logo.svg';
import MainMenu from '@/components/MainMenu';
import { useMenuStore } from '@/store/global';

import ToolBar from '../ToolBar';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC = () => {
  const { isMenuClosed, toggleMenuOpenStatus, setCurTabKey, setOpenedPageTabs } = useMenuStore();

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
      <Space size="small" onClick={() => navigateTo(menu.key)}>
        {menu.icon}
        {menu.label}
      </Space>
    ),
    key: menu.key,
  }));

  const navigateTo = useNavigate();

  const handleEditTab = (key: string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      if (['/', '/home'].includes(key)) {
        message.warning('首页不允许删除');
        return;
      }
      const newWorkTabs = openedPageTabs.filter((tab) => tab.key !== key);
      const tabKey = last(newWorkTabs).key;
      navigateTo(tabKey);
      setOpenedPageTabs(newWorkTabs);
    }
  };

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
        <Tabs
          className="bg-white border-t-solid border-t-coolgray border-t-1"
          items={tabItems}
          type="editable-card"
          activeKey={curTabKey}
          onChange={setCurTabKey}
          onEdit={handleEditTab}
          hideAdd
        />
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
