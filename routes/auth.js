const jwt = require('express-jwt');

/**
 * Get token from request
 * @param {*} req HttpRequest
 */
const getTokenFromHeaders = req => {
  // Map authorization from request headers
  const {
    headers: { authorization }
  } = req;

  // Get the token next after 'Token'
  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

/**
 * Return authentication object with database id in payload object
 */
const auth = {
  required: jwt({
    secret: 'secret', // TODO provide from process.env.secret
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: 'secret', // TODO provide from process.env.secret
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};

module.exports = auth;
