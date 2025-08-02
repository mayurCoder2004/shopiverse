import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <Link to={`/product/${product._id}`} className="w-full max-w-xs group">
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex flex-col items-center text-center border border-gray-100 hover:border-purple-200 transform hover:scale-105 hover:-translate-y-2 overflow-hidden">
        
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-all duration-700 animate-pulse delay-300"></div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full">
          
          {/* Image Container */}
          <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 relative group/image">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Floating Badge */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0 shadow-lg">
              New ✨
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2 leading-tight">
            {product.title}
          </h3>

          {/* Category */}
          <p className="text-gray-500 text-sm mb-2 capitalize font-medium tracking-wide bg-gray-100 group-hover:bg-purple-100 px-3 py-1 rounded-full transition-all duration-300 inline-block">
            {product.category}
          </p>

          {/* Price */}
          <div className="mb-6">
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
              ₹{product.price}
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 w-max font-semibold text-sm overflow-hidden group/button transform hover:scale-105"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button Content */}
            <span className="relative z-10 flex items-center space-x-2">
              <span className="group-hover/button:scale-110 transition-transform duration-300">Add to Cart</span>
              <span className="text-lg group-hover/button:translate-x-1 group-hover/button:scale-110 transition-all duration-300">🛒</span>
            </span>
            
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/button:opacity-100 group-hover/button:animate-ping transition-all duration-1000"></div>
          </button>
        </div>

        {/* Card Border Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10 scale-105"></div>
      </div>
    </Link>
  );
};

export default ProductCard;