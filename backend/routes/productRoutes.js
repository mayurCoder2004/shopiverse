import express from 'express';
import Product from '../models/Product.js';

const productRoutes = express.Router();

// GET /api/products — Get all products
productRoutes.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/products/:id — Get single product by ID
productRoutes.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

export default productRoutes;
