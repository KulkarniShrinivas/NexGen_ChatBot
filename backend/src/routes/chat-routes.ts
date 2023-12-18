import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";


//Protected API
const chatRoutes = Router();
{/* /api/chat/new  */}
chatRoutes.post("/new", verifyToken); 

export default chatRoutes;