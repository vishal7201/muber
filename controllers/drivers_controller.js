const Driver = require('../models/driver');

module.exports = {
  // es6
  greeting(req, res) {
    res.send({hi: 'there'});
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
