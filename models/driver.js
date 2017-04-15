const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  email : {
    type: String,
    required: [true,'Email is a required field']
  },
  driving: {
    type: Boolean,
    default: false
  },
  
});

const Driver = mongoose.model('driver', driverSchema);

module.exports = Driver;
