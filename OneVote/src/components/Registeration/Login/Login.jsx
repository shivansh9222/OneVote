import React, { useContext, useState , useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'
import PasswordInput from "../PasswordInput/PasswordInput";
import UserContext from '../../../context/UserContext'
import Modal from "../../Modal/Modal";
import FaceCapture from "../../FaceCapture/FaceCapture";

function Login(){

    //Biometrics section starts here
    const handleSuccess = (message) => alert(message);
    const handleError = (error) => alert(error);
    //Biometrics section ends here

    const [uniqueId , setUniqueId] = useState('');
    const [password,setPassword] = useState('');

    const{user , setUser , isLoggedIn , setIsLoggedIn} = useContext(UserContext)

    // Modal section starts here.
    const [showModal , setShowModal] = useState(false);
    const [modalMessage , setModalMessage] = useState('');
    const [modalLink, setModalLink] = useState('');
    const [path , setPath] = useState('');

    const closeModal = () => {
        setShowModal(false);
        navigate(path);
    }
    // Modal section ends here

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // if(!uniq 
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

                // Modal section
                setModalMessage(data.message)
                setPath('/home')
                setShowModal(true)
            } else{
                setModalMessage(data.message)
                // setModalLink(crossSymbol)
                setPath('/registeration')
                setShowModal(true)
            }
        } catch (error) {
            setModalMessage('server error')
            setPath('/registeration')
            setShowModal(true)
            // alert('server error');
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
            {/* Modal Component */}
            <Modal 
                isOpen={showModal} 
                closeModal={closeModal} 
                message={modalMessage}
                link={modalLink}
            />


            <form action=""
                className="h-max max-w-[80vw] w-[300px] border-2 border-orange-500 mx-auto"
            >
                <h1 className="">Login</h1>
                <div className=""></div>
                <div className="">

                    <label 
                        htmlFor="userid" className=""
                    >
                        UniqueId: 
                    </label>

                    <input 
                        type="text"
                        value={uniqueId}
                        onChange={ (e) =>  {
                            setUniqueId(e.target.value);
                        }}
                        className=""
                    />

                    <span>

                    </span>
                </div>
                
                <div className="">
                    

                    {/* Password Input component added here */}
                    <PasswordInput 
                        value={password}
                        label={'Password'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </div>

                <button 
                    type="submit"
                    onClick={handleSubmit}
                    className=""
                >
                    Login
                </button>

                <div className="">
                    <p className="text-sm">
                        New User?
                        <button 
                            onClick={toggleToSignUp}
                            className=""
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