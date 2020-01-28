/**
 * App setup
 */

var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var compression = require('compression');
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');

var app = express();

/**
 * Setup view engine
 */

app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');

/**
 * Setup middlewares
 */

app.use(logger('dev'));
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// TODO: use a static link until gulp setup to copy the files
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(passport.initialize());

/**
 * Setup and connect to Mongoose database
 */
mongoose.promise = global.Promise;
mongoose.set('debug', keys.MONGOOSE_DEBUG);
mongoose.connect(keys.MONGOOSE_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () =>
  console.log(`[mongo] connected to ${keys.MONGOOSE_URI}`)
);
mongoose.connection.on('disconnected', () =>
  console.log(`[mongo] disconnected from ${keys.MONGOOSE_URI}`)
);
mongoose.connection.on('error', err =>
  console.error(`[mongo] ${err.name}`, err.message)
);

// Models
require('./models/user');
// Passport validation strategy
require('./config/passport');

/**
 * Setup routes
 */

app.use(require('./routes/index'));

/**
 * Setup error handlers
 */
app.use(logErrors);
app.use(apiErrorHandler);
app.use(catchAllErrorHandler);

/**
 * Setup extension for styles and scripts inside route scripts
 */
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});

/**
 * Log error handler
 */
function logErrors(err, req, res, next) {
  console.group(`HTTP Request Error status=${err.status}`);
  console.error(err.message);
  console.error(err.stack);
  console.groupEnd();
  next(err);
}

/**
 * Api request error handler
 */
function apiErrorHandler(err, req, res, next) {
  if (String(req.url).startsWith('/api')) {
    res
      .status(err.status || 500)
      .send({ status: err.status || '', error: err.message });
  } else {
    next(err);
  }
}

/**
 * Catch-all error handler with error page rendering
 */
// eslint-disable-next-line no-unused-vars
function catchAllErrorHandler(err, req, res, next) {
  const error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', {
    status: err.status,
    error: error,
    message: err.message
  });
}

module.exports = app;
