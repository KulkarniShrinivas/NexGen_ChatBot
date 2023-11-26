import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
//hash is used to encrypt the password
//comapre the password with actual string 
import { hash , compare } from 'bcrypt'

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
        console.log(error);
        return res.status(400).json({message: "ERROR", cause: error.message});
        
    }
};

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    

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

        //before signup will verify if the email is present in database 
        const existingUser = await User.findOne({ email });

        //then will verify the existing user then it means user has same email then we can send response
        if (existingUser) return res.status(401).send("User already registered");

        //before creating new user we need to encrypt oassword using bcrypt so that we cant store password in backend
        const hashedPassword = await hash(password, 10);

        //now create brand new user
        const user = new User({ name, email, password: hashedPassword });

        //for saving new record in database 
        await user.save();
        return res.status(201).json({ message: "OK", id:user._id.toString()});

    } catch (error) { 
        console.log(error);
        return res.status(401).json({message: "ERROR", cause: error.message});
        
    }
};



export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

   

    //getting all the user from the database
    try {
       //user login
       
        const { email, password } = req.body;

        //first we need find the user from there email
        const user = await User.findOne({ email });

        //first will verify the user if his present in database or registered 
        if (!user) {
            return res.status(401).send("User not registered");
          }
          
        //now verify the password for authentication purpose and so this will give us boolean value and promise is resolved 
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
          return res.status(403).send("Incorrect Password");
        }


        return res.status(200).json({ message: "OK", id:user._id.toString()});

    } catch (error) { 
        console.log(error);
        return res.status(403).json({message: "ERROR", cause: error.message});
        
    }
};