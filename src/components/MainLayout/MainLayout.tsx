import { Breadcrumb, Layout, Typography } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import MainMenu from '@/components/MainMenu';

const { Header, Content, Footer, Sider } = Layout;

const breadCrumbItems = [
  {
    title: 'User',
  },
  {
    title: <Typography.Link href="">Bill</Typography.Link>,
  },
];

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <MainMenu />
      </Sider>
      <Layout className="h-screen">
        <Header className="flex items-center justify-start bg-white">
          <Breadcrumb items={breadCrumbItems} className="leading-normal" />
        </Header>
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
