const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// In-memory cart storage (in a real app, this would be a database)
let carts = {};

// Get cart items for a user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const cart = carts[userId] || [];
  res.json(cart);
});

// Add item to cart
router.post('/:userId/add', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId, quantity = 1 } = req.body;
    
    // Get product details
    const dataPath = path.join(__dirname, '../../data/products.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const products = JSON.parse(data);
    const product = products.find(p => p.id === parseInt(productId));
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }
    
    // Initialize cart if it doesn't exist
    if (!carts[userId]) {
      carts[userId] = [];
    }
    
    // Check if product is already in cart
    const existingItemIndex = carts[userId].findIndex(item => item.productId === productId);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const newQuantity = carts[userId][existingItemIndex].quantity + quantity;
      if (product.stock < newQuantity) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
      carts[userId][existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item to cart
      carts[userId].push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    res.json({ message: 'Item added to cart', cart: carts[userId] });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Remove item from cart
router.delete('/:userId/remove/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = parseInt(req.params.productId);
  
  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  carts[userId] = carts[userId].filter(item => item.productId !== productId);
  res.json({ message: 'Item removed from cart', cart: carts[userId] });
});

// Update item quantity
router.put('/:userId/update/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;
  
  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  const itemIndex = carts[userId].findIndex(item => item.productId === productId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    carts[userId] = carts[userId].filter(item => item.productId !== productId);
  } else {
    // Update quantity
    carts[userId][itemIndex].quantity = quantity;
  }
  
  res.json({ message: 'Cart updated', cart: carts[userId] });
});

// Clear cart
router.delete('/:userId/clear', (req, res) => {
  const userId = req.params.userId;
  carts[userId] = [];
  res.json({ message: 'Cart cleared' });
});

module.exports = router;