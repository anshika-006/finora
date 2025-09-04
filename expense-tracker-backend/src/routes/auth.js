const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma');
const { registerSchema, loginSchema, profileUpdateSchema } = require('../utils/zodSchemas');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const authenticateToken = require('../middleware/auth');

router.post('/register', async (req, res) => {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors });
    }
    const { name, username, password } = parseResult.data;
    try {
        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                username,
                password: hashedPassword
            }
        });
        res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
});


router.post('/login', async (req, res) => {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors });
    }
    const { username, password } = parseResult.data;
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ id: user.id, username: user.username, name: user.name, token });
    } catch (error) {
        res.status(500).json({ error: 'User login failed' });
    }
});


router.get('/profile', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
});


router.put('/profile', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const parseResult = profileUpdateSchema.safeParse({ ...req.body, userId });
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors });
    }
    const { username, password, name } = parseResult.data;
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        let updateData = {};
        if (username) updateData.username = username;
        if (name) updateData.name = name;
        if (password) updateData.password = await bcrypt.hash(password, 10);
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData
        });
        res.status(200).json({ id: updatedUser.id, username: updatedUser.username, name: updatedUser.name });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user profile' });
    }
});

module.exports = router;