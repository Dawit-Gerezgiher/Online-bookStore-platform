const express = require('express');
const Order = require('../models/Order');
const Book = require('../models/Book');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Get user's orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message, code: 500 });
  }
});

// Create new order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items } = req.body; // items: [{ bookId, quantity }]
    
    if (!items || items.length === 0) {
      return res.status(400).json({ error: true, message: 'Order must contain at least one item', code: 400 });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const book = await Book.findById(item.bookId);
      if (!book) {
        return res.status(404).json({ error: true, message: `Book not found: ${item.bookId}`, code: 404 });
      }
      
      if (book.stock < item.quantity) {
        return res.status(400).json({ error: true, message: `Insufficient stock for: ${book.title}`, code: 400 });
      }

      const itemTotal = book.price * item.quantity;
      totalAmount += itemTotal;
      
      orderItems.push({
        bookId: book._id,
        title: book.title,
        quantity: item.quantity,
        price: book.price
      });

      // Update stock
      book.stock -= item.quantity;
      await book.save();
    }

    const order = new Order({
      userId: req.user.id,
      items: orderItems,
      totalAmount
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message, code: 500 });
  }
});

// Get single order
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
    if (!order) {
      return res.status(404).json({ error: true, message: 'Order not found', code: 404 });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message, code: 500 });
  }
});

module.exports = router;