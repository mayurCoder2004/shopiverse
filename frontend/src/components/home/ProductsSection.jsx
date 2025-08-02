import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/products`)
      .then(res => {
        setProducts(res.data.slice(0, 8));  // take first 8
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animate-reverse delay-150"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">✨</div>
      </div>
    </div>
  );

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-1/3 w-36 h-36 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 text-4xl opacity-10 animate-bounce delay-1000">🛍️</div>
        <div className="absolute top-1/3 right-1/6 text-3xl opacity-10 animate-bounce delay-2000">💎</div>
        <div className="absolute bottom-1/3 left-1/5 text-2xl opacity-10 animate-bounce delay-500">⭐</div>
        <div className="absolute bottom-1/4 right-1/5 text-3xl opacity-10 animate-bounce delay-1500">🎯</div>
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full border border-purple-200 shadow-sm mb-4 animate-pulse">
            🔥 Trending Now
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Featured Products
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4"></div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Discover our handpicked selection of 
            <span className="text-purple-600 font-semibold"> premium products </span>
            crafted for excellence
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <div 
              key={product._id} 
              className="group transform hover:scale-105 transition-all duration-300 hover:z-10 relative"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.6s ease-out both'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-110"></div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
            <span>Showing 8 of our best products</span>
            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></span>
            <span className="text-purple-600 font-semibold">More coming soon!</span>
          </div>
        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes animate-reverse {
          to {
            transform: rotate(-360deg);
          }
        }
        
        .animate-reverse {
          animation: animate-reverse 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ProductsSection;