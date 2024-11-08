import React, { useContext, useState , useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'
import PasswordInput from "../PasswordInput/PasswordInput";
import UserContext from '../../../context/UserContext'
import Modal from "../../Modal/Modal";
import FaceCapture from "../../FaceCapture/FaceCapture";

function Login({toggleComponent}){

    //style elements
    const [isFocused , setIsFocused] = useState(false);

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
                className="h-max max-w-[80vw] w-max box-border border-2 border-orange-500 mx-auto flex flex-col items-center justify-between px-3 py-4 gap-y-1
                shadow-glow-orange animate-pulse-glow 
                bg-white
                rounded-xl
                "
            >
                {/* Heading section starts here */}
                <h1 className="text-2xl text-orange-500">Login</h1>
                <div className="w-[70%] border-2 border-orange-500  mb-4"></div>
                {/* Heading section ends here */}

                {/* Input id sectio starts here */}
                <div className="w-full h-14 mt-2 border-box px-0.5 flex relative rounded-lg">

                    {/* label section starts here */}
                    <label 
                        htmlFor="userid" 
                        className={`absolute left-4
                            ${isFocused || uniqueId ? 'top-0   -translate-y-1/2 bg-white text-sm text-orange-500 z-10' : 'top-1/2 -translate-y-1/2 text-base text-gray-500 -z-10'} p-1 px-2 rounded-xl transition-all ease-in-out duration-150`
                        }
                    >
                        Unique Id
                    </label>
                    {/* label section ends here */}

                    {/* input section starts here */}
                    <input 
                        type="text"
                        value={uniqueId}
                        placeholder="Unique Id"

                        onChange={ (e) =>  {
                            setUniqueId(e.target.value);
                        }}
                        onFocus={ (e) => {
                                setIsFocused(true)
                                e.target.placeholder=''
                            }
                        }
                        onBlur={(e) => {
                                setIsFocused(false)
                                e.target.placeholder = 'Unique Id'
                            }
                        }

                        className="w-full h-full text-black bg-orange-50 ubuntu-medium-italic outline-none border-b-4 border-b-orange-500  transition-all ease-in-out duration-150 rounded-md focus-within:border-2 focus-within:border-orange-400 focus-within:rounded-lg pl-2 pt-1 pr-9
                        focus-within:placeholder:none placeholder:text-sm focus-within:bg-white cursor-text"
                    />
                    {/* input section ends here */}

                    {/* icon section starts here */}
                    <div 
                        className={`
                            h-6 w-6 absolute right-2  ${isFocused || uniqueId ? 'h-8 w-8 top-0 right-4 -translate-y-1/2 bg-white z-10 rounded-lg' : ' top-1/2 -translate-y-1/2' }  transition-all ease-in-out duration-150
                            
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
                {/* Input Id section endss here */}
                
                {/* Enter password section starts here */}
                <div className="">
                    {/* Password Input component added here */}
                    <PasswordInput 
                        value={password}
                        label={'Password'}
                        placeholder={'password'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* Enter password section ends here */}

                {/* Login button and forget password starts here */}
                <div className="flex flex-col gap-y-1 mt-3">

                    {/* Login Button section starts here */}
                    <button 
                        type="submit"
                        onClick={handleSubmit}
                        className="box-border bg-orange-500 text-white py-1 rounded-2xl hover:bg-orange-600"
                    >
                        Login
                    </button>
                    {/* Login Button section ends here */}

                    {/* forget password section starts here */}
                    <Link 
                        className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer italic underline"
                    >
                        forgot password ?
                    </Link>
                    {/* forget password section ends here */}

                </div>
                {/* Login button and forget password ends here */}

                {/* New User Section starts here */}
                <div className="mb-2">
                    <p className="text-base text-orange-500 mt-2 font-light italic">
                        New User ?
                        <button 
                            onClick={toggleComponent}
                            className="ml-2 text-sm text-blue-500 hover:text-blue-700 italic underline"
                        >
                            Sign-up here.
                        </button>
                    </p>
                </div>
                {/* New User Section ends here */}

            </form>
        </>
    )
}
export default Login;