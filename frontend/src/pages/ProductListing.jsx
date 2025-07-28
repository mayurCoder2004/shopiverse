import React from 'react';
import ProductCard from '../components/home/ProductCard';

// Sample products array for now
const products = [
  {
    id: 1,
    name: "Product One",
    image: "https://via.placeholder.com/300",
    price: 999,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Product Two",
    image: "https://via.placeholder.com/300",
    price: 1499,
    category: "Fashion"
  },
  // ... more products
];

const ProductListingPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Products</h1>

      {/* Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Categories</h3>
            <ul className="space-y-1 text-gray-700">
              <li><button className="hover:text-purple-600">All</button></li>
              <li><button className="hover:text-purple-600">Electronics</button></li>
              <li><button className="hover:text-purple-600">Fashion</button></li>
              <li><button className="hover:text-purple-600">Home</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Price</h3>
            <ul className="space-y-1 text-gray-700">
              <li><button className="hover:text-purple-600">Under ₹1,000</button></li>
              <li><button className="hover:text-purple-600">₹1,000 – ₹5,000</button></li>
              <li><button className="hover:text-purple-600">₹5,000 – ₹10,000</button></li>
            </ul>
          </div>
        </aside>

        {/* Main Product Grid */}
        <main className="md:col-span-3 space-y-4">
          {/* Sort Options */}
          <div className="flex justify-end mb-4">
            <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Sort By</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListingPage;
