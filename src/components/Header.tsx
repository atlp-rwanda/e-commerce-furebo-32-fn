import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiSearch,
  FiShoppingCart,
  FiBell,
  FiHeart,
  FiUser,
  FiMenu,
} from 'react-icons/fi';
import '../styles/header.scss';
import { Badge, Spin } from 'antd';
import { useViewCartQuery } from '../store/actions/cart';
import Cart from './cart';

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { data, isLoading, isFetching } = useViewCartQuery({});
  const cartItemCount = data && data.items ? data.items.length : 0;

  return (
    <header className="header bg-eff2fe text-hsl(0,0%,10%) py-4 px-4 flex justify-between items-center relative">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-20 w-full">
        <div className="flex items-center w-full">
          <img src="/images/logo.png" alt="Logo" className="logo ml-auto" />
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="sm:hidden" onClick={() => setIsNavOpen(!isNavOpen)}>
          <FiMenu className="menu text-black text-2xl" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links hidden sm:flex flex-col sm:flex-row gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'active text-blue-500 underline'
                : 'text-white underline'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              isActive ? 'active text-blue-500' : 'text-white'
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'active text-blue-500' : 'text-white'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'active text-blue-500' : 'text-white'
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Mobile Navigation Links */}
        <div
          className={`mobile-nav-links ${isNavOpen ? 'block' : 'hidden'} sm:hidden absolute top-0 left-0 w-full bg-black  text-white flex flex-col items-center pt-5`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'active text-blue-500 underline mb-4'
                : 'text-white mb-4'
            }
            onClick={() => setIsNavOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              isActive
                ? 'active text-blue-500 underline mb-4'
                : 'text-white mb-4'
            }
            onClick={() => setIsNavOpen(false)}
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'active text-blue-500 underline mb-4'
                : 'text-white mb-4'
            }
            onClick={() => setIsNavOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'active text-blue-500 underline mb-4'
                : 'text-white mb-4'
            }
            onClick={() => setIsNavOpen(false)}
          >
            Contact
          </NavLink>
        </div>

        {/* Search Box */}
        <div className="search-box relative ml-auto">
          <input
            type="text"
            placeholder="Search"
            className="bg-blue-100 text-blue-900 rounded-l-full py-2 px-4 outline-none pr-10"
          />
          <button className="absolute inset-y-0 right-0 bg-blue-500 text-white rounded-r-full p-2">
            <FiSearch />
          </button>
        </div>

        {/* Icons */}
        <div className="icons flex gap-4">
            <Cart />
          <NavLink to="/notifications" className="text-white">
            <FiBell />
          </NavLink>
          <NavLink to="/likes" className="text-white">
            <FiHeart />
          </NavLink>
          <NavLink to="/login" className="text-white">
            <FiUser />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
