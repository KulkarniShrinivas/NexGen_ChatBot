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
app.use(cors({ origin: ['https://nextgen-chatbot-app.netlify.app', 'http://localhost:5173'], credentials: true }));
// app.use(cors({ origin: "https://nextgen-chatbot.netlify.app", credentials: true }));
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.options('*', cors({ credentials: true, optionsSuccessStatus: 204 }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


//if we make api call to this backend then will seeing log message as well 
//remove it in production
// app.use(morgan("dev"))

app.get("/", (req, res, next) => {
    try {
      res.status(200).json({
        message: "OK",
        description: "Server is running.",
      });
    } catch (err) {
      next(err);
    } finally {
      console.log("Request to / endpoint");
    }
  });


//when we make request on api and this will be handled by appRouter
app.use("/api/v1",appRouter);


export default app;