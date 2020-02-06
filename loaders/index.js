import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async app => {
  await mongooseLoader();
  console.log('MongoDB loaded and connected!');

  await expressLoader(app);
  console.log('Express loaded');
};
