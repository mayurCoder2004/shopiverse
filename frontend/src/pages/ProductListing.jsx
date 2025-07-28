import React, { useState } from 'react';
import ProductCard from '../components/home/ProductCard';
import products from '../assets/products';

const categories = ['Electronics', 'Fashion', 'Home'];
const priceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 999 },
  { label: '₹1,000 – ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
];

const sortOptions = [
  { label: 'Sort By', value: '' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
];

const ProductListingPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (rangeLabel) => {
    setSelectedPrices((prev) =>
      prev.includes(rangeLabel)
        ? prev.filter((r) => r !== rangeLabel)
        : [...prev, rangeLabel]
    );
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredProducts = products
    .filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      const priceMatch =
        selectedPrices.length === 0 ||
        selectedPrices.some((label) => {
          const range = priceRanges.find((r) => r.label === label);
          return range && product.price >= range.min && product.price <= range.max;
        });

      return categoryMatch && priceMatch;
    })
    .sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      if (sortOrder === 'newest') return b.id - a.id; // Assuming higher ID is newer
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 space-y-6 sticky top-24 self-start bg-white rounded-lg shadow p-4 h-fit">
          {/* Categories */}
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

          {/* Price Ranges */}
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
        <main className="md:col-span-3">
          {/* Sort Dropdown */}
          <div className="flex justify-end mb-4">
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">No products found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListingPage;
