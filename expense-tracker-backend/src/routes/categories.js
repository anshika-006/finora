const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const prisma = require('../utils/prisma');
const { categorySchema } = require('../utils/zodSchemas');
router.get('/', authenticateToken, async(req, res) => {
    try {
        const categories = await prisma.category.findMany({
            where: { userId: req.user.id }
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve categories' });
    }
}); 

router.post('/', authenticateToken, async(req, res) => {
    const parseResult = categorySchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors });
    }
    const { name, budget } = parseResult.data;
    try {
        const category = await prisma.category.create({
            data: {
                name,
                budget,
                userId: req.user.id
            }
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
}); 

router.put('/:id', authenticateToken, async(req, res) => {
    const categoryId = parseInt(req.params.id);
    const parseResult = categorySchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors });
    }
    const { name, budget } = parseResult.data;
    try {
        // Ensure the category belongs to the user
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category || category.userId !== req.user.id) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const updatedCategory = await prisma.category.update({
            where: { id: categoryId },
            data: { name, budget }
        });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
});

router.delete('/:id', authenticateToken, async(req, res) => {
    const categoryId = parseInt(req.params.id);
    try {
        // Ensure the category belongs to the user
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category || category.userId !== req.user.id) {
            return res.status(404).json({ error: 'Category not found' });
        }
        await prisma.category.delete({
            where: { id: categoryId }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
});
module.exports = router;
