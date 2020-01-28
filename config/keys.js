/**
 * Environment keys
 */
const keys = {
  JWT_SECRET: 'my-5uper-5ecret-JWT-key',
  JWT_EXPIRE_IN_SECONDS: 120,
  COOKIE_HTTPS_SECURE: false,
  MONGOOSE_URI: 'mongodb://127.0.0.1/express-stack',
  MONGOOSE_DEBUG: false
};

// TODO move to runtime environment variables

module.exports = keys;
