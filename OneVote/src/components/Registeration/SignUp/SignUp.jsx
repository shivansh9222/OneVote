import React from 'react';
import { useState } from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';

function SignUp(){
    return(
        <>
            
            <form 
                action=""
                className='flex flex-col box-border my-3 mx-auto w-max p-4 text-orange-500 shadow-lg shadow-gray-400 bg-gray-100 md:bg-white ubuntu-light-italic md:ubuntu-medium-italic text-lg rounded-lg gap-y-3 md:gap-y-4 justify-center md:shadow-none md:w-full md:my-0'
            >
                <h1 className="text-2xl text-center md:hidden">Sign Up</h1>
                <div className="border-[1px] border-orange-400 w-1/2 mb-4 mx-auto md:hidden"></div>
                <label htmlFor="name">
                    Name:
                    <input 
                        type="text" 
                        className='w-full rounded-lg md:rounded-full p-2 text-sm md:text-base focus-within:bg-orange-400 focus-within:text-white focus-within:ubuntu-medium-italic outline-none md:text-center bg-gray-100' 
                    />
                </label>
                

                <label htmlFor="email">
                    Email:
                    <input 
                        type="email" 
                        className='w-full rounded-lg md:rounded-full p-2 text-sm focus-within:bg-orange-400 focus-within:text-white focus-within:ubuntu-medium-italic outline-none md:text-base md:text-center bg-gray-100' 
                    />
                </label>

                <label htmlFor="UniqueId">
                    Unique Id: 
                    <input 
                        type="number" 
                        className='w-full rounded-lg md:rounded-full p-2 text-sm focus-within:bg-orange-400 focus-within:text-white focus-within:ubuntu-medium-italic outline-none md:text-base md:text-center bg-gray-100' 
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
            </form>
        </>
    )
}

export default SignUp;