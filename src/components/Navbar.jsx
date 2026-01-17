import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { setSearchQuery } from '../features/productSlice';

const Navbar = () => {
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark');
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const profileRef = useRef(null); // Click outside the menu to close it
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dark Mode Logic
  useEffect(() => {
    const root = window.document.documentElement;

    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  // Toggle Button
  const toggleDarkMode = () => {
    setDark(prev => !prev);
  };

  // Logic to close the profile menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  const handleLogout = () => {
    dispatch(logout());
    setShowProfile(false); // to close menu
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setSearchQuery(value));

    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-md font-sans">
      {/* Top Navbar */}
      <nav className="bg-[#131921] text-white p-2 flex items-center justify-between gap-4 px-4 md:px-8">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold border border-transparent hover:border-white p-1 shrink-0">
          Agro<span className="text-[#f3a847]">Mart</span>
        </Link>

        {/* Search Bar - Desktop & Tablet */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 h-10 rounded-md overflow-hidden bg-white max-w-2xl">
          <input
            type="text"
            className="w-full text-black px-4 outline-none border-none text-sm"
            placeholder="Search products (eg: Tomato, Rose...)"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] px-5 text-black transition flex items-center justify-center">
            <span className="text-lg">🔍</span>
          </button>
        </form>

        {/* Right Links */}
        <div className="flex items-center gap-4 md:gap-6 text-sm shrink-0">

          {/* Dark Mode Toggle */}
          {/* Dark Mode Toggle Button */}
<button
  onClick={toggleDarkMode}
  className="p-2 bg-gray-700/50 rounded-full hover:bg-gray-600 transition flex items-center justify-center w-10 h-10"
  title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
>
  <span className="text-lg">{dark ? '☀️' : '🌙'}</span>
</button>

          {/* User Profile / Login */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <div
                className="border border-transparent hover:border-white p-1 flex items-center gap-2 cursor-pointer transition"
                onClick={() => setShowProfile(!showProfile)}
              >
                <div className="w-8 h-8 rounded-full bg-[#f3a847] text-black flex items-center justify-center font-bold shadow-inner">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] leading-none text-gray-300">Hello, {user.name.split(' ')[0]}</p>
                  <p className="font-bold text-xs">Account & Lists</p>
                </div>
              </div>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-52 bg-white text-black shadow-2xl rounded-md py-2 z-50 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-2 border-b">
                    <p className="text-xs text-gray-500">Your Account</p>
                    <p className="font-bold text-gray-800 truncate">{user.name}</p>
                  </div>
                  <Link to="/OrderHistory" onClick={() => setShowProfile(false)} className="block px-4 py-2 hover:bg-gray-100 transition">My Orders</Link>
                  <Link to="/profile" onClick={() => setShowProfile(false)} className="block px-4 py-2 hover:bg-gray-100 transition">Settings</Link>
                  <hr className="my-1" />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-bold transition">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="border border-transparent hover:border-white p-1 transition">
              <p className="text-xs text-gray-300">Hello, Sign in</p>
              <p className="font-bold">Account</p>
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="flex items-end relative p-1 border border-transparent hover:border-white transition group">
            <div className="relative">
              <span className="text-3xl text-white group-hover:text-[#f3a847] transition">🛒</span>
              <span className="absolute -top-2 -right-2 font-bold text-sm text-[#131921] bg-[#f3a847] px-1.5 rounded-full min-w-[20px] text-center">
                {cartItems.length}
              </span>
            </div>
            <span className="font-bold hidden sm:block ml-1 mb-0.5">Cart</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Search Bar - Only visible on small screens */}
      <div className="md:hidden bg-[#131921] px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="flex h-10 rounded-md overflow-hidden bg-white">
          <input
            type="text"
            className="w-full text-black px-4 outline-none border-none text-sm"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="submit" className="bg-[#febd69] px-4 text-black">🔍</button>
        </form>
      </div>

      {/* Secondary Menu */}
      <div className="bg-[#232f3e] text-white flex items-center gap-6 px-4 md:px-8 py-2 text-xs md:text-sm font-medium overflow-x-auto scrollbar-hide border-t border-gray-700">
        <Link to="/" className="hover:outline outline-1 outline-white p-1.5 px-2 whitespace-nowrap">Home</Link>
        <Link to="/OrderHistory" className="hover:outline outline-1 outline-white p-1.5 px-2 whitespace-nowrap">Orders</Link>
        <Link to="/about" className="hover:outline outline-1 outline-white p-1.5 px-2 whitespace-nowrap">About</Link>
        <Link to="/contact" className="hover:outline outline-1 outline-white p-1.5 px-2 whitespace-nowrap">Contact Us</Link>

        {user?.role === 'Admin' && (
          <Link to="/admin-panel" className="text-[#f3a847] font-bold hover:outline outline-1 outline-white p-1.5 px-2 whitespace-nowrap">
            Admin Dashboard
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;