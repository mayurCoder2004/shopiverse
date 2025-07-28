import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <Link to={`/product/${product.id}`} className="w-full max-w-xs">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col items-center text-center">
        <div className="w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-1 capitalize">
          {product.category}
        </p>
        <p className="text-gray-700 font-medium mb-3">₹{product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700 transition w-max"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
