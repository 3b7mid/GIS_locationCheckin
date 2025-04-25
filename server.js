import express from 'express';
import 'dotenv/config';
import dbConnection from './utils/db.js';
import mountRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT;

dbConnection();

app.use(express.json());

mountRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});