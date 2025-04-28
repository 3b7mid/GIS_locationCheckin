import express from 'express';
import 'dotenv/config';
import dbConnection from './utils/db.js';
import errorHandler from './middlewares/errorHandlerMiddleware.js'
import mountRoutes from './routes/index.js';

const app = express();

dbConnection();

app.use(express.json());

mountRoutes(app);

app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});