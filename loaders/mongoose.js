import mongoose from 'mongoose';

import { config } from '../config';

/**
 * Loading function for mongoose
 */
export default async () => {
  mongoose.promise = global.Promise;

  mongoose.set('debug', config.mongoose.MONGOOSE_DEBUG);

  const conn = await mongoose.connect(config.mongoose.MONGOOSE_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  conn.connection.on('connected', () =>
    console.log(`[mongo] connected to ${config.mongoose.MONGOOSE_URI}`)
  );

  conn.connection.on('disconnected', () =>
    console.log(`[mongo] disconnected from ${config.mongoose.MONGOOSE_URI}`)
  );

  conn.connection.on('error', err =>
    console.error(`[mongo] ${err.name}`, err.message)
  );

  return conn.connection.db;
};
