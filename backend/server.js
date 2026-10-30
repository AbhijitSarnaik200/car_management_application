// // const express = require('express');
// // const cors = require('cors');
// // const dotenv = require('dotenv');

// // const connectDB = require('./config/db.js');

// // dotenv.config();

// // const app = express();

// // // Connect Database
// // connectDB();

// // // Middleware
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(cors());

// // // Static Upload Folder
// // app.use('/uploads', express.static('uploads'));

// // // Routes
// // app.use('/api/cars', require('./routes/carRoute.js'));
// // app.use('/api/users', require('./routes/authRoute.js'));

// // // Server
// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //     console.log(`Server Running on ${PORT}`);
// // });



// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const connectDB = require('./config/db.js');
// const app = express();

// // CORS Configuration
// app.use(cors({
//   origin: [
//     'https://car-management-application-puce.vercel.app',
//     'http://localhost:5173'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Static Upload Folder
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/cars', require('./routes/carRoute.js'));
// app.use('/api/users', require('./routes/authRoute.js'));

// // Health Check
// app.get('/', (req, res) => {
//   res.status(200).send('Car Management API is running');
// });

// // Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, async () => {
//   console.log(`Server Running on ${PORT}`);

//   try {
//     await connectDB();
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection failed:', error.message);
//   }
// });




const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db.js');
const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'https://car-management-application-puce.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS before routes
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Upload Folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/cars', require('./routes/carRoute.js'));
app.use('/api/users', require('./routes/authRoute.js'));

// Health Check
app.get('/', (req, res) => {
  res.status(200).send('Car Management API is running');
});

// Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server Running on ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

startServer();
