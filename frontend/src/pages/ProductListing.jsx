import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/home/ProductCard';

const categories = ['Electronics', 'Fashion', 'Home'];
const priceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 999 },
  { label: '₹1,000 – ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
];
const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
];

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let temp = products.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
      (selectedPrices.length === 0 || selectedPrices.some(lbl => {
          const r = priceRanges.find(r => r.label === lbl);
          return r && p.price >= r.min && p.price <= r.max;
      }))
    );
    if (sortOrder === 'price-asc') temp.sort((a,b)=>a.price-b.price);
    if (sortOrder === 'price-desc') temp.sort((a,b)=>b.price-a.price);
    if (sortOrder === 'newest') temp.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
    setFiltered(temp);
  }, [products, searchTerm, selectedCategories, selectedPrices, sortOrder]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-6 p-4 bg-white rounded shadow sticky top-24">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            {categories.map(cat => (
              <label key={cat} className="block">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => {
                    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c!==cat):[...prev,cat]);
                  }}
                /> {cat}
              </label>
            ))}
          </div>
          {/* Price */}
          <div>
            <h3 className="font-semibold mb-2">Price</h3>
            {priceRanges.map(r => (
              <label key={r.label} className="block">
                <input
                  type="checkbox"
                  checked={selectedPrices.includes(r.label)}
                  onChange={() => {
                    setSelectedPrices(prev => prev.includes(r.label) ? prev.filter(x => x!==r.label):[...prev,r.label]);
                  }}
                /> {r.label}
              </label>
            ))}
          </div>
        </aside>
        <main className="md:col-span-3">
          <div className="flex justify-end mb-4">
            <select value={sortOrder} onChange={e=>setSortOrder(e.target.value)} className="px-3 py-2 border rounded">
              <option value="">Sort By</option>
              {sortOptions.map(o=>(<option key={o.value} value={o.value}>{o.label}</option>))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map(p => <ProductCard key={p._id} product={p} />)
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
