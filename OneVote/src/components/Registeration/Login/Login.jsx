import React, { useState } from "react";
import {Link} from 'react-router-dom'
import PasswordInput from "../PasswordInput/PasswordInput";

function Login(){
    const [uniqueId , setUniqueId] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/login/' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({unique_id:uniqueId , password}) //{unique_id: uniqueId , password}
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // console.log(data);
            setUniqueId('')
            setPassword('')

            // if(data.status)
        })
        .catch(error => alert(error))
    }
    return(
        <>
            <form action=""
                onSubmit={handleSubmit}
                className="flex flex-col box-border p-3 gap-y-2 text-base md:text-xl text-orange-500 rounded-lg w-max h-max items-center justify-center mx-auto bg-gray-50 shadow-lg shadow-gray-400 my-2 md:shadow-none md:w-full md:bg-white md:my-0 "
            >
                <h1 className="text-2xl md:hidden">Login</h1>
                <div className="border-[1px] border-orange-400 w-1/2  mb-4 md:hidden"></div>
                <div className="flex flex-col mb-2">
                    <label 
                        htmlFor="userid" className="md:ubuntu-medium-italic ubuntu-light-italic mb-1 "
                    >UniqueId: </label>
                    <input 
                        type="text"
                        value={uniqueId}
                        onChange={ (e) =>  {
                            setUniqueId(e.target.value);
                        }}
                        className="w-full p-1 text-start text-gray-500 rounded-lg md:rounded-full outline-none border-none bg-gray-100 focus-within:bg-orange-400 focus-within:text-white ubuntu-light-italic md:p-2 md:text-center"
                    />
                </div>
                
                <div className="flex flex-col mb-2 transition-all ease-in-out duration-200">
                    <label 
                        htmlFor="password"
                        className="ubuntu-light-italic md:ubuntu-medium-italic mb-1 "
                    >Password: </label>

                    {/* Password Input component added here */}
                    <PasswordInput 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </div>

                <button 
                    type="submit"
                    className="mt-2 bg-orange-400 text-white p-1 px-2 md:px-4 rounded-lg md:rounded-[24px] cursor-pointer hover:bg-orange-600"
                >
                    Login
                </button>

                <div className="mt-3 md:hidden">
                    <p className="text-sm">
                        New User?
                        <Link 
                            to='/signUp'
                            className="ml-2 text-blue-400 underline cursor-pointer hover:text-blue-600"
                        >
                            Sign-up here.
                        </Link>
                    </p>
                </div>
            </form>
        </>
    )
}
export default Login;