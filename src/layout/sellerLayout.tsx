import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Layout, Menu, theme } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { Bell, Heart, LayoutDashboard, ShoppingBasket, Store } from 'lucide-react';
import { UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const SellerLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="overflow-hidden">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical flex justify-center items-end">
          <img src="logo.png" width={100} alt="logo" />
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']} className="h-[87vh]">
          <Menu.Item key="1" icon={<LayoutDashboard />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<Store />}>
            <Link to="/collection">Collections</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingBasket />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<Heart />}>
            <Link to="/wishlist">Wishlist</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="pr-4 flex gap-4">
            <div>
              <Badge count={1}>
                <Avatar shape="square" icon={<Bell />} />
              </Badge>
            </div>
            <div>
              <Avatar shape="square" icon={<UserOutlined />} />
            </div>
          </div>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: '#efefef',
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SellerLayout;
