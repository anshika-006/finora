const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const prisma = require('../utils/prisma');
const { incomeSchema } = require('../utils/zodSchemas');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const incomes = await prisma.income.findMany({
      where: { userId: req.user.id },
      orderBy: { date: 'desc' }
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve incomes' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const parseResult = incomeSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors });
  }
  const { amount, source, date } = parseResult.data;
  try {
    const income = await prisma.income.create({
      data: {
        amount,
        source,
        date: date ? new Date(date) : undefined,
        userId: req.user.id
      }
    });
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create income' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const incomeId = parseInt(req.params.id);
  const parseResult = incomeSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors });
  }
  const { amount, source, date } = parseResult.data;
  try {
    const income = await prisma.income.findFirst({ where: { id: incomeId, userId: req.user.id } });
    if (!income) {
      return res.status(404).json({ error: 'Income not found' });
    }
    const updatedIncome = await prisma.income.update({
      where: { id: incomeId },
      data: { amount, source, date: date ? new Date(date) : undefined }
    });
    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update income' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const incomeId = parseInt(req.params.id);
  try {
    const income = await prisma.income.findFirst({ where: { id: incomeId, userId: req.user.id } });
    if (!income) {
      return res.status(404).json({ error: 'Income not found' });
    }
    await prisma.income.delete({ where: { id: incomeId } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete income' });
  }
});

module.exports = router;
