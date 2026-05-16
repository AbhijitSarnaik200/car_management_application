const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db.js');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Static Upload Folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/cars', require('./routes/carRoute.js'));
app.use('/api/users', require('./routes/authRoute.js'));

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});
