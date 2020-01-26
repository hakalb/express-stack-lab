const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/*
 * Create users schema
 */

const userSchema = new mongoose.Schema({
  email: String,
  hash: String,
  salt: String
});

/**
 * Create methods
 */

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

userSchema.methods.validatePassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      expires: Date.now() + 30
    },
    'secret' // TODO provide from process.env.secret
  );
};

userSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    expires: new Date(this.expires),
    token: this.generateJWT()
  };
};

mongoose.model('Users', userSchema);
