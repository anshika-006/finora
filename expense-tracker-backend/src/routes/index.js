const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');

const expenseRoutes = require('./expenses');

const categoryRoutes = require('./categories');

const incomeRoutes = require('./incomes');

router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);
router.use('/categories', categoryRoutes);
router.use('/incomes', incomeRoutes);

module.exports = router;