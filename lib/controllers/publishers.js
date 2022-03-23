const { Router } = require('express');
const Publisher = require('../models/Publisher');

module.exports = Router()
  .post('/', async (req, res) => {
    const publisher = await Publisher.insert(req.body);
    res.send(publisher);
  })
  .get('/', async (req, res) => {
    const publishers = await Publisher.findAll();
    res.send(publishers);
  })
  // get publisher by ID
  .get('/:id/books', async (req, res) => {
    const publisher = await Publisher.findById(req.params.id);
    const publisherBooks = await publisher.findBooks();
    res.send(publisherBooks);
  })
  .get('/:id', async (req, res) => {
    const publisherId = await Publisher.findById(req.params.id);
    res.send(publisherId);
  });
