const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.send(book);
  })

  .get('/', async (req, res) => {
    const book = await Book.findAll(req.body);
    res.send(book);
  })

  .get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    const bookPublisher = await book.findPublisher();
    const bookAuthors = await bookPublisher.findAuthors();
    const bookReviews = await bookAuthors.findReviews();
    const bookReviewer = await bookReviews.findReviewer();
    res.send(bookReviewer);
  });
