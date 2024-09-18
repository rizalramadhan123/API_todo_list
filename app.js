const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const checklistRoutes = require('./routes/checklist');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware untuk mengurai JSON
app.use(express.json());

// Routes
app.use('/', authRoutes);
app.use('/', checklistRoutes);

// Port
const PORT = process.env.PORT || 3000;

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
