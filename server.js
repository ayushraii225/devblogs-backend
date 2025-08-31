const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const blogs = require('./routes/blogs');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS

const corsOptions = {
  origin: 'https://my-site-f4sw5voc-ar5565471.wix-vibe.com', 
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));


// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/blogs', blogs);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

