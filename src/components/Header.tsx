import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiBell, FiHeart, FiUser, FiMenu } from 'react-icons/fi';
import '../styles/header.scss';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center w-full">
            <button onClick={toggleMenu} className=" block text-gray-600 focus:outline-none sm:hidden">
              <FiMenu className="h-6 w-6" />
            </button>
            <img src="/images/logo.png" alt="Logo" className="logo ml-auto mt-12" />
          </div>
        </div>

        <nav className="nav-links hidden sm:flex flex-col sm:flex-row">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'active text-white underline' : 'text-white underline')}
          >
            Home
          </NavLink>
          <NavLink 
            to="/Product" 
            className={({ isActive }) => (isActive ? 'active text-white' : 'text-white')}
          >
            Products
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => (isActive ? 'active text-white' : 'text-white')}
          >
            About
          </NavLink>
          <NavLink 
            to="/Contact" 
            className={({ isActive }) => (isActive ? 'active text-white' : 'text-white')}
          >
            Contact
          </NavLink>
        </nav>

        <div className="search-box relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-blue-100 text-blue-900 rounded-l-full py-2 px-4 outline-none pr-10" 
          />
          <button className="butt absolute inset-y-0 right-0 bg-blue-500 text-white rounded-r-full p-2">
            <FiSearch />
          </button>
        </div>

        <div className="icons flex gap-4">
          <NavLink 
            to="/cart" 
            className={({ isActive }) => (isActive ? 'active text-white' : 'text-white')}
          >
            <FiShoppingCart />
          </NavLink>
          <NavLink 
            to="/notifications" 
            className={({ isActive }) => (isActive ? 'active text-white' : 'text-white')}
          >
            <FiBell />
          </NavLink>
          <NavLink 
            to="/likes" 
            className={({ isActive }) => (isActive ? 'active text-white' : 'text-white')}
          >
            <FiHeart />
          </NavLink>
          <NavLink 
            to="/Signup" 
            className={({ isActive }) => (isActive ? 'active text-white' : 'text-white')}
          >
            <FiUser />
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu sm:hidden fixed top-7 left-0 bg-black w-auto transition-all duration-300 ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <nav className="flex flex-col items-start mt-1 bg-black text-white w-auto space-y-3 p-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'active text-blue-500 underline' : 'text-gray-200')}
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/Product" 
            className={({ isActive }) => (isActive ? 'active text-blue-500 underline' : 'text-gray-200')}
            onClick={toggleMenu}
          >
            Products
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => (isActive ? 'active text-blue-500 underline' : 'text-gray-200')}
            onClick={toggleMenu}
          >
            About
          </NavLink>
          <NavLink 
            to="/Contact" 
            className={({ isActive }) => (isActive ? 'active text-blue-500 underline' : 'text-gray-200')}
            onClick={toggleMenu}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
