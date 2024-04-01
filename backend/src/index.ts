import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";


//connections and listeners
//if 5000 port is not available move on to rocess.env in env 

const PORT = process.env.PORT || 5000

connectToDatabase().then(() => {
  app.listen(PORT, ()=> console.log("Server Started & Connected to Database 🤝")
  );
})
.catch((err) => console.log(err));


// import { config } from "dotenv";
// config();

// import app from "./app.js";
// import { connectToDatabase } from "./db/connection.js";
// connectToDatabase();
// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}.`);
// });




















// import express from 'express'
// import { config } from 'dotenv';
// config();

// const app = express();


//new route
//GET - get some data from data base
//PUT - update modify data
//POST -  if you want to create something or postMessage
// DELETE - delete something

//crete routes for above
//in callback function will be having three response req res next
//next is used to move on next middleware that are available

//if we want read data
//hello is static routing and "/user/:id" is dynamic routing and id is variable

// //middlewares
// app.use(express.json());

// app.delete("/user/:id", (req, res, next) => {
//   console.log(req.params.id);
//   return res.send("Hello");
// });



//models- 
//route- all routes of this application
//controller- this will controll incomming api request
//utils- this are utility function
//config- configration of this function