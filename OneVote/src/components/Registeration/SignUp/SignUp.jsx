import React, { useState } from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import FaceCapture from '../../FaceCapture/FaceCapture';

function SignUp() {
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
                className='flex flex-col box-border my-3 mx-auto md:my-0 w-max max-h-max md:w-full p-4 text-orange-500 shadow-lg shadow-gray-400 bg-gray-100 md:bg-white text-base ubuntu-light-italic md:ubuntu-light-italic md:text-lg rounded-lg gap-y-3 md:gap-y-4 justify-center md:shadow-none'
            >
                <h1 className="text-xl text-center md:hidden">Sign Up</h1>
                <div className="border-[1px] border-orange-400 w-1/2 mb-4 mx-auto md:hidden"></div>
                
                {/* Name Input */}
                <label htmlFor="name">
                    Name:
                    <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className='w-full rounded-lg md:rounded-full p-2 text-sm md:text-base focus-within:bg-orange-400 focus-within:text-white outline-none md:text-center bg-gray-200 md:bg-gray-100' 
                        required
                    />
                </label>

                {/* Email Input */}
                <label htmlFor="email">
                    Email:
                    <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className='w-full rounded-lg md:rounded-full p-2 text-sm focus-within:bg-orange-400 focus-within:text-white outline-none md:text-base md:text-center bg-gray-200 md:bg-gray-100' 
                        required
                    />
                </label>

                {/* Unique ID Input */}
                <label htmlFor="UniqueId">
                    Unique Id:
                    <input 
                        type="text"
                        value={formData.uniqueId}
                        onChange={(e) => setFormData(prev => ({ ...prev, uniqueId: e.target.value }))}
                        placeholder='Enter 12 digit aadhar id'
                        className='w-full rounded-lg md:rounded-full p-2 text-sm focus-within:bg-orange-400 focus-within:text-white outline-none md:text-base md:text-center bg-gray-200 md:bg-gray-100 appearance-none' 
                        required
                    />
                </label>

                {/* Password Input */}
                <label htmlFor="password">
                    Create Password: 
                    <PasswordInput 
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    />
                </label>

                {/* Confirm Password Input */}
                <label htmlFor="confirmPassword">
                    Confirm Password: 
                    <PasswordInput 
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                </label>

                {/* Submit Button */}
                <button 
                    type='submit' 
                    className={`bg-orange-400 text-white w-max p-2 rounded-lg md:rounded-full md:px-4 mx-auto ${loading ? 'opacity-50' : 'hover:bg-orange-500'}`} 
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign-Up"}
                </button>

                {/* Face Capture Component */}
                <div>
                    <h2>Signup - Face Registration</h2>
                    <FaceCapture
                        onCaptureSuccess={handleCaptureSuccess}
                        onCaptureError={handleCaptureError}
                    />
                </div>
            </form>
        </>
    );
}

export default SignUp;