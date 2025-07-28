import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center text-center">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
