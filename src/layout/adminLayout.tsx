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

const { Sider, Content } = Layout;

const getSelectedKeys = () => {
  // Implement logic to get the selected key based on the current route
  return ['0']; // Example static return value
};

function AdminLayout() {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout>
        <Sider width={200} className="site-layout-background h-full" style={{ height: '100vh'}}>
          <Menu
            mode="inline"
            selectedKeys={getSelectedKeys()}
            style={{ height: 'calc(100% - 64px)', overflowY: 'auto', borderRight: 0,backgroundColor:'#5A7BFA' }}
          >
            <Menu.Item key="1" icon={<DashboardOutlined />} style={{color:'#fff'}}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreOutlined />}>
              <Link to="/dashboard/products" style={{color:'#fff'}}>Products</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<InfoCircleOutlined />}>
              <Link to="#" style={{color:'#fff'}}>About</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<PhoneOutlined />}>
              <Link to="/dashboard/contacts" style={{color:'#fff'}}>Contacts</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />}>
              <Link to="/dashboard/users" style={{color:'#fff'}}>Users/Accounts</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="p-4">
          <Content className="">
            <Outlet />
          
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
