const HttpStatus = require('http-status-codes');
const mongoose = require('mongoose');
const decode = require('urldecode')

const { createTrip, listTrips } = require('./models/Trip');

require('dotenv').config({ path: './.env' });

const error = err => {
  const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = HttpStatus.getStatusText(statusCode);
  return {
    statusCode,
    headers: { 'Content-Type': 'text/plain' },
    body: message
  };
};

module.exports.postTrip = event => {
  const data = JSON.parse(event.body);
  return Promise.resolve(mongoose.connect(process.env.DB, { useNewUrlParser: true }))
    .then(() => createTrip(data))
    .then(doc => ({
      statusCode: HttpStatus.CREATED,
      body: JSON.stringify(doc)
    }))
    .catch(err => error(err));
};

module.exports.getTrips = event => {
  const { captainName } = event.pathParameters;
  return Promise.resolve(mongoose.connect(process.env.DB), { useNewUrlParser: true })
    .then(() => listTrips(decode(captainName)))
    .then(data => {
      const statusCode = data.trips.length
        ? HttpStatus.OK
        : HttpStatus.NO_CONTENT;
      const body = data.trips.length ? JSON.stringify(data) : '';
      return { statusCode, body };
    })
    .catch(err => error(err));
};
