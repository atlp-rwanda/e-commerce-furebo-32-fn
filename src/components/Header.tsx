import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/header.scss';
import { FiSearch, FiBell, FiHeart, FiUser, FiMenu, FiPackage, FiMessageCircle,  FiLogIn } from 'react-icons/fi';
import { Badge, Tooltip } from 'antd';
import '../styles/header.scss';
import Cart from './cart';
import { useViewCartQuery } from '../store/actions/cart';
import { useSearchProductsQuery } from '../store/actions/search';
import { useGetWishlistQuery } from '../store/actions/wishlist';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState({
    search: '',
    min: '',
    max: '',
    category: '',
  });

  const [tempSearchParams, setTempSearchParams] = useState(searchParams);
  const [role, setRole] = useState(window.localStorage.getItem('role'));

  const user = useSelector((state: RootState) => state.user);
 
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const { data: cartData } = useViewCartQuery({});
 
  const cartItemCount = cartData && cartData.items ? cartData.items.length : 0;
  const token=window.localStorage.getItem('token')

  const { data: wishlistData } = useGetWishlistQuery();  
  const wishlist = wishlistData?.data || [];
  const wishlistItemCount = wishlist.length;

  const { data: searchData } = useSearchProductsQuery(searchParams);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempSearchParams((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setSearchParams(tempSearchParams);
    setShowResults(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header bg-eff2fe text-hsl(0,0%,10%) py-2 px-2 flex justify-between items-center relative">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-10 w-full">
        <div className="flex items-center w-full">
          <img src="/images/logo.png" alt="Logo" className="logo ml-auto" />
        </div>

        <div className="sm:hidden" onClick={() => setIsNavOpen(!isNavOpen)}>
          <FiMenu className="menu text-black text-2xl" />
        </div>

        <nav className="nav-links hidden sm:flex flex-col sm:flex-row gap-4">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active text-blue-500 underline' : 'text-white underline'}>
            Home
          </NavLink>
          <NavLink to="/product" className={({ isActive }) => isActive ? 'active text-blue-500' : 'text-white'}>
            Products
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active text-blue-500' : 'text-white'}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active text-blue-500' : 'text-white'}>
            Contact
          </NavLink>
        </nav>

        <div className={`mobile-nav-links ${isNavOpen ? 'block' : 'hidden'} sm:hidden absolute top-0 left-0 w-full bg-black text-white flex flex-col items-center pt-5`}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active text-blue-500 underline mb-4' : 'text-white mb-4'} onClick={() => setIsNavOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/product" className={({ isActive }) => isActive ? 'active text-blue-500 underline mb-4' : 'text-white mb-4'} onClick={() => setIsNavOpen(false)}>
            Products
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active text-blue-500 underline mb-4' : 'text-white mb-4'} onClick={() => setIsNavOpen(false)}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active text-blue-500 underline mb-4' : 'text-white mb-4'} onClick={() => setIsNavOpen(false)}>
            Contact
          </NavLink>
        </div>

        <div className="search-box relative">
          <input
            type="text"
            placeholder="Search products"
            className="bg-blue-100 text-blue-900 rounded-l-full py-2 px-4 outline-none pr-10"
            name="search"
            onChange={handleSearchInput}
            onFocus={() => setShowResults(true)}
          />
          <input
            type="text"
            placeholder="Search category"
            name="category"
            onChange={handleSearchInput}
            onFocus={() => setShowResults(true)}
          />
          <input
            type="number"
            placeholder="min"
            name="min"
            onChange={handleSearchInput}
            onFocus={() => setShowResults(true)}
          />
          <input
            type="number"
            placeholder="max"
            name="max"
            onChange={handleSearchInput}
            onFocus={() => setShowResults(true)}
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded-r-full">
            <FiSearch />
          </button>
          {showResults && searchParams.search && searchData?.products && (
            <div ref={searchResultsRef} className="absolute bg-white z-10 top-7 w-full my-1 rounded-lg p-1">
              {searchData.products.map((product: any) => (
                <div key={product.id} className="flex hover:bg-indigo-300 p-1 rounded-lg cursor-pointer w-full justify-between">
                  <div className="w-10 h-10">
                    <img src={product.images[0]} alt={product.productName} className="w-10 h-10 rounded-lg" />
                  </div>
                  <p className="p-1 m-0 text-center">{product.productName}</p>
                  <p className="p-1 m-0 text-center">{product.category}</p>
                  <p className="p-1 m-0 text-center">{product.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="icons flex gap-4">
        {/* Icons */}
        <div className="icons flex">
          {cartData && <Cart />}
          <NavLink to="/notifications" className="text-white">
            <FiBell />
          </NavLink>
          <NavLink to="/wishlist" className="text-white">
            <Badge count={wishlistItemCount}>
              <FiHeart className="text-2xl" />
            </Badge>
          </NavLink>
          {token && (
            <NavLink to="/viewprofile" className="text-white">
              <FiUser />
            </NavLink>
          )}
          <NavLink to="/login" className="text-white">
            < FiLogIn/>
          </NavLink>
          {role === 'buyer' && (
            <NavLink to="/orders" className="text-[#000]">
              <FiPackage />
            </NavLink>
          )}
          <Tooltip title={user ? '' : 'Please login to chat'}>
            <NavLink to={user ? '/chat' : '/login'} className="text-white">
            
                <Badge >
                  <FiMessageCircle />
                </Badge>
              
              
            </NavLink>
          </Tooltip>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;