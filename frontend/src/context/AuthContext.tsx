//rendering navigatio links but there would be some conditions 
//when the user logged in then we want to show links for go to chat to show chat window 
//if user not logged in then we want to show login and signup
//handle this 2 scenarios we need overall state managment in our application
//so that any children component in any component  we can get the state  if the user logged in or not 
//we need stat mangment to wrap the full application with state will be using context API
//it is easy to do context api compare to redux

//------------------------------------------------><-------------------------------------------------------------->

//in this willl provide whole user object in which user logged in then will be reciving details of the user email,id,name
//and will be having logged in property user logged in or not so we can store boolean variable
//fuction for login and logout
//I will define above all this


import { createContext } from "react";

const AuthContext 