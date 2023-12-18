import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";


export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //we want message from the user so from body will be accessing message from body
    const {message} = req.body;

    //now we have message and we need to add validation
    //verify the details of the user

    const user = await User.findById(res.locals.jwtData.id);
    if(!user) return res
    .status(401)
    .json({message:"User not registred OR Token malfunctioned"});


    //grab chat of the User 
    const chats = user.chats.map(({ role, content}) => ({ role, content })); {/**This is the static message of the chat */}
    chats.push({content:message, role:"user" }); {/* push the chats or send the chat from the user */}
    user.chats.push({ content: message, role: "user" }); {/**So we need to store chats in main user objects */}
    //above all will grab the chats of the user     




    //Send all chats with new one to openAi API

    
    //get latest response


  };