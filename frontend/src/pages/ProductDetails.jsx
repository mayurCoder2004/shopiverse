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

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <img src={product.image} alt={product.title}
          className="w-full h-96 object-cover rounded-xl shadow" />
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <div className="text-lg">
            <span className="text-blue-600 font-semibold">₹{product.price}</span>
            {product.originalPrice && (
              <span className="line-through ml-2 text-gray-400">₹{product.originalPrice}</span>
            )}
          </div>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-sm text-gray-500">Rating: ⭐ {product.rating}</p>
          <p className={`text-sm font-medium ${product.stock ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock ? 'In Stock' : 'Out of Stock'}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-4 w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>
      {related.length > 0 && (
        <div>
          <h3 className="text-2xl mb-4">Related Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(r => (
              <Link to={`/product/${r._id}`} key={r._id}>
                <div className="bg-white rounded-xl shadow hover:shadow-md p-3">
                  <img src={r.image} alt={r.title}
                    className="h-40 w-full object-cover rounded mb-2" />
                  <h4 className="text-sm font-medium">{r.title}</h4>
                  <p className="text-blue-600 text-sm">₹{r.price}</p>
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
