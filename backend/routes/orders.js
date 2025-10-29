const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// In-memory order storage (in a real app, this would be a database)
let orders = {};

// Create a new order
router.post('/create', async (req, res) => {
  try {
    const { userId, items, customerInfo, totalAmount } = req.body;
    
    // Validate required fields
    if (!userId || !items || !customerInfo || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    // Generate order ID
    const orderId = Date.now().toString();
    
    // Get product data to check stock
    const dataPath = path.join(__dirname, '../../data/products.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const products = JSON.parse(data);
    
    // Check stock for each item
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Not enough stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}` 
        });
      }
    }
    
    // Create order object
    const order = {
      orderId,
      userId,
      items,
      customerInfo,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Store order
    if (!orders[userId]) {
      orders[userId] = [];
    }
    orders[userId].push(order);
    
    // In a real application, you would:
    // 1. Update product stock in the database
    // 2. Process payment
    // 3. Send confirmation email
    // 4. Integrate with shipping provider
    
    res.status(201).json({ 
      message: 'Order created successfully', 
      orderId,
      order 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get orders for a user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const userOrders = orders[userId] || [];
  res.json(userOrders);
});

// Get order by ID
router.get('/:userId/:orderId', (req, res) => {
  const userId = req.params.userId;
  const orderId = req.params.orderId;
  
  if (!orders[userId]) {
    return res.status(404).json({ error: 'No orders found for this user' });
  }
  
  const order = orders[userId].find(o => o.orderId === orderId);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
});

// Update order status (admin functionality)
router.put('/:userId/:orderId/status', (req, res) => {
  const userId = req.params.userId;
  const orderId = req.params.orderId;
  const { status } = req.body;
  
  if (!orders[userId]) {
    return res.status(404).json({ error: 'No orders found for this user' });
  }
  
  const orderIndex = orders[userId].findIndex(o => o.orderId === orderId);
  
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  // Update status
  orders[userId][orderIndex].status = status;
  orders[userId][orderIndex].updatedAt = new Date().toISOString();
  
  res.json({ 
    message: 'Order status updated', 
    order: orders[userId][orderIndex] 
  });
});

module.exports = router;