import React, { useEffect, useState } from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';
import { useNavigate , Link } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import FaceCaptureModal from '../../Modal/FaceCaptureModal';
import { apiUrl } from '../..';
import Tooltip from '../../Footer/Tooltip';

function SignUp({toggleComponent}) {

    // console.log(`${apiUrl}/api/signup/`)

    const [isFocusedName , setIsFocusedName] = useState(false);
    const [isFocusedEmail, setisFocusedEmail] = useState(false)
    const [isFocusedUid, setIsFocusedUid] = useState(false)

    //Modal section starts here
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [path, setPath] = useState('');
    //Modal section ends here

    const [loading, setLoading] = useState(false);

    // New state for the captured image
    const [capturedImage, setCapturedImage] = useState(null);
    
    //Face Capture Modal starts here
    const[isOpenFace , setIsOpenFace] = useState(false);
    const closeFaceModal = () => {
        setIsOpenFace(false)
    }
    //Face Capture Modal ends here


    //Face Verification section starts here

    const [caputureSuccess, setCaptureSuccess] = useState(false)
    const [uploadSuccess, setuploadSuccess] = useState(false)
    const [imageUrl , setimageUrl] = useState('');
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [glow , setGlow] = useState(false);


    const uploadBiometrics = async (image) => {

        const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
        const cloudapi = import.meta.env.VITE_CLOUDINARY_URL;

        const imageData = new FormData();
        imageData.append("file", image);
        imageData.append("upload_preset", uploadPreset);

        try {
                setLoadingUpload(true);
                const response = await fetch(cloudapi, {
                    method: "POST",
                    body: imageData,
                });

                const data = await response.json();

                if (response.ok) {
                    setimageUrl(data.url);
                    // console.log(data.url);
                    setModalMessage('Image uploaded successfully!')
                    setShowModal(true);
                    setuploadSuccess(true);
                    setGlow(false)
                } else {
                    console.error("Image upload failed:", data.error);
                    setModalMessage('Image upload failed!')
                    setShowModal(true)
                    setCaptureSuccess(false)
                }
            } catch (error) {
                console.error("An error occurred while uploading:", error);
                setModalMessage("An unexpected error occurred!")
                setShowModal(true);
                setCaptureSuccess(false)
            } finally {
                setLoadingUpload(false);
            }
        
    }

    //Face Verification section ends here.

    const closeModal = () => {
        setShowModal(false);
        // if (path) navigate(path);
        setIsOpenFace(false)
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
            setModalMessage('Unique Id must contain only numbers');
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
        if (!capturedImage || !imageUrl) {
            setModalMessage('Please capture your face before signing up.');
            setShowModal(true);
            return;
        }

        // console.log('handle submit' , imageUrl)

        // Sending signup data including captured image
        try 
        {
            setLoading(true);
            const response = await fetch( `${apiUrl}/api/signup/` , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.name,
                    email: formData.email,
                    password: formData.password,
                    unique_id: formData.uniqueId,
                    imageUrl: imageUrl  
                    // Include captured image url
                })
            });

            // console.log(capturedImage)

            const data = await response.json();

            if(response.ok){
                setModalMessage(data.message);
                setShowModal(true);

                // Reset fields after signup
                setFormData({
                    name: '',
                    email: '',
                    uniqueId: '',
                    password: '',
                    confirmPassword: ''
                });
                setCapturedImage(null); 
                setimageUrl('')
                setCaptureSuccess(false)
                setuploadSuccess(false);
                setGlow(false)
            } else {
                setModalMessage(data.message);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setModalMessage('Sign-Up failed.');
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    // const navigate = useNavigate();

    //Image capture section starts
    const handleCaptureSuccess = (image) => {
        setCapturedImage(image);
        // Set captured image in state
        setModalMessage('Face captured successfully.');
        setShowModal(true);
        setCaptureSuccess(true)
        setGlow(true)
    };

    const handleCaptureError = (error) => {
        setModalMessage(error);
        setShowModal(true);
    };
    //Image capture section ends

    //Reset Camera here
    const resetCamera = () => {
        setCaptureSuccess(false)
        setuploadSuccess(false)
        setCapturedImage(null)
        setGlow(false)
        setModalMessage('Image Reset Success');
        setShowModal(true)
    }

    //Preview image here
    const previewImage = () => {
        if (imageUrl){
            window.open(imageUrl, '_blank');
        } else{
            setModalMessage('No image uploaded to preview')
            setShowModal(true)
        }
    }

    return (
        <>
            <Modal 
                isOpen={showModal}
                closeModal={closeModal}
                message={modalMessage}
            />
            <FaceCaptureModal 
                isOpenFace={isOpenFace}
                closeFaceModal={closeFaceModal}
                onCaptureError={handleCaptureError}
                onCaptureSuccess={handleCaptureSuccess}
            />
            <main 
                className='max-h-[96vh] sm:max-h-[90vh] max-w-[80vw] w-max sm:w-[400px] border-2 border-orange-500 mx-auto flex flex-col items-center justify-between px-3 py-4 gap-y-1
                shadow-glow-orange animate-pulse-glow 
                bg-white
                rounded-xl mt-8 overflow-y-auto mb-3'
            >

                {/* header section starts here */}
                <h1 className="text-2xl text-orange-500">
                    Sign Up
                </h1>
                <div className="w-[70%] border-2 border-orange-500 mb-2 sm:mb-4"></div>
                {/* header section ends here */}
                

                {/* Name Input section starts here*/}
                <div className="w-full h-14 mt-3 sm:mt-3 border-box px-0.5 flex relative rounded-lg">

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
                        focus-within:placeholder:none placeholder:text-sm focus-within:bg-white ' 
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
                <div className="w-full h-14 mt-4 sm:mt-3 border-box px-0.5 flex relative rounded-lg">

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
                <div className="w-full h-14 mt-4 sm:mt-3 border-box px-0.5 flex relative rounded-lg">

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
                    className={`
                        w-full flex h-12 box-border rounded-lg cursor-pointer items-center justify-between p-1 text-gray-700 transition-colors ease-in-out duration-200 mt-3 

                        ${uploadSuccess ? 'bg-green-400 pointer-events-none text-white'  : 'bg-orange-100 hover:bg-orange-200 '}

                        ${glow ? 'shadow-glow-orange animate-pulse-glow' : 'shadow-none animate-none'}
                    `}
                    
                >
                    {/* capture starts button */}
                    <button 
                        className={`${caputureSuccess ? 'hidden' : 'flex'} text-base italic text-center h-full items-center justify-center w-[calc(100%-1.5rem)]`}
                        onClick={() => setIsOpenFace(true)}
                    >
                        Capture Biometrics
                    </button>
                    {/* capture button ends  */}

                    {/* upload button starts */}
                    <button 
                        className={`${!caputureSuccess ? 'hidden' : 'flex'} flex text-md italic items-center justify-center h-full w-[calc(100%-1.5rem)]`}
                        onClick={
                            () => {
                                uploadBiometrics(capturedImage)
                            }
                        }
                        disabled={loadingUpload}
                    >
                        {loadingUpload ? 'Uploading Biometrics ...' : 'Upload Biometrics'}
                    </button>
                    {/* upload button ends */}

                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/8003/8003466.png" 
                        alt="capture image" 
                        className='h-6 w-6 object-cover object-center'
                    />
                    
                </div>
                {/* Face Capture Component ends here */}

                {/* Reset and preview section starts here */}
                <div 
                    className='w-full h-12 flex items-center justify-evenly mt-3 bg-orange-100 rounded-lg'
                >
                    {/* Capture Reset starts here */}
                    <div 
                        className='h-6 w-6 sm:h-8 sm:w-8 box-border flex items-center justify-center bg-orange-200 hover:bg-orange-300 rounded-full'
                    >
                        <Tooltip content="Reset Capture" position={`-bottom-[40%] left-[100%]`}>
                            <button 
                                className='h-full w-full flex transition-all ease-in-out duration-150 hover:animate-bounce' 
                                onClick={resetCamera} 
                                disabled={loading}
                            >
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/6357/6357059.png" 
                                    alt="reset" 
                                    className='h-full w-full object-contain object-center'
                                />
                            </button>
                        </Tooltip>
                    </div>
                    {/* Capture Reset ends here */}

                    {/* Preview image section starts here */}
                    <div 
                        className='h-6 w-6 sm:h-8 sm:w-8 box-border flex items-center justify-center rounded-lg'
                    >
                        <Tooltip content="Preview image" position={`-bottom-[40%] left-[100%]`}>
                            <button 
                                className='h-full w-full flex transition-all ease-in-out duration-150 hover:animate-bounce' 
                                onClick={previewImage} 
                                disabled={loading}
                            >
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/1185/1185279.png" 
                                    alt="preview" 
                                    className='h-full w-full object-cover object-center'
                                />
                                {/* <video
                                    width="h-full"
                                    height="w-full"
                                    preload="none"
                                    style={{
                                        background: "transparent url('https://cdn-icons-png.flaticon.com/512/12744/12744527.png') 50% 50% / fit no-repeat",
                                    }}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    >
                                    <source
                                        src="https://cdn-icons-mp4.flaticon.com/512/12744/12744527.mp4"
                                        type="video/mp4"
                                    />
                                </video> */}
                                
                            </button>
                        </Tooltip>
                    </div>
                    {/* Preview image section ends here */}
                </div>
                {/* Reset and preview section ends here */}
                

                {/* Submit Button */}
                <button 
                    type='submit' 
                    className={`bg-orange-400 text-white w-max md:rounded-full px-4 py-1 rounded-3xl md:px-4 mx-auto ${loading ? 'opacity-50' : 'hover:bg-orange-500'} mt-5`} 
                    disabled={loading}
                    onClick={handleSubmit}
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
                
            </main>
        </>
    );
}

export default SignUp;