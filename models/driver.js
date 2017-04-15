const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PointSchema = new Schema({
  type: {
    type: String, default: 'Point'
  },
  coordinates: {type: [Number], index: '2dsphere'}
});

const driverSchema = new Schema({
  email : {
    type: String,
    required: [true,'Email is a required field']
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: PointSchema

});

const Driver = mongoose.model('driver', driverSchema);

module.exports = Driver;
