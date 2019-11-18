const mongoose = require('mongoose');
const { createTrip, listTrips } = require('../models/Trip');

const data = [
  {
    captainName: 'Patsy Stone',
    vesselName: 'El Tauro',
    arrivalDate: '2056-01-06T15:30:00Z',
    departureDate: '2056-01-05T15:30:00Z',
    arrivalPort: 'Singapore',
    departurePort: 'Tokyo'
  },
  {
    captainName: 'Patsy Stone',
    vesselName: 'El Tauro',
    arrivalDate: '2019-01-06T15:30:00Z',
    departureDate: '2018-01-05T15:30:00Z',
    arrivalPort: 'Singapore',
    departurePort: 'Tokyo'
  }
];

const trip = {
  captainName: 'Elvin Ali',
  vesselName: 'La Bella',
  arrivalDate: '2020-01-06T15:30:00Z',
  departureDate: '2019-01-05T15:30:00Z',
  arrivalPort: 'London',
  departurePort: 'A far away land'
};

describe('Trip Model Test', () => {
  beforeAll(() => {
    return Promise.resolve(
      mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true })
    )
      .then(() => mongoose.connection.db.createCollection('trips'))
      .then(() => mongoose.connection.db.collection('trips').insertMany(data))
      .catch(err => {
        console.log(err);
        process.exit(1);
      });
  });

  afterAll(() => {
    return Promise.resolve().then(() => {
      mongoose.connection.close();
    });
  });

  it('creates trip successfully', () => {
    return Promise.resolve()
      .then(() => createTrip(trip))
      .then(saved => {
        expect(saved._id).toBeDefined();
        expect(saved.captainName).toBe(trip.captainName);
        expect(saved.vesselName).toBe(trip.vesselName);
        expect(new Date(saved.arrivalDate)).toEqual(new Date(trip.arrivalDate));
        expect(new Date(saved.departureDate)).toEqual(
          new Date(trip.departureDate)
        );
        expect(saved.arrivalPort).toBe(trip.arrivalPort);
        expect(saved.departurePort).toBe(trip.departurePort);
      });
  });

  it('lists all trips for Patsy', () => {
    return Promise.resolve()
      .then(() => listTrips('Patsy Stone'))
      .then(list => {
        expect(list).toBeDefined();
        expect(list.captainName).toBe('Patsy Stone');
        expect(list.trips.length).toBe(2);
        const expected = data.map(item => {
          delete item.captainName;
          delete item._id;
          item.arrivalDate = new Date(item.arrivalDate);
          item.departureDate = new Date(item.departureDate);
        });
        const received = list.trips.map(item => {
          item.arrivalDate = new Date(item.arrivalDate);
          item.departureDate = new Date(item.departureDate);
        });
        expect(received).toEqual(expect.arrayContaining(expected));
      });
  });
});
