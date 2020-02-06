import debugLib from 'debug';
import http from 'http';
import express from 'express';

import { config } from './config';
import runLoaders from './loaders';

async function startTheServer() {
  const app = express();

  const debug = debugLib('app:server');

  debug('Starting app server');

  await runLoaders(app);

  const server = http.createServer(app);

  server.listen(config.node.PORT);

  server.on('listening', () => {
    console.log(`Server started and listening on port ${config.node.PORT}`);
  });

  server.on('error', error => {
    const port = config.node.PORT;
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${port} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`Port ${port}  is already in use`);
        process.exit(1);
        break;
      default:
        console.error(`Port ${port} received error code ${error.code}`);
        throw error;
    }
  });
}

startTheServer();
