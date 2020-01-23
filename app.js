/**
 * App setup
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var compression = require('compression');

var aboutRouter = require('./routes/about');
var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');
var usersRouter = require('./routes/users');

var app = express();
app.use(compression());

/**
 * Setup view engine
 */

app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');

/**
 * Setup routes
 */

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/todos', todosRouter);
app.use('/users', usersRouter);

/**
 * Setup the rest
 */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// TODO: use a static link until gulp setup to copy the files
app.use(express.static(path.join(__dirname, 'node_modules')));

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
 * Catch 404 and forward to error handler
 */

app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * Error handler
 */

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
