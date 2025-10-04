require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5174',  
    'https://finora-tracker.netlify.app'  
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const apiRouter = require('./routes');
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
