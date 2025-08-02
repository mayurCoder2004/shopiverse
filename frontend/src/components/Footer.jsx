import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and About */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <img src="/shopi-verse-logo.png" alt="" />
            </div>
            <h2 className="text-2xl font-bold text-white">ShopiVerse</h2>
          </div>
          <p className="text-sm text-gray-400">
            Your one-stop shop for everything! Amazing deals, top brands, and fast delivery.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Products</a></li>
            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Categories</a></li>
            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Customer Service</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">FAQ</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Returns</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Order Tracking</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Support</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="p-2 bg-gray-800 hover:bg-purple-600 rounded-full transition-colors">
              <FaFacebookF className="text-gray-400 hover:text-white" />
            </a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-purple-600 rounded-full transition-colors">
              <FaTwitter className="text-gray-400 hover:text-white" />
            </a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-purple-600 rounded-full transition-colors">
              <FaInstagram className="text-gray-400 hover:text-white" />
            </a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-purple-600 rounded-full transition-colors">
              <FaLinkedin className="text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} <span className="text-purple-400 font-semibold">ShopiVerse</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;