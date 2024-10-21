import React, { useState } from "react";

export default function Contact(){
    const [name , setUserName] = useState('');
    const [email , setEmail] = useState('');
    const [queries, setQuery] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/contactus/',{
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
            alert(data.message);
        // if(response.status === 'success'){
        //     const jsonResponse = await response.json();
        //     alert(jsonResponse.message);
        // } else{
        //     const errorResponse = await response.json();
        //     alert(errorResponse.message);
        // }
    }

    return(
        <div>
            <form 
                onSubmit={handleSubmit}
                
                className="flex flex-col items-center gap-y-0.5 text-base md:font-semibold mt-2 mb-2 lg:text-xl"
            >
                <h2>Contact Us</h2>
                <div className="w-1/2 border-[1px] border-orange-600 mb-2"></div>
                <div className="flex flex-col text-sm md:text-base gap-y-1 bg-orange-400 p-3 md:p-5 md:gap-y-[1.5] text-white rounded-lg mg-3">
                    <label htmlFor="name">Name: </label>
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
                    />
                    <label htmlFor="query">Write Your Queries: </label>
                    <textarea 
                        name="query" 
                        value={queries}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        className="outline-none border-none rounded-lg p-2 md:p-3 py-2 text-black text-sm ubuntu-light-italic md:ubuntu-medium-italic w-[100%]"
                    />
                    <button 
                        type="submit"
                        className="bg-white text-black w-max mx-auto p-1 px-2 mt-2  rounded-lg shadow-lg hover:px-8 hover:font-semibold transition-all ease-in-out duration-200"
                    >
                        Send
                    </button>
                </div>
                
            </form>
        </div>
    )
}