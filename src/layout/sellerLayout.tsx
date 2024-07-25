import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Layout, Menu, theme,Dropdown, Space } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { TbLogout2 } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import {
  Bell,
  Heart,
  LayoutDashboard,
  ShoppingBasket,
  Store,
} from 'lucide-react';
import { useGetNotificationsQuery } from '../store/actions/notifications';
import { UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const SellerLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data } = useGetNotificationsQuery({});
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    window.location.href='/'
 };

  const items = [
    {
      label: (
        <Button type="primary" style={{ width: '160px' }} onClick={handleLogout}>
          {' '}
          <TbLogout2 /> Logout
        </Button>
      ),
      key: '0',
    },
  ];

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
              <Link to="/notifications">
                <Badge count={data?.notifications?.length}>
                  <Avatar shape="square" icon={<Bell />} />
                </Badge>
              </Link>
            </div>
        <Dropdown menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
             <NavLink to="#" className="text-white">
             <Avatar shape="square" icon={<UserOutlined />} />
            </NavLink>
          </Space>
          </a>
        </Dropdown>


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
