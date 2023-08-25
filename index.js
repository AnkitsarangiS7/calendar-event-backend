// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const webhookRouter = require('./src/routes/webhook');


// const app = express();
// const port = 5000;

// // Middleware
// app.use(bodyParser.json());

// // Database connection
// mongoose.connect("mongodb+srv://ankitsarangi21:WU3YnCeZ7PviMoHr@cluster0.kwvgzk6.mongodb.net/?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.on('connected', () => {
//   console.log('Connected to database');
// });

// // Routes

// app.use('/webhook', webhookRouter);

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webhookRouter = require('./src/routes/webhook');
const authRouter = require('./src/routes/auth');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

// Routes

app.use('/webhook', (req, res, next) => {
  console.log('Webhook route hit');
  next();
}, webhookRouter);

app.use('/auth', (req, res, next) => {
  console.log('auth route hit');
  next();
}, authRouter);


// app.use('/auth', authRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
