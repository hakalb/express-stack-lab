/**
 * App setup
 */

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import exphbs from 'express-handlebars';
import compression from 'compression';
import mongoose from 'mongoose';
import passport from 'passport';

import { jwtPassportStrategy, localPassportStrategy } from './config/passport';
import * as routeApi from './routes/api';
import * as routePage from './routes/pages';
//import { section } from './views/helpers/section';

const app = express();

/**
 * Setup view engine
 */

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: {
    /**
     * Add tailor made sections, like in Razor, to pre-defined parts of the layouts.
     * @example
     * // Add a stylesheet to layout header
     * {{#section "head"}}
     *   <link rel="stylesheet" href="view-stylesheets.css">
     * {{/section}}
     *
     * // Add a script to layout end
     * {{#section "scripts"}}
     *   <script scr="view-script.js">
     * {{/section}}
     */
    section: function(name, options) {
      // Init all sections
      if (!this._sections) this._sections = {};
      // Init current section
      if (!this._sections[name]) this._sections[name] = '';
      // Append new content as new row
      this._sections[name] += `${options.fn(this)}\n`;
      return null;
    }
  }
});
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

/**
 * Setup middlewares
 */

app.use(logger('dev'));
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(
  '/assets/vendors',
  express.static(path.join(__dirname, 'node_modules'))
);
app.use(passport.initialize());

/**
 * Setup and connect to Mongoose database
 */
mongoose.promise = global.Promise;
mongoose.set('debug', process.env.MONGOOSE_DEBUG);
mongoose.connect(process.env.MONGOOSE_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () =>
  console.log(`[mongo] connected to ${process.env.MONGOOSE_URI}`)
);
mongoose.connection.on('disconnected', () =>
  console.log(`[mongo] disconnected from ${process.env.MONGOOSE_URI}`)
);
mongoose.connection.on('error', err =>
  console.error(`[mongo] ${err.name}`, err.message)
);

// Passport validation strategies
passport.use(localPassportStrategy);
passport.use(jwtPassportStrategy);

/**
 * Setup routes
 */

app.use('', routePage.home);
app.use('/about', routePage.about);
app.use('/todos', routePage.todos);
app.use('/api/auth', routeApi.auth);

/**
 * Setup error handlers
 */
app.use(logErrors);
app.use(apiErrorHandler);
app.use(catchAllErrorHandler);

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

export default app;
