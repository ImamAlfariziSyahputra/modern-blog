const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

let corsOptions = {
  // origin: '*',
  origin: function (origin, callback) {
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use(cookieParser());

// Routers
const appRoutes = require('./routes/routes.js');
app.use('/api', appRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello Ges' });
});

/* Error handler middleware */
app.use('*', (req, res) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    },
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({
    error: 'true',
    message: err.message,
  });
  return;
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
