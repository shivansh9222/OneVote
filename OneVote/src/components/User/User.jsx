import React, { useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

import {Login , SignUp} from '../index'
import PasswordInput from "../Registeration/PasswordInput/PasswordInput";
import Registeration from "../Registeration/Registeration";
import FaceCaptureModal from "../Modal/FaceCaptureModal";
import {Modal} from '../index'

function User(){
    const {userId} = useParams();

    const[isOpenFace , setIsOpenFace] = useState(false);
    const closeFaceModal = () => {
        setIsOpenFace(false)
    }
    const onCaptureError = () => {
        setshowModal(true)
        setshowMsg('error')
        // alert('error')
        setIsOpenFace(false)
    }
    const onCaptureSuccess = () => {
        setshowModal(true)
        setshowMsg('success')
        setIsOpenFace(false)
    }

    //Modal
    const navigate = useNavigate()
    const [showModal, setshowModal] = useState(false)
    const [showMsg, setshowMsg] = useState('')
    const [path, setpath] = useState()

    const closeModal = () => {
        setshowModal(false);
        if (path) navigate(path)
    }
    return(
        <>
            <FaceCaptureModal 
                isOpenFace={isOpenFace}
                closeFaceModal={closeFaceModal}
                onCaptureError={onCaptureError}
                onCaptureSuccess={onCaptureSuccess}
            />
            <Modal 
                isOpen={showModal}
                closeModal={closeModal}
                message={showMsg}
            />
            {/* <Login /> */}
            {/* <SignUp /> */}
            {/* <Registeration /> */}
            
            <div className="h-[100vh] w-[100vw] bg-gradient-to-r from-white to-orange-50">
                
                {/* <h1 className="text-center text-black text-2xl">
                    User: {userId}
                </h1> */}
                {/* <PasswordInput /> */}
                {/* <Login /> */}
                {/* <SignUp /> */}
                {/* <Registeration /> */}
                <button 
                    onClick={ (e) => {
                            setIsOpenFace(true)
                            // setpath()
                        }
                    }
                >
                        open
                </button>
            </div>
        </>
    )
}

export default User;



// const response = await fetch('http://localhost:8000/api/verify_face/', {
//     method: 'POST',
//     headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ image: capturedImage }),  // Send captured image for verification
// });

// const data = await response.json();