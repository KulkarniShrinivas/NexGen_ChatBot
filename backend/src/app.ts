//all of the application qoutes will be handled 

import express from 'express'
import { config } from 'dotenv';
config();

const app = express();

//middlewares
app.use(express.json());

export default app;