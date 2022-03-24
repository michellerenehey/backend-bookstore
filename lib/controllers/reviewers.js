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
  })

  .patch('/:id', async (req, res) => {
    const reviewer = await Reviewer.updateById(req.params.id, req.body);
    res.send(reviewer);
  })

  .delete('/:id', async (req, res) => {
    const reviewer = await Reviewer.findReviewerReviews(req.params.id);
    if (reviewer === false) {
      res.send('testing this');
    } else {
      const deletedReviewer = await Reviewer.deleteById(req.params.id);
      res.send(deletedReviewer);
    }
  });
