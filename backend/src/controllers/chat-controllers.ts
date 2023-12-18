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
    //Send all chats with new one to openAi API
    //get latest response
    

  };