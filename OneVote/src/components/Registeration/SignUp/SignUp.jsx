import React from 'react';
import { useState } from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';
import { Link } from 'react-router-dom';

function SignUp(){

    const [formData , setformData] = useState({
        name: '',
        email: '',
        uniqueId: '',
        password: '',
        confirmPassword: ''
    });

    //cannot understand it need to update.
    const isUniqueIdValid = (uniqueId) => {
        return /^\d+$/.test(uniqueId); // Returns true if uniqueId contains only digits
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        //check if unique is atleast 12 digits
        if(formData.uniqueId.length < 12){
            return (alert('unique id must be of atleast 12 digits.'))
        }

        //check if the uniqueId only contsists of numbers.
        if( !isUniqueIdValid(formData.uniqueId)){
            alert('unique id must contain only numbers')
            return;
        }

        //check if password and confirm password field matches.
        if(formData.password != formData.confirmPassword){
            alert('password fields do not match');
            return;
        }

        if(!validatePassword(formData.password)){
            alert('password must be atleast 8 characters long');
            return;
        }

        console.log(formData);
        
        try {
            const response = await fetch('http://localhost:8000/api/signup/',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.name, 
                    email: formData.email,
                    password: formData.password,
                    unique_id: formData.uniqueId
                })
            })

            console.log(response.status);
            console.log(response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            const data = await response.json();
            alert(data.message);

            //setfields to initial.
            setformData({
                name: '',
                email: '',
                uniqueId: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.log('Error during signup: ',error)
            alert('Sign-Up failed , Try again later.')
        }
        
    }

    return(
        <>
            <form 
                action=""
                onSubmit={handleSubmit}
                className='flex flex-col box-border my-3 mx-auto  md:my-0 w-max md:w-full p-4 text-orange-500 shadow-lg shadow-gray-400 bg-gray-100 md:bg-white text-base ubuntu-light-italic md:ubuntu-light-italic md:text-lg rounded-lg gap-y-3 md:gap-y-4 justify-center md:shadow-none '
            >
                <h1 className="text-xl text-center md:hidden">Sign Up</h1>
                <div className="border-[1px] border-orange-400 w-1/2 mb-4 mx-auto md:hidden"></div>
                <label htmlFor="name">
                    Name:
                    <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                            setformData( (prev) => {
                                return ({...prev , name: e.target.value})
                            })
                        }} 
                        className='w-full rounded-lg md:rounded-full p-2 text-sm md:text-base focus-within:bg-orange-400 focus-within:text-white focus-within:ubuntu-medium-italic outline-none md:text-center bg-gray-200 md:bg-gray-100' 
                        required
                    />
                </label>
                

                <label htmlFor="email">
                    Email:
                    <input 
                        type="email"
                        value={formData.email}
                        onChange={(e)=>{
                            setformData( (prev) => {
                                return {...prev , email:e.target.value}
                            })
                        }} 
                        className='w-full rounded-lg md:rounded-full p-2 text-sm focus-within:bg-orange-400 focus-within:text-white focus-within:ubuntu-medium-italic outline-none md:text-base md:text-center bg-gray-200 md:bg-gray-100' 
                        required
                    />
                </label>

                <label htmlFor="UniqueId">
                    Unique Id: 
                    <input 
                        type="text"
                        value={formData.uniqueId}
                        onChange={ (e) => {
                            setformData( (prev) => {
                                return {...prev , uniqueId:e.target.value}
                            })
                        }} 
                        placeholder='enter 12 digit aadhar id'
                        className='w-full rounded-lg md:rounded-full p-2 text-sm focus-within:bg-orange-400 focus-within:text-white focus-within:ubuntu-medium-italic outline-none md:text-base md:text-center bg-gray-200 md:bg-gray-100 focus-within:placeholder:text-gray-800 appearance-none' 
                        required
                    />
                </label>

                <label htmlFor="password">
                    Create Password: 
                    <PasswordInput 
                        value={formData.password}
                        onChange={ (e) => {
                            setformData( (prev) => {
                                return {...prev , password:e.target.value}
                            })
                        }}
                    />
                </label>

                <label htmlFor="confirmPassword">
                    Confirm Password: 
                        <PasswordInput 
                            value={formData.confirmPassword}
                            onChange={ (e) => {
                                setformData( (prev) => {
                                    return {...prev , confirmPassword:e.target.value}
                                })
                            }}
                        />
                </label>

                <button type='submit' className='bg-orange-400 text-white w-max p-2 rounded-lg md:rounded-full md:px-4 mx-auto hover:bg-orange-500 '>
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