import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional: you can use any icon lib

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          ShopiVerse
        </Link>

        {/* Search Input (hidden on small screens) */}
        <input
          type="text"
          placeholder="Search for products..."
          className="hidden md:flex flex-1 max-w-md mx-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-purple-600">Home</Link>
          <Link to="/products" className="hover:text-purple-600">Products</Link>
          <Link to="/cart" className="hover:text-purple-600">Cart</Link>
          <Link to="/login" className="hover:text-purple-600">Login</Link>
        </div>

        {/* Hamburger Menu (visible on mobile) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700 font-medium">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Link to="/" className="block hover:text-purple-600">Home</Link>
          <Link to="/products" className="block hover:text-purple-600">Products</Link>
          <Link to="/cart" className="block hover:text-purple-600">Cart</Link>
          <Link to="/login" className="block hover:text-purple-600">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
