import express from 'express';

import loadAll from './loaders';
import * as config from './config';
import { createError } from './utils/utils';

const app = express();

app.setup = () => {
  return loadAll(app, config);
};

export default app;