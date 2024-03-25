import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  //   userLogout,
  userSignup,
  verifyUser,
} from "../controllers/user-controller.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

//so after / we dont want to conroll all the request by this so I will be moving to controllers
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
// userRoutes.get("/logout", verifyToken, userLogout);

export default userRoutes;
