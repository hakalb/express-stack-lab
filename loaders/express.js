import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import passport from 'passport';
import path from 'path';

import {
  jwtPassportStrategy,
  localPassportStrategy
} from '../api/middlewares/passport';

import routes from '../api';
import { config } from '../config';

/**
 * Loading function for express
 */
export default async app => {
  /**
   * Health Check endpoints
   * What's their purpose? // TODO
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  /**
   * Template engine powered by Handlebars
   */
  const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
  });
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Enable protection to well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(helmet());

  // HTTP request logger
  app.use(logger(config.node.IS_PROD ? 'tiny' : 'dev'));

  // Parse cookie header and populate req.cookies
  app.use(cookieParser());

  // Compress HTTP responses
  app.use(compression());

  // Parse HTTP request body (req.body) to json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Static assets
  const pathPrefix = config.node.IS_PROD ? '' : '..';
  app.use(
    '/assets',
    express.static(path.join(__dirname, pathPrefix, 'assets'))
  );
  app.set('views', path.join(__dirname, pathPrefix, 'views'));
  // node_modules is only used in development
  if (!config.node.IS_PROD) {
    app.use(
      '/assets/vendors',
      express.static(path.join(__dirname, '../node_modules'))
    );
  }

  // Passport
  app.use(passport.initialize());
  // Passport validation strategies
  passport.use(localPassportStrategy);
  passport.use(jwtPassportStrategy);

  // Load API routes
  app.use('/', routes());

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error handlers
  app.use((err, req, res, next) => {
    // Handle 401 thrown by passport middleware
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
