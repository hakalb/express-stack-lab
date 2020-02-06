import bcrypt from 'bcrypt';

import { UserModel } from '../models/user';

export default class UserService {
  /**
   * Authenticate user by username and password
   * @param {*} username Username to find
   * @param {*} password Password to authenticate
   * @returns Authenticated flag and the user
   */
  async authenticate(username, password) {
    const userDoc = await this.find(username);
    if (!userDoc) {
      console.log(`User not found by username '${username}'`);
      return {
        authenticated: false,
        user: null
      };
    }

    // Check password
    const passwordsMatch = await bcrypt.compare(password, userDoc.passwordHash);
    if (!passwordsMatch) {
      console.log(`Password hash did not match for username '${username}'`);
      return {
        authenticated: false,
        user: userDoc
      };
    }

    // User authenticated
    return {
      authenticated: true,
      user: userDoc
    };
  }

  /**
   * Find user by username and return the user
   * @param {*} username Username to find
   * @returns User object
   */
  async find(username) {
    return await UserModel.findOne({
      username: username
    }).exec();
  }

  /**
   * Register new user
   * @param {*} username Username to register
   * @param {*} password With passord
   * @param {*} email With email
   * @returns Created user when sucessfull
   */
  async register(username, password, email) {
    try {
      const passwordHash = await this.createPasswordHash(password);
      const userDoc = new UserModel({
        username,
        email,
        passwordHash
      });
      const savedUserDoc = await userDoc.save();
      return savedUserDoc;
    } catch (error) {
      console.error('Save new user failed', error);
      return null;
    }
  }

  /**
   * Create password hash with a brute force cost
   * @param {*} password Password to hash
   */
  async createPasswordHash(password) {
    const hashCost = 10;
    return await bcrypt.hash(password, hashCost);
  }
}
