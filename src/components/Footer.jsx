import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-green-600 tracking-tighter">AGROMART.</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Everything you need to make your home a green space—seeds and plants—is now available at your fingertips.
          </p>
          <div className="flex gap-4 text-xl">
            <span className="cursor-pointer hover:text-green-500 transition">Facebook</span>
            <span className="cursor-pointer hover:text-green-500 transition">Instagram</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-6 uppercase text-xs tracking-widest">Quick Links</h3>
          <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            <li><Link to="/" className="hover:text-green-600 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-green-600 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-green-600 transition">Contact Us</Link></li>
            <li><Link to="/OrderHistory" className="hover:text-green-600 transition">My Orders</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-6 uppercase text-xs tracking-widest">Shop By</h3>
          <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            <li className="cursor-pointer hover:text-green-600 transition">Fresh Seeds</li>
            <li className="cursor-pointer hover:text-green-600 transition">Indoor Plants</li>
            <li className="cursor-pointer hover:text-green-600 transition">Garden Tools</li>
            <li className="cursor-pointer hover:text-green-600 transition">Organic Fertilizers</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-6 uppercase text-xs tracking-widest">Newsletter</h3>
          <p className="text-xs text-gray-400 mb-4">Don't miss out! Subscribe now for exclusive offers, farming tips, and new arrivals.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-gray-100 dark:bg-gray-800 p-3 rounded-l-lg outline-none w-full text-sm dark:text-white"
            />
            <button className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700 transition">Go</button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-400">© 2026 AgroMart. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-gray-400">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;