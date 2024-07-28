import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import {
  DashboardOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Header from '../components/adminHeader';
import '../styles/AdminLayout.css'; 

const { Sider, Content } = Layout;


function AdminLayout() {
  return (
    <Layout className="admin-layout min-h-screen">
      <Header />
      <Layout>
        <Sider width={200} className="sidebar site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['/dashboard']}
            style={{ height: 'calc(100% - 64px)', overflowY: 'auto' }}
            theme="light"
          >
            <Menu.Item key="1" icon={<DashboardOutlined />} className="menu-item">
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreOutlined />} className="menu-item">
              <Link to="/dashboard/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<InfoCircleOutlined />} className="menu-item">
              <Link to="#">About</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<PhoneOutlined />} className="menu-item">
              <Link to="/dashboard/contacts">Contacts</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />} className="menu-item">
              <Link to="/dashboard/users">Users/Accounts</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="main-content p-4">
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
