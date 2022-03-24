const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', async (req, res) => {
    const reviewer = await Reviewer.insert(req.body);
    res.send(reviewer);
  })

  .get('/', async (req, res) => {
    const reviewers = await Reviewer.findAll();
    res.send(reviewers);
  })

  .get('/:id', async (req, res) => {
    const reviewer = await Reviewer.findById(req.params.id);
    const reviewerReviews = await reviewer.findReviews();
    res.send(reviewerReviews);
  });
