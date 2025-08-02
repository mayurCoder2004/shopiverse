import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-6xl opacity-20 animate-bounce delay-1000">🛍️</div>
        <div className="absolute top-1/3 right-1/4 text-5xl opacity-20 animate-bounce delay-2000">💎</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-20 animate-bounce delay-500">✨</div>
        <div className="absolute bottom-1/4 right-1/3 text-5xl opacity-20 animate-bounce delay-1500">🎁</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full border border-purple-200 shadow-sm animate-pulse">
            ✨ New Arrivals Every Week
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
          Discover Amazing
          <br />
          <span className="relative">
            Products
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transform scale-x-0 animate-pulse"></div>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
          Shop the latest trends at 
          <span className="text-purple-600 font-semibold"> unbeatable prices</span>. 
          Find everything you need in one place with 
          <span className="text-blue-600 font-semibold"> premium quality</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            to="/products"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Shop Now</span>
              <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">🚀</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link
            to="/products"
            className="group px-8 py-4 bg-white text-purple-600 font-semibold rounded-full border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="flex items-center space-x-2">
              <span>Browse Categories</span>
              <span className="text-lg group-hover:rotate-12 transition-transform duration-300">📦</span>
            </span>
          </Link>
        </div>

        {/* Stats or Features */}
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div className="group">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              10K+
            </div>
            <div className="text-sm text-gray-500 font-medium">Happy Customers</div>
          </div>
          <div className="group">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              5K+
            </div>
            <div className="text-sm text-gray-500 font-medium">Products</div>
          </div>
          <div className="group">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              24/7
            </div>
            <div className="text-sm text-gray-500 font-medium">Support</div>
          </div>
          <div className="group">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              Free
            </div>
            <div className="text-sm text-gray-500 font-medium">Shipping</div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-100 to-blue-100 opacity-50 transform rotate-1"></div>
    </section>
  );
};

export default HeroSection;