import { Router } from "express";
import { getAllUsers } from "../controllers/user-controller.js";


const userRoutes = Router();

//so after / we dont want to conroll all the request by this so I will be moving to controllers
userRoutes.get("/", getAllUsers);

export default userRoutes;