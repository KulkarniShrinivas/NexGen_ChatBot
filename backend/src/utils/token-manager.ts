//after completing usersignup and login we need to generate token for login as authentication
//User authentication: user needs to verify the identity  fo appplication
//user needs to provode email password created duirng registration process and then user will be provided token after auth process
//in simple when we join compny we get id card similarly after login will be getting token 
//will be using JWT token used to encrypt payload into a signed  token that has the permission of the user
//we need to send token to the user with help of HTTP only cookies 
//Http cookie that comes with special security that restricts from being accessed by JS in web browser this prevents XSS attacks

//User authentication -> sets  HTTP only signed cookie with JWT token -> User has Token
//access protected resources -> User sends back the cookies -> if the cookie matches and token is valid -> process request else not abort


import  jwt  from "jsonwebtoken";



export const createToken = (id:string, email:string, expiresIn: string) => {
    const payload = { id, email };
    //secreat Key is required for hasing to  sign the token or encrypt the token
    //secreat key is private key to encrypt
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        //provide expires in
        expiresIn,
    });
    return token;
};
