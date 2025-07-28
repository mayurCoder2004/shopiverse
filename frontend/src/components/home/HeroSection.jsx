import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-[#f5f7fa] to-[#e3eaf1]">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Discover Amazing Products
      </h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl">
        Shop the latest trends at unbeatable prices. Find everything you need in one place.
      </p>
      <Link
        to="/products"
        className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-800 transition duration-300"
      >
        Shop Now
      </Link>
    </section>
  );
};

export default HeroSection;
