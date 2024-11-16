import React, { useState } from "react";
import { apiUrl } from "..";
import Modal from "../Modal/Modal";

export default function Contact(){
    const [name , setUserName] = useState('');
    const [isNameFocused, setIsNameFocused] = useState(false)

    const [email , setEmail] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false)

    const [queries, setQuery] = useState('');
    const[loading , setLoading] = useState(false);


    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const closeModal = (e) => {
        setShowModal(false);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true)
        const response = await fetch(`${apiUrl}/api/contactus/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, queries})
        })
            setUserName('');
            setEmail('');
            setQuery('');
            const data = await response.json();
            setModalMessage(data.message)
            setShowModal(true)
            // alert(data.message);
            setTimeout( () => {setLoading(false)} , 1000) 
            // setLoading(false)
    }

    return(
        <>
            <Modal 
                isOpen={showModal}
                closeModal={closeModal}
                message={modalMessage}
            />
            <form 
                onSubmit={handleSubmit}
                
                className="flex flex-col items-center gap-y-0.5 text-base md:font-semibold mt-2 mb-2 lg:text-xl"
            >
                <h2>Contact Us</h2>
                <div className="w-1/2 border-[1px] border-orange-600 mb-2"></div>

                
                <div 
                    className="flex flex-col text-sm md:text-base gap-y-3 bg-orange-50 p-3 md:p-5 md:gap-y-2  rounded-lg mg-3 border-2 border-orange-500"
                >
                    {/* Username section starts here */}
                    <div 
                        className="w-full h-14 mt-2 border-box px-0.5 flex relative rounded-lg"
                    >

                        {/* label section starts here */}
                        <label 
                            htmlFor="userid" 
                            className={`absolute left-4
                                ${isNameFocused || name ? 'top-0   -translate-y-1/2 bg-white text-sm font-light text-orange-500 z-10' : 'top-1/2 -translate-y-1/2 text-base text-gray-500 -z-10'} p-1 px-2 rounded-xl transition-all ease-in-out duration-150`
                            }
                        >
                            Name
                        </label>
                        {/* label section ends here */}

                        {/* input section starts here */}
                        <input 
                            type="text"
                            value={name}
                            placeholder="name"

                            onChange={ (e) =>  {
                                setUserName(e.target.value);
                            }}
                            onFocus={ (e) => {
                                    setIsNameFocused(true)
                                    e.target.placeholder=''
                                }
                            }
                            onBlur={(e) => {
                                    setIsNameFocused(false)
                                    e.target.placeholder = 'Name'
                                }
                            }

                            className="w-full h-full text-black ubuntu-medium-italic outline-none border-b-4 border-b-orange-500  transition-all ease-in-out duration-150 rounded-md focus-within:border-2 focus-within:border-orange-400 focus-within:rounded-lg pl-2 pt-1 pr-9
                            focus-within:placeholder:none placeholder:text-sm focus-within:bg-white cursor-text"
                        />
                        {/* input section ends here */}

                        {/* icon section starts here */}
                        <div 
                            className={`
                                h-6 w-6 sm:h-6 sm:w-6 absolute right-2  ${isNameFocused || name ? 'h-8 w-8 top-0 right-4 -translate-y-1/2 bg-white z-10 rounded-lg' : ' top-1/2 -translate-y-1/2' }  transition-all ease-in-out duration-150
                                
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
                    {/* Username section ends here */}


                    {/* Email section starts here */}
                    <div 
                        className="w-full h-14 mt-2 border-box px-0.5 flex relative rounded-lg"
                    >

                        {/* label section starts here */}
                        <label 
                            htmlFor="userid" 
                            className={`absolute left-4
                                ${isEmailFocused || email ? 'top-0   -translate-y-1/2 bg-white text-sm text-orange-500 z-10 font-light' : 'top-1/2 -translate-y-1/2 text-base text-gray-500 -z-10'} p-1 px-2 rounded-xl transition-all ease-in-out duration-150`
                            }
                        >
                            Email
                        </label>
                        {/* label section ends here */}

                        {/* input section starts here */}
                        <input 
                            type="text"
                            value={email}
                            placeholder="email"

                            onChange={ (e) =>  {
                                setEmail(e.target.value);
                            }}
                            onFocus={ (e) => {
                                    setIsEmailFocused(true)
                                    e.target.placeholder=''
                                }
                            }
                            onBlur={(e) => {
                                    setIsEmailFocused(false)
                                    e.target.placeholder = 'email'
                                }
                            }

                            className="w-full h-full text-black ubuntu-medium-italic outline-none border-b-4 border-b-orange-500  transition-all ease-in-out duration-150 rounded-md focus-within:border-2 focus-within:border-orange-400 focus-within:rounded-lg pl-2 pt-1 pr-9
                            focus-within:placeholder:none placeholder:text-sm focus-within:bg-white cursor-text"
                        />
                        {/* input section ends here */}

                        {/* icon section starts here */}
                        <div 
                            className={`
                                h-6 w-6 sm:h-8 sm:w-8 absolute right-2  ${isEmailFocused || email ? 'h-8 w-8 top-0 right-4 -translate-y-1/2 bg-white z-10 rounded-lg' : ' top-1/2 -translate-y-1/2' }  transition-all ease-in-out duration-150
                                
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
                    {/* Email section ends here */}


                    {/* <label htmlFor="name">Name: </label>
                    <input 
                        type="text" 
                        name="userName" 
                        value={name}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                        className="outline-none border-none rounded-lg p-1 md:p-2 pl-2 text-black text-sm ubuntu-light-italic md:ubuntu-medium-italic w-[100%]" 
                    />
                    <label htmlFor="Email">Email: </label>
                    <input 
                        type="email" 
                        name="userEmail"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="outline-none border-none rounded-lg p-1 md:p-2 pl-2 text-black text-sm ubuntu-light-italic md:ubuntu-medium-italic w-[100%]" 
                    /> */}

                    {/* Queries Section starts here */}
                    <label htmlFor="query" className="text-orange-500">Write Your Queries: </label>
                    <textarea 
                        name="query" 
                        value={queries}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        className="outline-none border-2 border-orange-400 rounded-lg p-2 md:p-3 py-2 text-black text-sm ubuntu-light-italic md:ubuntu-medium-italic w-[100%]"
                    />
                    {/* Queries section ends here */}

                    {/* button section starts here */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`bg-white text-black w-max mx-auto p-1 px-2 mt-2  rounded-lg shadow-lg border-[1px] border-orange-400 hover:px-8 hover:font-semibold   hover:text-white transition-all ease-in-out duration-200 ${loading ? 'hover:bg-orange-200 border-none' : 'hover:bg-orange-400'}`}
                    >
                        {loading ? 'sending...' : 'Send'}
                        {/* Send */}
                    </button>
                    {/* button section ends here */}
                </div>
            </form>
        </>
    )
}