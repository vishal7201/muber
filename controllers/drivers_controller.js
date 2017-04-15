const Driver = require('../models/driver');

module.exports = {
  // es6
  greeting(req, res) {
    res.send({hi: 'there'});
  },

  index(req, res, next) {
    // unit system mongo uses is meters
    const {lng, lat} = req.query;

    Driver.geoNear(
      {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
      {spherical: true, maxDistance: 200000}
    )
    .then(drivers => res.send(drivers))
    .catch(next);

  },

  create(req, res, next) {
    let driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    let id = req.params.id;
    let driverProps = req.body;

    Driver.update({_id: id}, driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    let id = req.params.id;
    Driver.findByIdAndRemove({_id: id})
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }

}
