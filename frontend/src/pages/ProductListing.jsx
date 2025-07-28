import React, { useState } from 'react';
import ProductCard from '../components/home/ProductCard';
import products from '../assets/products';

const categories = ['Electronics', 'Fashion', 'Home'];
const priceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 999 },
  { label: '₹1,000 – ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
];

const ProductListingPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (range) => {
    setSelectedPrices((prev) =>
      prev.includes(range)
        ? prev.filter((r) => r !== range)
        : [...prev, range]
    );
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);

    const priceMatch =
      selectedPrices.length === 0 ||
      selectedPrices.some(
        (rangeLabel) => {
          const range = priceRanges.find((r) => r.label === rangeLabel);
          return product.price >= range.min && product.price <= range.max;
        }
      );

    return categoryMatch && priceMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Categories</h3>
            <ul className="space-y-2 text-gray-700">
              {categories.map((category) => (
                <li key={category}>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="form-checkbox text-purple-600"
                    />
                    <span>{category}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Price</h3>
            <ul className="space-y-2 text-gray-700">
              {priceRanges.map((range) => (
                <li key={range.label}>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes(range.label)}
                      onChange={() => handlePriceChange(range.label)}
                      className="form-checkbox text-purple-600"
                    />
                    <span>{range.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Product Grid */}
        <main className="md:col-span-3 space-y-4">
          {/* Sort (optional, unchanged) */}
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-500">No products found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListingPage;
