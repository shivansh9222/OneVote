import React, { useState } from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import FaceCapture from '../../FaceCapture/FaceCapture';

function SignUp({toggleComponent}) {

    const [isFocusedName , setIsFocusedName] = useState(false);
    const [isFocusedEmail, setisFocusedEmail] = useState(false)
    const [isFocusedUid, setIsFocusedUid] = useState(false)

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [path, setPath] = useState('');
    const [loading, setLoading] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null); // New state for the captured image

    const closeModal = () => {
        setShowModal(false);
        if (path) navigate(path);
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        uniqueId: '',
        password: '',
        confirmPassword: ''
    });

    const isUniqueIdValid = (uniqueId) => /^\d+$/.test(uniqueId);
    const validatePassword = (password) => password.length >= 8;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (formData.uniqueId.length < 12) {
            setModalMessage('UniqueId must be of at least 12 digits.');
            setShowModal(true);
            return;
        }

        if (!isUniqueIdValid(formData.uniqueId)) {
            setModalMessage('UniqueId must contain only numbers');
            setShowModal(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setModalMessage('Password fields do not match');
            setShowModal(true);
            return;
        }

        if (!validatePassword(formData.password)) {
            setModalMessage('Password must be at least 8 characters long');
            setShowModal(true);
            return;
        }

        // Check if image is captured
        if (!capturedImage) {
            setModalMessage('Please capture your face before signing up.');
            setShowModal(true);
            return;
        }

        // Sending signup data including captured image
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/signup/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.name,
                    email: formData.email,
                    password: formData.password,
                    unique_id: formData.uniqueId,
                    image: capturedImage  // Include captured image
                })
            });

            const data = await response.json();
            setModalMessage(data.message);
            setShowModal(true);

            if (data.status === 'success') {
                setPath('/registeration');
            }

            // Reset fields after signup
            setFormData({
                name: '',
                email: '',
                uniqueId: '',
                password: '',
                confirmPassword: ''
            });
            setCapturedImage(null); // Clear captured image
        } catch (error) {
            console.error('Error during signup:', error);
            setModalMessage('Sign-Up failed.');
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    const handleCaptureSuccess = (image) => {
        setCapturedImage(image); // Set captured image in state
        setModalMessage('Face captured successfully.');
        setShowModal(true);
    };

    const handleCaptureError = (error) => {
        setModalMessage(error);
        setShowModal(true);
    };

    return (
        <>
            <Modal 
                isOpen={showModal}
                closeModal={closeModal}
                message={modalMessage}
            />
            <form 
                onSubmit={handleSubmit}
                className='h-max max-w-[80vw] w-max border-2 border-orange-500 mx-auto flex flex-col items-center justify-between px-3 py-4 gap-y-1
                shadow-glow-orange animate-pulse-glow 
                bg-white
                rounded-xl mt-36'
            >

                {/* header section starts here */}
                <h1 className="text-2xl text-orange-500">Sign Up</h1>
                <div className="w-[70%] border-2 border-orange-500  mb-4"></div>
                {/* header section ends here */}
                

                {/* Name Input section starts here*/}
                <div className="w-full h-14 mt-3 border-box px-0.5 flex relative rounded-lg">

                    {/* label section starts here */}
                    <label 
                        htmlFor="name"
                        className={`absolute left-4
                            ${isFocusedName || formData.name ? 'top-0   -translate-y-1/2 bg-white text-sm text-orange-500 z-10' : 'top-1/2 -translate-y-1/2 text-base text-gray-500 -z-10'} p-1 px-2 rounded-xl transition-all ease-in-out duration-150`
                        }
                    >
                        Name
                    </label>
                    {/* label section ends here */}

                    {/* input section starts here */}
                    <input 
                        type="text"
                        value={formData.name}

                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        onFocus={ (e) => {
                                setIsFocusedName(true)
                                e.target.placeholder=''
                            }
                        }
                        onBlur={(e) => {
                                setIsFocusedName(false)
                                e.target.placeholder = 'username'
                            }
                        }
                        placeholder="username"
                        className='w-full h-full text-black bg-orange-50 ubuntu-medium-italic outline-none border-b-4 border-b-orange-500  transition-all ease-in-out duration-150 rounded-md focus-within:border-2 focus-within:border-orange-400 focus-within:rounded-lg pl-2 pt-1 pr-9
                        focus-within:placeholder:none placeholder:text-sm focus-within:bg-white cursor-text' 
                        required
                    />
                    {/* input section ends here */}

                    {/* icon section starts here */}
                    <div
                        className={`
                            h-6 w-6 absolute right-2  ${isFocusedName || formData.name ? 'h-8 w-8 top-0 right-4 -translate-y-1/2 bg-white p-1 z-10 rounded-lg' : ' top-1/2 -translate-y-1/2' }  transition-all ease-in-out duration-150
                            
                        `}
                    >
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/3596/3596091.png"
                            alt="icon" 
                            className="h-full w-full object-contain object-center"
                        />
                    </div>
                    {/* icon section ends here */}
                    
                </div>
                {/* Name input section ends here */}
                

                {/* Email Input section starts here*/}
                <div className="w-full h-14 mt-3 border-box px-0.5 flex relative rounded-lg">

                    {/* label section starts here */}
                    <label 
                        htmlFor="email"
                        className={`absolute left-4
                            ${isFocusedEmail || formData.email ? 'top-0   -translate-y-1/2 bg-white text-sm text-orange-500 z-10' : 'top-1/2 -translate-y-1/2 text-base text-gray-500 -z-10'} p-1 px-2 rounded-xl transition-all ease-in-out duration-150`
                        }
                    >
                        Email:
                    </label>
                    {/* label section ends here */}

                    {/* input section starts here */}
                    <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}

                        onFocus={ (e) => {
                            setisFocusedEmail(true)
                            e.target.placeholder=''
                            }
                        }
                        onBlur={(e) => {
                                setisFocusedEmail(false)
                                e.target.placeholder = 'email here'
                            }
                        }

                        placeholder="email here"
                        className='w-full h-full text-black bg-orange-50 ubuntu-medium-italic outline-none border-b-4 border-b-orange-500  transition-all ease-in-out duration-150 rounded-md focus-within:border-2 focus-within:border-orange-400 focus-within:rounded-lg pl-2 pt-1 pr-9
                        focus-within:placeholder:none placeholder:text-sm focus-within:bg-white cursor-text' 
                        required
                    />
                    {/* input section ends here */}

                    {/* icon section starts here */}
                    <div
                        className={`
                            h-6 w-6 absolute right-2  ${isFocusedEmail || formData.email ? 'h-8 w-8 top-0 right-4 -translate-y-1/2 bg-white z-10 rounded-lg' : ' top-1/2 -translate-y-1/2' }  transition-all ease-in-out duration-150
                            
                        `}
                    >
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/18225/18225534.png"
                            alt="icon" 
                            className="h-full w-full object-contain object-center"
                        />
                    </div>
                    {/* icon section ends here */}

                </div>
                {/* Email Input section ends here */}

                
                {/* Unique ID Input starts here */}
                <div className="w-full h-14 mt-3 border-box px-0.5 flex relative rounded-lg">

                    {/* label section starts here */}
                    <label 
                        htmlFor="UniqueId"
                        className={`absolute left-4
                            ${isFocusedUid || formData.uniqueId ? 'top-0   -translate-y-1/2 bg-white text-sm text-orange-500 z-10' : 'top-1/2 -translate-y-1/2 text-base text-gray-500 -z-10'} p-1 px-2 rounded-xl transition-all ease-in-out duration-150`
                        }
                    >
                        Unique Id
                    </label>
                    {/* label section ends here */}

                    {/* input section starts here */}
                    <input 
                        type="text"
                        value={formData.uniqueId}

                        onChange={(e) => setFormData(prev => ({ ...prev, uniqueId: e.target.value }))}

                        placeholder='Enter 12 digit aadhar id'
                        onFocus={ (e) => {
                                setIsFocusedUid(true)
                                e.target.placeholder=''
                            }
                        }
                        onBlur={(e) => {
                                setIsFocusedUid(false)
                                e.target.placeholder = 'Unique Id'
                            }
                        }

                        className="w-full h-full text-black bg-orange-50 ubuntu-medium-italic outline-none border-b-4 border-b-orange-500  transition-all ease-in-out duration-150 rounded-md focus-within:border-2 focus-within:border-orange-400 focus-within:rounded-lg pl-2 pt-1 pr-9
                        focus-within:placeholder:none placeholder:text-sm focus-within:bg-white cursor-text" 

                        required
                    />
                    {/* input section ends here */}
                    
                    {/* icon section starts here */}
                    <div 
                        className={`
                            h-6 w-6 absolute right-2  ${isFocusedUid || formData.uniqueId ? 'h-8 w-8 top-0 right-4 -translate-y-1/2 bg-white z-10 rounded-md p-1' : ' top-1/2 -translate-y-1/2' }  transition-all ease-in-out duration-150
                            
                        `}
                    >
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/14632/14632474.png"
                            alt="icon" 
                            className="h-full w-full object-contain object-center"
                        />
                    </div>
                    {/* icon section ends here */}
                </div>
                {/* Unique Id input ends here */}
                

                {/* Password Input section starts here*/}
                <PasswordInput 
                    value={formData.password}
                    placeholder={'password'}
                    label={'Password'}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />
                {/* password section ends here */}

                {/* Confirm Password Input starts here*/}
                <PasswordInput 
                    value={formData.confirmPassword}
                    placeholder={'confirm password'}
                    label={'confirm password'}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
                {/* confirm password section ends here */}


                {/* Face Capture Component starts here*/}
                <div 
                    className='w-full flex h-12 box-border bg-orange-50 rounded-lg cursor-pointer items-center justify-between p-1 hover:bg-orange-200 text-gray-700 transition-colors ease-in-out duration-200 mt-3'
                >
                    <span className='flex text-base italic'>
                        Capture Biometric
                    </span>
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/8003/8003466.png" 
                        alt="capture image" 
                        className='h-8 w-8 object-cover object-center'
                    />
                </div>

                {/* <div>
                    <h2>Signup - Face Registration</h2>
                    <FaceCapture
                        onCaptureSuccess={handleCaptureSuccess}
                        onCaptureError={handleCaptureError}
                    />
                </div> */}
                {/* Face Capture Component ends here */}

                {/* Submit Button */}
                <button 
                    type='submit' 
                    className={`bg-orange-400 text-white w-max md:rounded-full px-4 py-1 rounded-3xl md:px-4 mx-auto ${loading ? 'opacity-50' : 'hover:bg-orange-500'} mt-3`} 
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign-Up"}
                </button>
                {/* submit button section ends here */}

                {/* New User Section starts here */}
                <div className="mb-2">
                    <p className="text-base text-orange-500 mt-2 font-light italic">
                        Already an User ?
                        <button 
                            onClick={toggleComponent}
                            className="ml-2 text-sm text-blue-500 hover:text-blue-700 italic underline"
                        >
                            login here.
                        </button>
                    </p>
                </div>
                {/* New User Section ends here */}
                
            </form>
        </>
    );
}

export default SignUp;