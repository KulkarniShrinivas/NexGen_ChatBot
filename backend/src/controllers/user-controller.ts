import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
//hash is used to encrypt the password
//comapre the password with actual string 
import { hash , compare } from 'bcrypt'
import { createToken } from "../utils/token-manager.js";
import  { COOKIE_NAME } from "../utils/constants.js"

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


        //create token and store cookie 

        //user moves into the login now we want to remove the cookies of the user as well
        // so if the user logs in again now 1st we want remove previous cookie and set current cookie
        //after this create constants.ts in utils
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });


        //create new token here 
        const token = createToken(user._id.toString(), user.email, "7d" );

        //create validation for 7 days
        const expires = new Date();
        expires.setDate(expires.getDate() + 7 );
        //send the token in the form of cookies we want to use cookie backend to frontend by help of packege cookie parser 
        //this will create inside the browser
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });




        return res.status(201).json({ message: "OK", name: user.name, email:user.email});

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


        //user moves into the login now we want to remove the cookies of the user as well
        // so if the user logs in again now 1st we want remove previous cookie and set current cookie
        //after this create constants.ts in utils
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });




        //create new token here 
        const token = createToken(user._id.toString(), user.email, "7d" );

        //create validation for 7 days
        const expires = new Date();
        expires.setDate(expires.getDate() + 7 );
        //send the token in the form of cookies we want to use cookie backend to frontend by help of packege cookie parser 
        //this will create inside the browser
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });




        return res.status(200).json({ message: "OK", name:user.name, email:user.email });

    } catch (error) { 
        console.log(error);
        return res.status(403).json({message: "ERROR", cause: error.message});
        
    }
};


//after completing usersignup and login we need to generate token for login as authentication
//User authentication: user needs to verify the identity  fo appplication
//user needs to provode email password created duirng registration process and then user will be provided token after auth process
//in simple when we join compny we get id card similarly after login will be getting token 
//will be using JWT token used to encrypt payload into a signed  token that has the permission of the user
//we need to send token to the user with help of HTTP only cookies 
//Http cookie that comes with special security that restricts from being accessed by JS in web browser this prevents XSS attacks

//User authentication -> sets  HTTP only signed cookie with JWT token -> User has Token
//access protected resources -> User sends back the cookies -> if the cookie matches and token is valid -> process request else not abort
