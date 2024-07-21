import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiUser,
  FiMenu,
} from 'react-icons/fi';
import '../styles/header.scss';
import { Button, Dropdown, Space } from 'antd';
import { TbLogout2 } from 'react-icons/tb';

const Header: React.FC = () => {
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
    <header className="header bg-eff2fe text-hsl(0,0%,10%) py-4 px-4 flex justify-between items-center relative">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-20 w-full">
        <div className="flex items-left w-full opacity-[0]">
          <img src="/images/logo.png" alt="Logo" className="logo ml-auto" />
        </div>

        {/* user Icon */}
        <div className="icons flex gap-4">   

          <Dropdown menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
            <NavLink to="#" className="text-white">
            <FiUser />
          </NavLink>
            </Space>
          </a>
        </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
