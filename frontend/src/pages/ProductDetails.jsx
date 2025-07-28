import React from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../assets/products';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  if (!product) {
    return <div className="text-center text-red-500 mt-10">Product not found.</div>;
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover rounded-xl shadow"
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>

          <div className="text-lg">
            <span className="text-blue-600 font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="line-through text-gray-400 ml-2">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-sm text-gray-500">Rating: ⭐ {product.rating}</p>
          <p className={`text-sm font-medium ${product.stock ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock ? 'In Stock' : 'Out of Stock'}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700 transition w-max"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Related Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <div className="bg-white rounded-xl shadow hover:shadow-md transition p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full object-cover rounded-md mb-2"
                  />
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <p className="text-blue-600 text-sm">${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
