import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col items-center text-center w-full">
      <div className="w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
      <p className="text-gray-500 text-sm mb-1 capitalize">{product.category}</p>
      <p className="text-gray-700 font-medium mb-3">${product.price}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
