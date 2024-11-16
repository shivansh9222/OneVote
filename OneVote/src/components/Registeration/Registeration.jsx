import React, { useState } from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import {Header} from '../index'
import { Link } from "react-router-dom";


function Registeration(){

    const [showLogin, setshowLogin] = useState(true)
    const [showSignUp, setshowSignUp] = useState(false)
    const [biometricSuccess, setbiometricSuccess] = useState(false)

    const toggleComponent = () => {
        setshowLogin(!showLogin)
        setshowSignUp(!showSignUp)
    }

    return (
        <main 
            className="h-[100vh] w-[100vw] flex flex-col sm:flex-row bg-gradient-to-r from-orange-50 to-orange-100"
        >
            <nav 
                className="bg-orange-400 h-[10%] max-h-[100px] w-full sm:h-full sm:max-h-full sm:w-[40%] sm:max-w-[250px] hidden sm:flex items-center justify-center py-3 sm:py-0 "
            >
                <h1 
                    className="box-border text-center ubuntu-bold-italic text-lg sm:text-xl text-white p-4"
                >
                    Welcome , Please Login or SignUp to Continue.
                </h1>
            </nav>
            <div 
                className="bg-white h-[100%] w-full sm:h-full sm:w-[90%] flex items-center justify-center overflow-x-hidden overflow-y-auto transition-all ease-in-out duration-200 relative"
            >
                {showLogin ? <Login toggleComponent={toggleComponent} /> : <SignUp toggleComponent={toggleComponent} success={biometricSuccess}/>}
            </div>
        </main>
    );
}

export default Registeration;