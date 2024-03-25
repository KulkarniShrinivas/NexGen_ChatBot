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


import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { loginUser, checkAuthStatus, signupUser } from "../helpers/api-communicator";

//here we are using typescript so will mention type
type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;

    //functions for login logout and promise for void will not return anything 
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    //logout once we move logout we need to remove cookies 
    logout: () => Promise<void>;

};

const AuthContext = createContext<UserAuth | null>(null);

//authprovider it will wrap all the childerens present in that
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    //handle couple of states within the provider
    const [user, setUser] = useState<User | null>(null);

    //login
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //after refresh we need to run effect code we can run a function and will verify if the user cookies
    //are still there if the cookies are valid then user doesnt need to be logged in 

    useEffect(() => {
        //fetch if the users cookies are valid then skip the login 
        async function checkStatus() {
            const data = await checkAuthStatus();

            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);


    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
            localStorage.setItem('token', data.token);
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };


    const signup = async (name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        if (data) {
            localStorage.setItem('token', data.token);
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
    const logout = async () => {
        // await logoutUser();
        localStorage.clear();
        setIsLoggedIn(false);
        setUser(null);
        // window.location.reload();
    };

    //define the values

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>


};

//create context that can be used by children 
export const useAuth = () => useContext(AuthContext);