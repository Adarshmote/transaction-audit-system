// routes/transaction.js
const express = require('express');
const router = express.Router();
const { transferMoney, getTransactions } = require('../controllers/TransactionController');

// POST /transfer -> transfer money
router.post('/transfer', transferMoney);

// GET / -> get all transactions
router.get('/', getTransactions);

module.exports = router;
