var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var config = require('./config');

var uri = 'mongodb://bk:bk@ds053658.mongolab.com:53658/stanza-recurring-events';

var app = express();

app.set('port', process.env.PORT || 3000);

var isProduction = (process.env.NODE_ENV === 'production');

isProduction ? app.set('env', 'production') : app.set('env', 'development');

app.set('views', path.join(config.root, 'server/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(config.root, 'client')));

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function connectMongo() {
  mongoose.connect(uri);
  mongoose.connection.on('connected', onMongoConnected);
  mongoose.connection.on('disconnected', connectMongo);
  mongoose.connection.on('error', console.log);
}

function onMongoConnected() {
  console.log('Mongo connected to', uri);
}

app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode');
});

module.exports = app;

connectMongo();
