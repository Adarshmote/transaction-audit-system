const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const usersRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
