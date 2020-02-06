import express from 'express';

import about from './routes/about';
import auth from './routes/auth';
import home from './routes/home';
import todos from './routes/todos';

export default () => {
  const app = express.Router();

  about(app);
  auth(app);
  home(app);
  todos(app);

  return app;
};
