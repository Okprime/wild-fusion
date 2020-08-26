require('dotenv').config();

const express = require('express');
const cors = require('cors');
const user = require('./route/user');
const prescription = require('./route/prescription');
const errorHandler = require('./lib/request_error_handler');
const responseManager = require('./lib/response_manager_middleware');
const jwtVerify = require('./lib/validate');

require('./settings/settings');

const app = express();

// require('./cron/cron');

const port = process.env.PORT || 8080;
const appName = process.env.APP_NAME;


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(jwtVerify);
app.use(responseManager);
app.use(prescription);
app.use(user);
app.use(cors());

// Endpoint 1

app.get('/', (req, res) => {
  console.log('Welcome to WILD FUSION DRUG PRESCRIPTION API');
  res.send('Welcome to WILD FUSION DRUG PRESCRIPTION API');
});

app.listen(port, (res) => {
  console.log(`${appName} is listening on ${port}`);
});
app.use(errorHandler);
