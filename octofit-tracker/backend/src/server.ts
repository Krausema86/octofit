import 'dotenv/config';
import './config/database.js';

import cors from 'cors';
import express from 'express';
import apiRouter from './routes/api.js';

const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';

const app = express();

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`OctoFit Tracker API running on port ${port}`);
});