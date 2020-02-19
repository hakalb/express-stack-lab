import express from 'express';

import about from './routes/about';
import auth from './routes/auth';
import home from './routes/home';
import login from './routes/login';
import todos from './routes/todos';

export default () => {
  const app = express.Router();

  about(app);
  auth(app);
  home(app);
  login(app);
  todos(app);

  return app;
};
