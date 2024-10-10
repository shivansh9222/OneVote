import React, { useState } from "react";
import {Link} from 'react-router-dom'

function Login(){
    const [showPassword , setShowPassword] = useState(false);
    
    const handleImageClick = () => {
        setShowPassword(!showPassword);
    }
    return(
        <>
            <form action="" 
                className="flex flex-col box-border p-3 gap-y-2 text-orange-500 rounded-lg w-max h-[50vh] items-center justify-center mx-auto text-base overflow-auto bg-gray-50 shadow-lg shadow-gray-400 my-2"
            >
                <h1 className="text-2xl">Login</h1>
                <div className="border-[1px] border-orange-400 w-1/2  mb-4"></div>
                <div className="flex flex-col mb-2">
                    <label 
                        htmlFor="userid" className="ubuntu-light-italic mb-1"
                    >UserId: </label>
                    <input 
                        type="text" 
                        className="w-full p-1 text-start text-white rounded-lg outline-none border-none bg-orange-400 ubuntu-light-italic"
                    />
                </div>
                
                <div className="flex flex-col mb-2 transition-all ease-in-out duration-200">
                    <label 
                        htmlFor="password"
                        className="ubuntu-light-italic mb-1"
                    >Password: </label>
                    <div className="flex w-full gap-y-[-3px] items-center justify-end relative">
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            name="pass" 
                            id=""
                            className="w-full p-1 text-start text-white rounded-lg outline-none border-none bg-orange-400 ubuntu-light-italic"
                        /> 
                        <div 
                            className="text-black absolute right-1"
                        >
                            <img 
                                src={showPassword ? 'https://cdn-icons-png.flaticon.com/512/709/709612.png' : 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png'}
                                alt="eye" 
                                onClick={handleImageClick}
                                className="w-6 h-6 cursor-pointer bg-transparent"
                            />
                        </div>
                    </div>
                    
                </div>

                <button 
                    className="mt-2 bg-orange-400 text-white p-1 px-2 rounded-lg  cursor-pointer hover:bg-orange-600"
                >
                    Login
                </button>

                <div className="mt-3">
                    <p className="text-sm">
                        New User?
                        <Link className="ml-2 text-blue-500 underline cursor-pointer">
                            Sign-up here.
                        </Link>
                    </p>
                </div>
            </form>
        </>
    )
}
export default Login;