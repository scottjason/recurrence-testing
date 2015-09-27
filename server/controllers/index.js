var Activity = require('../models/Activity');

exports.render = function(req, res, next) {
  res.render('index');
};

exports.saveActivity = function(req, res, next) {

  var activity = new Activity();

  activity.name = req.body.activity.name;
  activity.description = req.body.activity.description;
  activity.category = req.body.activity.category;

  activity.dates.start = req.body.activity.dates.start;
  activity.dates.end = req.body.activity.dates.end;

  activity.isRecurring = req.body.activity.isRecurring;
  activity.isFirstOccurence = req.body.activity.isFirstOccurence;
  activity.recurringId = req.body.activity.recurringId;

  activity.recurrence.frequency = req.body.activity.frequency;
  activity.recurrence.interval = req.body.activity.interval;
  activity.recurrence.byDay = req.body.activity.byDay;
  activity.recurrence.expires = req.body.activity.expires;

  activity.save(function(err, savedActivity) {
    if (err) return next(err);
    if (savedActivity.isRecurring && savedActivity.isFirstOccurence) {
      console.log('Activity Saved Successfuly .. Invoking onFirstOccurence');
      req.savedActivity = savedActivity;
      exports.onFirstOccurence(req, res, next);
    } else {
      console.log('Activity Saved Successfuly');
      res.status(200).send(savedActivity);
    }
  });
};

exports.onFirstOccurence = function(req, res, next) {

  // Run Luke's Logic Here With Required Interval Props *Only* on the First Request
  // make async call to api
  // callback
  // do other async db stuff
  // callback
  // send response with saved activity that has the mongo id
  res.status(200).send(req.savedActivity);
};
