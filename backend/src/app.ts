//all of the application qoutes will be handled 
//morgan will give logs descriptions and what type of logs or request has been handled

import express from 'express'
import { config } from 'dotenv';
import morgan from 'morgan'
import appRouter from './routes/index.js';


config();

const app = express();

//middlewares
app.use(express.json());

//if we make api call to this backend then will seeing log message as well 
//remove it in production
app.use(morgan("dev"))


//when we make request on api and this will be handled by appRouter
app.use("/api/v1",appRouter);

export default app;