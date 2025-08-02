import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const { query, setQuery } = useSearch();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/products?search=${query}`);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
            <img 
              src='/shopi-verse-logo.png' 
              alt="ShopiVerse Logo" 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
            />
          </div>
          ShopiVerse
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
          <Link 
            to="/" 
            className="relative group px-3 py-2 rounded-lg transition-all duration-300 hover:text-purple-600 hover:bg-purple-50"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/products" 
            className="relative group px-3 py-2 rounded-lg transition-all duration-300 hover:text-purple-600 hover:bg-purple-50"
          >
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/cart" 
            className="relative group px-3 py-2 rounded-lg transition-all duration-300 hover:text-purple-600 hover:bg-purple-50 flex items-center space-x-2"
          >
            <span className="text-xl">🛒</span>
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs px-2 py-1 font-bold shadow-lg animate-bounce">
                {cartItems.length}
              </span>
            )}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {user ? (
            <>
              <Link 
                to="/my-orders" 
                className="relative group px-3 py-2 rounded-lg transition-all duration-300 hover:text-purple-600 hover:bg-purple-50"
              >
                My Orders
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="/profile" 
                className="relative group px-3 py-2 rounded-lg transition-all duration-300 hover:text-purple-600 hover:bg-purple-50"
              >
                Profile
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Hi, {user.name.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
            >
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden p-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg focus:outline-none transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
          <div className="px-6 py-4 space-y-3 text-gray-700 font-medium">
            <Link 
              to="/" 
              className="block py-3 px-4 rounded-lg hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 border-l-4 border-transparent hover:border-purple-500"
            >
              🏠 Home
            </Link>
            <Link 
              to="/products" 
              className="block py-3 px-4 rounded-lg hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 border-l-4 border-transparent hover:border-purple-500"
            >
              📦 Products
            </Link>
            <Link 
              to="/cart" 
              className="block py-3 px-4 rounded-lg hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 border-l-4 border-transparent hover:border-purple-500 flex items-center justify-between"
            >
              <span>🛒 Cart</span>
              {cartItems.length > 0 && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs px-2 py-1 font-bold shadow-lg">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <div className="border-t border-gray-200 my-4 pt-4">
                  <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.name.split(" ")[0]}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
                <Link 
                  to="/my-orders" 
                  className="block py-3 px-4 rounded-lg hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 border-l-4 border-transparent hover:border-purple-500"
                >
                  📋 My Orders
                </Link>
                <Link 
                  to="/profile" 
                  className="block py-3 px-4 rounded-lg hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 border-l-4 border-transparent hover:border-purple-500"
                >
                  👤 Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left py-3 px-4 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 border-l-4 border-transparent hover:border-red-500"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <div className="pt-4">
                <Link
                  to="/login"
                  className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  🔐 Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;