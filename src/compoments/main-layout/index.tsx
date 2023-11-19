import { Breadcrumb, Layout, Typography } from "antd"
import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import MainMenu from "@/compoments/main-menu"

const { Header, Content, Footer, Sider } = Layout

const breadCrumbItems = [
  {
    title: 'User'
  },
  {
    title: <Typography.Link href="">Bill</Typography.Link>
  }
]

const MainLayout: React.FC = () => {
  const [ collapsed, setCollapsed ] = useState(false)
  return (
    <Layout style={ { minHeight: "100vh" } }>
      <Sider collapsible collapsed={ collapsed } onCollapse={ value => setCollapsed(value) }>
        <div className="home-logo" />
        <MainMenu />
      </Sider>
      <Layout className="site-layout" style={ { height: "100vh" } }>
        <Header className="site-layout-background" style={ { padding: "0 16px" } }>
          <Breadcrumb items={breadCrumbItems} style={ { lineHeight: "64px" } } />
        </Header>
        <Content style={ { margin: "10px 10px 0 10px", padding: "10px", background: "#FFFFFF", overflow: "auto" } }>
          <Outlet />
        </Content>
        <Footer style={ { textAlign: "center", padding: "0", lineHeight: "48px", height: "48px" } }>Ant Design ©2022 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
export default MainLayout
