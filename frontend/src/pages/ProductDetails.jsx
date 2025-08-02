import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        return res.data.category;
      })
      .then(cat => axios.get(`${import.meta.env.VITE_BASE_URL}/api/products?category=${cat}`))
      .then(res => {
        setRelated(res.data.filter(p => p._id !== id));
      })
      .catch(console.error);
  }, [id]);

  if (!product) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl text-gray-600 font-light">Loading amazing product...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-4xl opacity-20 animate-bounce delay-1000">💎</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-20 animate-bounce delay-2000">✨</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl opacity-20 animate-bounce delay-500">🛍️</div>
        <div className="absolute bottom-1/4 right-1/3 text-4xl opacity-20 animate-bounce delay-1500">🎁</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="group">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-96 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105 border border-purple-100 backdrop-blur-sm" 
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-100">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              {product.title}
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              {product.description}
            </p>
            
            <div className="text-2xl">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="line-through ml-3 text-gray-400 text-lg">₹{product.originalPrice}</span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full border border-purple-200 shadow-sm">
                📦 {product.category}
              </span>
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full border border-purple-200 shadow-sm">
                ⭐ {product.rating}
              </span>
            </div>
            
            <p className={`text-lg font-semibold ${product.stock ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock ? '✅ In Stock' : '❌ Out of Stock'}
            </p>
            
            <button
              onClick={() => addToCart(product)}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden w-fit"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Add to Cart</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">🛒</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-100">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8 text-center">
              ✨ Related Products
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(r => (
                <Link to={`/product/${r._id}`} key={r._id} className="group">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 border border-purple-100 group-hover:scale-105 group-hover:border-purple-300">
                    <img 
                      src={r.image} 
                      alt={r.title}
                      className="h-40 w-full object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300" 
                    />
                    <h4 className="text-sm font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      {r.title}
                    </h4>
                    <p className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-sm font-bold">
                      ₹{r.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-100 to-blue-100 opacity-50 transform rotate-1"></div>
    </div>
  );
};

export default ProductDetails;