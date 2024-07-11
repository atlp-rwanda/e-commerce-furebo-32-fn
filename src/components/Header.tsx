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
    <header className="header bg-eff2fe text-hsl(0,0%,10%) py-4 px-4 flex justify-between items-center relative">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-20 w-full">

       
        <div className="flex items-center w-full">
          <img src="/images/logo.png" alt="Logo" className="logo ml-auto" />

          {/* Hamburger Menu - visible on small screens */}
          <button onClick={toggleMenu} className=" humb text-gray-600 focus:outline-none sm:hidden">
            <FiMenu className=" h-8 w-8" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu sm:hidden fixed top-20 left-0 bg-black w-auto h-full text-white transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <nav className="flex flex-col items-start space-y-1 p-4">
            <NavLink to="/" className="text-white underline" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/product" className="text-white" onClick={toggleMenu}>
              Products
            </NavLink>
            <NavLink to="/about" className="text-white" onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink to="/contact" className="text-white" onClick={toggleMenu}>
              Contact
            </NavLink>
          </nav>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links hidden sm:flex flex-col sm:flex-row gap-4">
          <NavLink to="/" className="text-white underline">
            Home
          </NavLink>
          <NavLink to="/product" className="text-white">
            Products
          </NavLink>
          <NavLink to="/about" className="text-white">
            About
          </NavLink>
          <NavLink to="/contact" className="text-white">
            Contact
          </NavLink>
        </nav>

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
          <NavLink to="/cart" className="text-white">
            <FiShoppingCart />
          </NavLink>
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
