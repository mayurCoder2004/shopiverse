import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    title: 'Smartphone XYZ',
    price: 499,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300',
  },
  {
    id: 2,
    title: 'Noise Cancelling Headphones',
    price: 199,
    image: 'https://images.pexels.com/photos/3394656/pexels-photo-3394656.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300',
  },
  {
    id: 3,
    title: 'Leather Jacket',
    price: 149,
    image: 'https://images.pexels.com/photos/5705490/pexels-photo-5705490.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300',
  },
  {
    id: 4,
    title: 'Smart Watch Series 8',
    price: 299,
    image: 'https://images.pexels.com/photos/277406/pexels-photo-277406.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300',
  },
  {
    id: 5,
    title: 'DSLR Camera',
    price: 899,
    image: 'https://images.pexels.com/photos/1051077/pexels-photo-1051077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300',
  },
  {
    id: 6,
    title: 'Gaming Mouse',
    price: 59,
    image: 'https://images.pexels.com/photos/5864150/pexels-photo-5864150.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300',
  },
  {
    id: 7,
    title: 'Bluetooth Speaker',
    price: 89,
    image: 'https://images.pexels.com/photos/133579/pexels-photo-133579.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300',
  },
  {
    id: 8,
    title: 'Fitness Tracker Band',
    price: 99,
    image: 'https://images.pexels.com/photos/3765114/pexels-photo-3765114.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300',
  },
];

const ProductsSection = () => {
  return (
    <section className="py-10 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
