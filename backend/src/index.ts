// import app from "./app.js";
// import { connectToDatabase } from "./db/connection.js";


//connections and listeners
//if 5000 port is not available move on to rocess.env in env 

// const PORT = process.env.PORT || 5000

// connectToDatabase().then(() => {
//   app.listen(PORT, ()=> console.log("Server Started & Connected to Database 🤝")
//   );
// })
// .catch((err) => console.log(err));


import { config } from "dotenv";
config();

import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
connectToDatabase();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});




















