import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      return response.status(400).json({
        error: error.message,
      });
    }

    return response.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    });
  }
);

const PORT = 3333;
app.listen(PORT, () => console.log(`Server running at ${PORT} port`));
