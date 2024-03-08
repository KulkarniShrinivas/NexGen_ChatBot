//all of the application qoutes will be handled 
//morgan will give logs descriptions and what type of logs or request has been handled

import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors = require('cors');

config();
const app = express();

//middlewares
app.use(cors());
app.options('*', cors({ credentials: true, optionsSuccessStatus: 204 }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


//if we make api call to this backend then will seeing log message as well 
//remove it in production
app.use(morgan("dev"))




//when we make request on api and this will be handled by appRouter
app.use("/api/v1",appRouter);


export default app;