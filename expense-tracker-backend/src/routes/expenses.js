const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const prisma = require('../utils/prisma');
const { expenseSchema } = require('../utils/zodSchemas');
router.get('/summary', authenticateToken, (req, res) => {
    const userId = req.user.id;
    prisma.expense.groupBy({
        by: ['categoryId'],
        _sum: {
            amount: true
        },
        where: { userId }
    })
    .then(summary => {
        res.status(200).json(summary);
    })
    .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve expense summary' });
    });
});

router.get('/trends', authenticateToken, (req, res) => {
    const userId = req.user.id;
    prisma.expense.groupBy({
        by: ['date'],
        _sum: {
            amount: true
        },
        where: { userId }
    })
    .then(trends => {
        res.status(200).json(trends);
    })
    .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve expense trends' });
    });
});

router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.id;
    prisma.expense.findMany({
        where: { userId }
    })
    .then(expenses => {
        res.status(200).json(expenses);
    })
    .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve expenses' });
    });
});
router.post('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const parseResult = expenseSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors });
    }
    const { amount, description, categoryId, date } = parseResult.data;
    try {
        const expense = await prisma.expense.create({
            data: {
                amount,
                description,
                categoryId,
                date: new Date(date),
                userId
            }
        });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
});
router.get('/:id', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const expenseId = parseInt(req.params.id);
    prisma.expense.findFirst({
        where: { id: expenseId, userId }
    })
    .then(expense => {
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(expense);
    })
    .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve expense' });
    });
});
router.put('/:id', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const expenseId = parseInt(req.params.id);
    const parseResult = expenseSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors });
    }
    const { amount, description, categoryId, date } = parseResult.data;
    try {
        const expense = await prisma.expense.findFirst({ where: { id: expenseId, userId } });
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        const updatedExpense = await prisma.expense.update({
            where: { id: expenseId },
            data: { amount, description, categoryId, date: new Date(date) }
        });
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update expense' });
    }
});
router.delete('/:id', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const expenseId = parseInt(req.params.id);
    try {
        const expense = await prisma.expense.findFirst({ where: { id: expenseId, userId } });
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        await prisma.expense.delete({ where: { id: expenseId } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
});
router.get('/summary', authenticateToken, (req, res) => {
    const userId = req.user.id;
    prisma.expense.groupBy({
        by: ['categoryId'],
        _sum: {
            amount: true
        },
        where: { userId }
    })
    .then(summary => {
        res.status(200).json(summary);
    })
    .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve expense summary' });
    });
});
router.get('/trends', authenticateToken, (req, res) => {
    const userId = req.user.id;
    prisma.expense.groupBy({
        by: ['createdAt'],
        _sum: {
            amount: true
        },
        where: { userId }
    })
    .then(trends => {
        res.status(200).json(trends);
    })
    .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve expense trends' });
    });
}); 
module.exports = router;
