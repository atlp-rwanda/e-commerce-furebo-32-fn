import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();

  const getSelectedKeys = () => {
    const { pathname } = location;
    switch (pathname) {
      case '/dashboard':
        return ['1'];
      case '/products':
        return ['2'];
      case '/about':
        return ['3'];
      case '/contacts':
        return ['4'];
      case '/dashboard/users':
        return ['5'];
      default:
        return ['1']; // Default to Dashboard if no match
    }
  };

  return (
    <Sider width={200} className="site-layout-background" style={{ height: '100%' }}>
      <div className="logo flex items-center justify-center">
        <img src="/images/logo.png" alt="Logo" className="logo-img" />
      </div>
      <Menu
        mode="inline"
        selectedKeys={getSelectedKeys()}
        style={{ height: 'calc(100% - 64px)', overflowY: 'auto', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<InfoCircleOutlined />}>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<PhoneOutlined />}>
          <Link to="/contacts">Contacts</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined />}>
          <Link to="/dashboard/users">Users/Accounts</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
