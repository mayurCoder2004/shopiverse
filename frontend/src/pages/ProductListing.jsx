import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/home/ProductCard';

const categories = ['Electronics', 'Fashion', 'Home'];
const priceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 999 },
  { label: '₹1,000 – ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
];
const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
];

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let temp = products.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
      (selectedPrices.length === 0 || selectedPrices.some(lbl => {
          const r = priceRanges.find(r => r.label === lbl);
          return r && p.price >= r.min && p.price <= r.max;
      }))
    );
    if (sortOrder === 'price-asc') temp.sort((a,b)=>a.price-b.price);
    if (sortOrder === 'price-desc') temp.sort((a,b)=>b.price-a.price);
    if (sortOrder === 'newest') temp.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
    setFiltered(temp);
  }, [products, searchTerm, selectedCategories, selectedPrices, sortOrder]);

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-xl font-semibold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Loading amazing products...
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-4xl opacity-10 animate-bounce delay-1000">🛍️</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-10 animate-bounce delay-2000">✨</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl opacity-10 animate-bounce delay-500">💎</div>
        <div className="absolute bottom-1/4 right-1/3 text-4xl opacity-10 animate-bounce delay-1500">🎁</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full border border-purple-200 shadow-sm animate-pulse mb-4">
            ✨ Discover Amazing Products
          </span>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            All Products
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our curated collection of premium products at unbeatable prices
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-lg shadow-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 sticky top-24 space-y-6">
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-semibold rounded-full border border-purple-200">
                  🎯 Filters
                </span>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => {
                          setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c!==cat):[...prev,cat]);
                        }}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-gray-700 group-hover:text-purple-600 transition-colors duration-200">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">Price Range</h3>
                <div className="space-y-3">
                  {priceRanges.map(r => (
                    <label key={r.label} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrices.includes(r.label)}
                        onChange={() => {
                          setSelectedPrices(prev => prev.includes(r.label) ? prev.filter(x => x!==r.label):[...prev,r.label]);
                        }}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-gray-700 group-hover:text-purple-600 transition-colors duration-200">{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <main className="lg:col-span-3">
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
              <div className="text-gray-600">
                <span className="font-semibold text-purple-600">{filtered.length}</span> products found
              </div>
              <select 
                value={sortOrder} 
                onChange={e=>setSortOrder(e.target.value)} 
                className="px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
              >
                <option value="">Sort By</option>
                {sortOptions.map(o=>(<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.length > 0 ? (
                filtered.map(p => <ProductCard key={p._id} product={p} />)
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;