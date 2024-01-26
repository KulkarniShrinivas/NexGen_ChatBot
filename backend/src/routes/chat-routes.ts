import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { validate, chatCompletionValidator } from '../utils/validators.js';
import { generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";


//Protected API
const chatRoutes = Router();
{/* /api/chat/new  */}
chatRoutes.post(
    "/new", 
    validate(chatCompletionValidator), 
    verifyToken,
    generateChatCompletion
); 

chatRoutes.get(
    "/all-chats", 
    verifyToken,
    sendChatsToUser
); 


    

export default chatRoutes;