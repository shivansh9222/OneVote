import React from "react";
import { Link } from "react-router-dom";

function Hero () {
    return (
        <>
            <header className="bg-gray-800 text-white ">
                <nav className="container mx-auto flex justify-between items-center p-5 border-b-[2px] border-white w-full">

                    <Link 
                        to='' 
                        className="hidden md:flex p-2 md:p-3 transition-all duration-200 ease-in-out"
                    >
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/7444/7444400.png" 
                            alt="Logo"
                            className="w-10 h-10 md:w-12 md:h-12"
                        />
                    </Link>

                    <div className="flex">
                        <h1 className="block ubuntu-medium-italic md:ubuntu-bold-italic text-2xl md:text-4xl cursor-pointer items-center transition-all duration-200 ease-in-out">One-Vote</h1>
                    </div>

                    <Link className="text-lg md:text-xl hover:text-gray-300 transition-all duration-200 ease-in-out" to="">Result</Link>
                </nav>
            </header>

            <div 
                className="flex flex-col items-center justify-center h-screen text-center bg-cover bg-center bg-gray-800 text-white overflow-y-auto "
            >
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 transition-all duration-200 ease-in-out">Welcome to OneVote</h1>

                <h2 className="text-xl md:text-3xl font-bold mb-2  transition-all duration-200 ease-in-out">Exercise your duty to vote.</h2>

                <p className="text-lg md:text-xl mb-8 transition-all duration-200 ease-in-out">Voting starts here</p>

                <Link 
                    to="/registeration" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Get Started
                </Link>
            </div>
        </>
    )
}
export default Hero;