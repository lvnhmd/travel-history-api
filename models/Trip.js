const mongoose = require('mongoose');
const { Schema } = mongoose;

const TripSchema = new Schema({
  captainName: String,
  vesselName: String,
  arrivalDate: Date,
  departureDate: Date,
  arrivalPort: String,
  departurePort: String
});

const Trip = mongoose.model('Trip', TripSchema);

exports.createTrip = data => {
  return Trip.create(data)
    .then(doc => Promise.resolve(doc))
    .catch(err => Promise.reject(err));
};

exports.listTrips = param => {
  return Trip.find({ captainName: param }, { _id: 0, captainName: 0, __v: 0 })
    .sort({ arrivalDate: 'asc' })
    .then(data => Promise.resolve({ captainName: param, trips: data }))
    .catch(err => Promise.reject(err));
};
