import '../styles/header.scss';
import { NavLink } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiBell, FiHeart, FiUser } from 'react-icons/fi';


const Header = () => {
  return (
    <header className="header">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
      <img src="/images/logo.png" alt="Logo" className="logo" />
        
        <nav className="nav-links">
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
  <button className="absolute inset-y-0 right-0 bg-blue-500 text-white rounded-r-full p-2">
    <FiSearch />
  </button>
</div>

        <div className="icons">
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
    </header>
  );
};

export default Header;
