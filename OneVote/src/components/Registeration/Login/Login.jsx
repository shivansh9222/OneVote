import React, { useContext, useState , useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'
import PasswordInput from "../PasswordInput/PasswordInput";
import UserContext from '../../../context/UserContext'

function Login(){
    const [uniqueId , setUniqueId] = useState('');
    const [password,setPassword] = useState('');

    const{user , setUser , isLoggedIn , setIsLoggedIn} = useContext(UserContext)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/login/' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({unique_id:uniqueId , password}) //{unique_id: uniqueId , password}
            })

            const data = await response.json();
            
            if(response.ok){
                
                setIsLoggedIn(true);
                setUser(data.user_profile)
                
                localStorage.setItem('token' , data.access);
                navigate('/home');
                alert(data.message);
            } else{
                alert(data.message);
            }
        } catch (error) {
            alert('server error');
            console.log(error);
        }

        //setData to default
        setUniqueId('');
        setPassword('');
    }

    const toggleToSignUp = () => {
        navigate('/signUp');
    }

    return(
        <>
            <form action=""
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
                    onClick={handleSubmit}
                    className="mt-2 bg-orange-400 text-white p-1 px-2 md:px-4 rounded-lg md:rounded-[24px] cursor-pointer hover:bg-orange-600"
                >
                    Login
                </button>

                <div className="mt-3 md:hidden">
                    <p className="text-sm">
                        New User?
                        <button 
                            onClick={toggleToSignUp}
                            className="ml-2 text-blue-400 underline cursor-pointer hover:text-blue-600"
                        >
                            Sign-up here.
                        </button>
                    </p>
                </div>
            </form>
        </>
    )
}
export default Login;