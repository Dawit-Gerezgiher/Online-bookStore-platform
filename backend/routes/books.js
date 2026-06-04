const express = require('express');
const Book = require('../models/Book');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const router = express.Router();

// Get all books (public)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message, code: 500 });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: true, message: 'Book not found', code: 404 });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message, code: 500 });
  }
});

// Add new book (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, author, category, price, stock, description, coverImageUrl } = req.body;
    
    const book = new Book({
      title,
      author,
      category,
      price,
      stock,
      description,
      coverImageUrl
    });
    
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message, code: 500 });
  }
});

// Update book (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ error: true, message: 'Book not found', code: 404 });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message, code: 500 });
  }
});

// Delete book (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: true, message: 'Book not found', code: 404 });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message, code: 500 });
  }
});

module.exports = router;