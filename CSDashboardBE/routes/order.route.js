const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model');

router.post('/', async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

router.get('/', async (req, res) => {
  const orders = await Order.find().populate('productId');
  res.json(orders);
});

module.exports = router;
