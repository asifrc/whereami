var autoIncrement = require('mongoose-auto-increment');

var CONFIG = require('../config');

//JSON response object
var Resp = function(obj) {
  this.error = null;
  this.data = (typeof obj === "object") ? obj : null;
};

var respond = function(ret, cb) {
  if (typeof cb === "function") {
    cb(ret);
  }
  return ret;
};


//Singleton User Schema
var Checkin = false;

//Export Constructor
module.exports = function(mongoose) {
  var self = this;

  /**
   * Checkin Schema and Model
   */

  //Checkin Schema
  var checkinSchema = new mongoose.Schema({
    type: String,
    category: String,
    VenueName: String,
    CheckinDate: String,
    VenueUrl: String,
    VenueMapImageUrl: String,
    Shout: String,
    TS: Date,
  });
  autoIncrement.initialize(mongoose);
  checkinSchema.plugin(autoIncrement.plugin, 'Checkin');

  //Checkin Model
  Checkin = Checkin || mongoose.model('Checkin', checkinSchema);

  self.model = Checkin;

  self.create = function(checkinData, cb) {
    var resp = new Resp();
    console.log(checkinData);
    if (resp.error) {
      return respond(resp, cb);
    }
    else {
      var checkin = new Checkin(checkinData);

      checkin.save(function(err) {
        resp = new Resp({
          'checkins': [checkin],
        });
        resp.error = err;
        return respond(resp, cb);
      });
    }
  };

  self.search = function(criteria, cb) {
    Checkin.find(criteria, function(err, checkins) {
      var resp = new Resp();
      if (err) {
        resp.error = err;
        return respond(resp, cb);
      }
      resp = new Resp({
        'checkins': checkins
      });
      return respond(resp, cb);
    });
  };

  self.removeAll = function(cb) {
    Checkin.remove({}, cb);
  };

  return self;
};
