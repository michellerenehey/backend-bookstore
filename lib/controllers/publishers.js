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
  });
