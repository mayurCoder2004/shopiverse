import React, { useState } from 'react';
import ProductCard from './ProductCard';
import products from '../../assets/products';

const ProductsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products with ID from 1 to 8 first, then apply search filter
  const filteredProducts = products
    .filter(product => product.id >= 1 && product.id <= 8)
    .filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <section className="py-10 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Featured Products</h2>

      {/* Search Input */}
      {/* <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div> */}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No products found.</p>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
