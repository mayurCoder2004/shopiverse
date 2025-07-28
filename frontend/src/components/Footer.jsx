import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ShopiVerse</h2>
          <p className="text-sm">
            Your one-stop shop for everything! Amazing deals, top brands, and fast delivery.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Products</a></li>
            <li><a href="#" className="hover:underline">Categories</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Customer Service</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Returns</a></li>
            <li><a href="#" className="hover:underline">Order Tracking</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#"><FaFacebookF className="hover:text-white" /></a>
            <a href="#"><FaTwitter className="hover:text-white" /></a>
            <a href="#"><FaInstagram className="hover:text-white" /></a>
            <a href="#"><FaLinkedin className="hover:text-white" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} ShopiVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
