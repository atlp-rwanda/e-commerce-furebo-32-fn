
import '../styles/header.scss'; 
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiBell, FiHeart, FiUser } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="header">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/images/logo.png" alt="Logo" className="logo" />

        <nav className="nav-links">
          <Link to="/home" className="text-white underline">
            Home
          </Link>
          <Link to="/Product" className="text-white">
            Products
          </Link>
          <Link to="/about" className="text-white">
            About
          </Link>
          <Link to="/Contact" className="text-white">
            Contact
          </Link>
        </nav>

        <div className="search-box relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-blue-100 text-blue-900 rounded-l-full py-2 px-4 outline-none pr-10"
          />
          <button className="absolute inset-y-0 right-0 top-2 bg-blue-500 text-white rounded-r-full p-2">
            <FiSearch />
          </button>
        </div>

        <div className="icons">
          <Link to="/cart" className="text-white">
            <FiShoppingCart />
          </Link>
          <Link to="/notifications" className="text-white">
            <FiBell />
          </Link>
          <Link to="/likes" className="text-white">
            <FiHeart />
          </Link>
          <Link to="/login" className="text-white">
            <FiUser />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
