import React from 'react';
import { useState } from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import {FaceCapture} from '../../index'

function SignUp(){

    //Biometrics Section starts here
    const handleSuccess = (message) => alert(message);
    const handleError = (error) => alert(error);

    //Biometrics section ends here

    // Modal section starts here.
    const [showModal , setShowModal] = useState(false);
    const [modalMessage , setModalMessage] = useState('');
    const [path , setPath] = useState('');

    const closeModal = () => {
        setShowModal(false);
        navigate(path);
    }
    // Modal section ends here
    
    const [formData , setformData] = useState({
        name: '',
        email: '',
        uniqueId: '',
        password: '',
        confirmPassword: ''
    });

    //cannot understand it need to update.
    const isUniqueIdValid = (uniqueId) => {
        return /^\d+$/.test(uniqueId); 
        // Returns true if uniqueId contains only digits
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        //check if unique is atleast 12 digits
        if(formData.uniqueId.length < 12){
            setModalMessage('UniqueId must be of atleast 12 digits.')
            // setPath()
            setShowModal(true)
            // return (alert('UniqueId must be of atleast 12 digits.'))
            return
        }

        //check if the uniqueId only contsists of numbers.
        if( !isUniqueIdValid(formData.uniqueId)){
            setModalMessage('UniqueId must contain only numbers')
            setShowModal(true);
            // alert('UniqueId must contain only numbers')
            return;
        }

        //check if password and confirm password field matches.
        if(formData.password != formData.confirmPassword){
            setModalMessage('Password fields do not match')
            setShowModal(true)
            // alert('Password fields do not match');
            return;
        }

        if(!validatePassword(formData.password)){
            setModalMessage('Password must be atleast 8 characters long')
            setShowModal(true)
            // alert('Password must be atleast 8 characters long');
            return;
        }
        

        //fetching signup from the server.
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

            const data = await response.json();
            setModalMessage(data.message)
            setShowModal(true)
            // alert(data.message);

            if(data.status === 'success'){
                window.location.href = '/registeration';
            }

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
            setModalMessage('Sign-Up failed.')
            setShowModal(true)
            // alert('Sign-Up failed.')
        }
        
    }

    const navigate = useNavigate();

    const toggleToLogin = () => {
        navigate('/registeration')
    }

    return(
        <>
            <Modal 
                isOpen={showModal}
                closeModal={closeModal}
                message={modalMessage}
            />
            <form 
                action=""
                onSubmit={handleSubmit}
                className='flex flex-col box-border my-3 mx-auto  md:my-0 w-max max-h-max md:w-full p-4 text-orange-500 shadow-lg shadow-gray-400 bg-gray-100 md:bg-white text-base ubuntu-light-italic md:ubuntu-light-italic md:text-lg rounded-lg gap-y-3 md:gap-y-4 justify-center md:shadow-none'
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
                    <button 
                        onClick={toggleToLogin}
                        className='text-blue-400 hover:text-blue-500 text-sm md:hidden underline text-center ml-3'
                    >
                        Login
                    </button>
                </div>

                {/* Face Section starts here */}
                <div>
                    <h2>Signup - Face Registration</h2>
                    <FaceCapture
                        endpoint="http://localhost:8000/api/register-face/" // Backend registration endpoint
                        onCaptureSuccess={handleSuccess}
                        onCaptureError={handleError}
                    />
                </div>
                {/* Face Section ends here */}
            </form>
        </>
    )
}

export default SignUp;