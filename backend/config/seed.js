import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import products from '../../frontend/src/assets/products.js';

dotenv.config(); // Load env variables from .env

const seedProducts = async () => {
  try {
    // ✅ Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');

    // 🧹 Clear existing data
    await Product.deleteMany();
    console.log('🗑️ Existing products deleted');

    // 🚀 Insert new data
    await Product.insertMany(products);
    console.log('✅ Products imported');

    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedProducts();
