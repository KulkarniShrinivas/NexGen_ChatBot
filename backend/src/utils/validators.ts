//in middlewares will be using express validator that wraps extensive collection of of validtators and santizes by validator.js
//will be having validation chains will be having multiple validations for exaple if we are doing signup
//we need to verify email password username 
//final validator function it will check all of those validations and if there was wrong during validation check then it will send back exact error to client
//everything is successfull willl move forward function 
import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { body } from "express-validator";


export const validate = (validations: ValidationChain[]) => {
    
    return async(req:Request, res:Response, next:NextFunction) => {
        //indide this will run a loop in which will verify all the below and above conditions
        for(let validation of validations) {
            //we need to send the request that we recive from the client nad its promise so we need to wait for check
            const result = await validation.run(req);

            //result means this can be errors
            //after the for loop will verify if there was error or not and if there it will break
            if(!result.isEmpty()) {
                break;
            }
        }
            //if there was error we dont want to move on next middlewares if not we can move
            
            const errors = validationResult(req); 
            //which cann be final middleware that can store some data in database
            if(errors.isEmpty()) {
                return next();
            }
            console.log("Validation Errors:", errors.array());
            return res.status(422).json({ errors: errors.array() });

    };
};


//define validator for signup
//how we can verify this below function? so I above  have created customized validator function where we can verify this details
// Define validator for signup

export const loginValidator = [

    // Email must be a valid email address
    body("email").trim().isEmail().withMessage("Email is required"),

    // Password must be at least 6 characters long
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should contain atleast  6 characters"),
];



export const signupValidator = [
    // Name is required
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];



export const chatCompletionValidator = [
    // Name is required
    body("message").notEmpty().withMessage("Message is required"),
   
];
