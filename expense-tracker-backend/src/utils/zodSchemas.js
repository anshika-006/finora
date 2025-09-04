const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  username: z.email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  username: z.email(),
  password: z.string().min(6)
});

const profileUpdateSchema = z.object({
  userId: z.number(),
  username: z.email().optional(),
  password: z.string().min(6).optional(),
  name: z.string().min(2).max(100).optional()
});

const categorySchema = z.object({
  name: z.string().min(1),
  budget: z.number().nonnegative()
});

const expenseSchema = z.object({
  amount: z.number().positive(),
  description: z.string().optional(),
  categoryId: z.number().int().positive(),
  date: z.string().min(1) 
});

const incomeSchema = z.object({
  amount: z.number().positive(),
  source: z.string().min(1),
  date: z.string().optional() 
});

module.exports = {
  registerSchema,
  loginSchema,
  profileUpdateSchema,
  categorySchema,
  expenseSchema,
  incomeSchema
};
