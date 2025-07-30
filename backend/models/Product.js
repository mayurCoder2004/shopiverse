import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  originalPrice: Number,
  image: String,
  category: String,
  rating: Number,
  stock: Boolean,
  description: String,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
