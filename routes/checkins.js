var router = require('express').Router();

var DB = require('../models/db');
var Checkin = require('../models/Checkin')(DB.mongoose);

var respond = function(res, result) {
  res.contentType('application/json');
  res.send(JSON.stringify(result));
};

router.get('/', function(req, res) {
  Checkin.search({}, function(resp) {
    respond(res, resp);
  });
});

router.post('/', function(req, res) {
  console.log("BODY", req.body);
  var checkinData = {
    'type': req.body.type,
    'category': req.body.category,
    'VenueName': req.body.VenueName,
    'CheckinDate': req.body.CheckinDate,
    'VenueUrl': req.body.VenueUrl,
    'VenueMapImageUrl': req.body.VenueMapImageUrl,
    'Shout': req.body.Shout
  };
  Checkin.create(checkinData, function(resp) {
    respond(res, resp);
  });
});

module.exports = router;
