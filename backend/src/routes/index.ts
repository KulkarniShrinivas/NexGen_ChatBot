import { Router } from "express";
import userRouter from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = Router();

//once we move on to the domain then we can move on to app.ts that is /api/v1 
//then it will be transferred to appRouter
//when the request is for user then useRouter will be handled 

appRouter.use("/user", userRouter); //domain/api/v1/user

//if the request is on chat then chatRoutes gona handle that 
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats


export default appRouter;