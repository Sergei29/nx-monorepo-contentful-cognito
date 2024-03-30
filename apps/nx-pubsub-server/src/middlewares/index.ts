import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import config from '../config/config.json';

export * from './setSocketsToResLocals';

export const middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  cors({
    origin: config.authorisedOrigins,
  }),
  cookieParser(),
];
