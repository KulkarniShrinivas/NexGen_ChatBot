import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from '../config/openai-config.js';
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { config } from 'dotenv';


export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //we want message from the user so from body will be accessing message from body
    const {message} = req.body;
    try {
        //now we have message and we need to add validation
    //verify the details of the user

    const user = await User.findById(res.locals.jwtData.id);
    if(!user) return res
    .status(401)
    .json({message:"User not registred OR Token malfunctioned"});


    //grab chat of the User blow =>{/**This is the static message of the chat */}
    const chats = user.chats.map(({ role, content }) => ({ 
        role,
        content,
      })) as ChatCompletionRequestMessage[];
      chats.push({ content: message, role: "user" }); {/* push the chats or send the chat from the user */}
      user.chats.push({ content: message, role: "user" }); {/**So we need to store chats in main user objects */}
      //above all will grab the chats of the user     
  
    



    //Send all chats with new one to openAi API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    // get latest response
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
  
  };



  export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res
        .status(200)
        .json({ message: "OK", chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  

  export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      //@ts-ignore
      user.chats = [];
      await user.save();
      return res
        .status(200)
        .json({ message: "OK"});
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  