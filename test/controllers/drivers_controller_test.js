const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers controllers', () => {
  it('Post to /api/drivers creates a new driver', (done) => {

    Driver.count()
      .then((count)=>{
        request(app)
        .post('/api/drivers')
        .send({email: 'test@test.com'})
        .end((err, response) => {
          Driver.count().then((newCount) =>{
              assert(count+1 === newCount);
              done();
          });
        });
      })
  });

  it('PUT to /api/drivers/:id edits and existing driver', (done) => {
    const driver = new Driver({email: 't@t.com', driving: false});
    driver.save()
      .then(() => {
        request(app)
          .put(`/api/drivers/${driver._id}`)
          .send({driving: true})
          .end(() => {
            Driver.findOne({email: 't@t.com'})
              .then(driver => {
                assert(driver.driving === true);
                done();
              })
          })
      })
  });

  it('DELETE existing driver to /api/drivers/id ', (done) => {
    const driver = new Driver({email: 'test@test.com'});

    driver.save()
      .then(() => {
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end(() => {
              Driver.findOne({email: 'test@test.com'})
                .then((driver) => {
                  assert(driver === null);
                  done();
                });
          });
      })
  });

  it('GET to /api/drivers finds drivers in a location', (done) => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: {type: 'Point', coordinates: [-122.4759902, 47.6147628]}
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: {type: 'Point', coordinates: [-80.253, 25.791]}
    });
// index error will occur beciause we are dropping the collection before each test
// so the index is not maintinted it is only created at starting
// to fix this we add .then(() => drivers.ensureIndex({'geometry.coordinates': '2dsphere'}))
// ensureIndex

// second error \' near'\ field must be point
// in index function we pulled lng and lat from req.query
// when we pull data from req.query it is pulled as strings
// so convert it into number
    Promise.all([seattleDriver.save(), miamiDriver.save()]).
      then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
            assert(response.body.length === 1);
            assert(response.body[0].obj.email === 'miami@test.com');
            done();
          })
      })

  });
});
