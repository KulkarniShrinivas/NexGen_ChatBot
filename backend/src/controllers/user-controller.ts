import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
//hash is used to encrypt the password
import { hash  } from 'bcrypt'

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    //getting all the user from the database
    try {
        //get all users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users});

    } catch (error) {
        return res.status(400).json({message: "ERROR", cause: error.message});
        
    }
};

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("Request Body Before Validation:", req.body);

    //getting all the user from the database
    try {
        //user signup
        //will be getting data from client in below format 
        // {
        //     "name": "Shrinivas Kulkarni",
        //     "email": "kulkarni@gmail.com",
        //     "password": "12345"
        // }
 
        //destructure above 
        const { name, email, password } = req.body;
        //before creating new user we need to encrypt oassword using bcrypt so that we cant store password in backend
        const hashedPassword = await hash(password, 10);
        //now create brand new user
        const user = new User({ name, email, password: hashedPassword });

        //for saving new record in database 
        await user.save();
        return res.status(200).json({ message: "OK", id:user._id.toString()});

    } catch (error) { 
        console.log(error);
        return res.status(400).json({message: "ERROR", cause: error.message});
        
    }
};