import React from 'react';
import { useState } from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';
import { Link } from 'react-router-dom';

function SignUp(){
    return(
        <>
            
            <form 
                action=""
                className='flex flex-col box-border my-3 mx-auto  md:my-0 w-max md:w-full p-4 text-orange-500 shadow-lg shadow-gray-400 bg-gray-100 md:bg-white text-base ubuntu-light-italic md:ubuntu-light-italic md:text-lg rounded-lg gap-y-3 md:gap-y-4 justify-center md:shadow-none '
            >
                <h1 className="text-xl text-center md:hidden">Sign Up</h1>
                <div className="border-[1px] border-orange-400 w-1/2 mb-4 mx-auto md:hidden"></div>
                <label htmlFor="name">
                    Name:
                    <input 
                        type="text" 
                        className='w-full rounded-lg md:rounded-full p-2 text-sm md:text-base focus-within:bg-orange-400 focus-within:text-white focus-within:ubuntu-medium-italic outline-none md:text-center bg-gray-200 md:bg-gray-100' 
                    />
                </label>
                

                <label htmlFor="email">
                    Email:
                    <input 
                        type="email" 
                        className='w-full rounded-lg md:rounded-full p-2 text-sm focus-within:bg-orange-400 focus-within:text-white focus-within:ubuntu-medium-italic outline-none md:text-base md:text-center bg-gray-200 md:bg-gray-100' 
                    />
                </label>

                <label htmlFor="UniqueId">
                    Unique Id: 
                    <input 
                        type="number" 
                        min={100000000000}
                        max={999999999999}
                        placeholder='enter 12 digit aadhar id'
                        className='w-full rounded-lg md:rounded-full p-2 text-sm focus-within:bg-orange-400 focus-within:text-white focus-within:ubuntu-medium-italic outline-none md:text-base md:text-center bg-gray-200 md:bg-gray-100 focus-within:placeholder:text-gray-800 appearance-none' 
                    />
                </label>

                <label htmlFor="password">
                    Create Password: 
                    <PasswordInput />
                </label>

                <label htmlFor="confirmPassword">
                    Confirm Password: 
                        <PasswordInput />
                </label>

                <button className='bg-orange-400 text-white w-max p-2 rounded-lg md:rounded-full md:px-4 mx-auto hover:bg-orange-500 '>
                    Sign-Up
                </button>

                <div className='text-sm md:hidden ubuntu-light-italic mx-auto'>
                    Already have an account?
                    <Link to='/login' className='text-blue-400 hover:text-blue-500 text-sm md:hidden underline text-center ml-3'>
                        Login
                    </Link>
                </div>
                
            </form>
        </>
    )
}

export default SignUp;