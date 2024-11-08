import React, { useState } from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import {Header} from '../index'
import { Link } from "react-router-dom";


function Registeration(){

    const[isLoginClicked, setIsLoginClicked] = useState(true);
    const[isSignUpClicked, setIsSignUpClicked] = useState(false);

    const handleClick = () => {
        setIsLoginClicked(isSignUpClicked);
        setIsSignUpClicked(isLoginClicked);
    }

    return (
        <main 
            className="h-[100vh] w-[100vw] flex flex-col sm:flex-row bg-gradient-to-r from-orange-50 to-orange-100"
        >
            <nav 
                className="bg-orange-400 h-[20%] w-full sm:h-full sm:w-[40%] flex items-center"
            >
                <h1 
                    className="box-border text-center ubuntu-bold-italic text-xl text-white p-4"
                >
                    Welcome , Please Login or SignUp to Continue.
                </h1>
            </nav>
            <div 
                className="bg-pink-500 h-[80%] w-full sm:h-full sm:w-[90%]"
            >

            </div>
        </main>
    );
}

export default Registeration;