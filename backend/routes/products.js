const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../../data/products.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const dataPath = path.join(__dirname, '../../data/products.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const products = JSON.parse(data);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error reading product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const dataPath = path.join(__dirname, '../../data/products.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const products = JSON.parse(data);
    const filteredProducts = products.filter(p => p.category === category);
    res.json(filteredProducts);
  } catch (error) {
    console.error('Error reading products by category:', error);
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
});

// Get featured products
router.get('/featured/true', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../../data/products.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const products = JSON.parse(data);
    const featuredProducts = products.filter(p => p.featured === true);
    res.json(featuredProducts);
  } catch (error) {
    console.error('Error reading featured products:', error);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

module.exports = router;