const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', async (req, res) => {
    const review = await Review.insert(req.body);
    res.send(review);
  })

  .get('/', async (req, res) => {
    const reviews = await Review.findAll();
    res.send(reviews);
  })

  .delete('/:id', async (req, res) => {
    const review = await Review.deleteById(req.params.id);
    res.send(review);
  });
