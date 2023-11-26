import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";

const userRoutes = Router();

//so after / we dont want to conroll all the request by this so I will be moving to controllers
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);


export default userRoutes;

