import 'dotenv/config';
import './config/database.js';

import cors from 'cors';
import express from 'express';
import { apiBaseUrl, port } from './config/apiUrl.js';
import apiRouter from './routes/api.js';

const codespaceName = process.env.CODESPACE_NAME;
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';

const app = express();

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`OctoFit Tracker API running at ${apiBaseUrl}`);
});