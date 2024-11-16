import React from "react";
import { Link, NavLink } from "react-router-dom";

function Hero () {
    // console.log(`${apiUrl}/api/login/`)
    return (
        <main className="h-screen w-screen">
            <header 
                className="flex items-center justify-center sticky top-0 right-0 z-30 bg-orange-500 text-white w-full max-h-[15vh] min-h-[70px] md:h-[10vh]  "
                >
                <nav 
                    className="container mx-auto flex justify-between items-center p-3 w-full h-full"
                >

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

                    <NavLink 
                        to="/results"
                        className={({isActive}) => {
                            return `text-base md:text-xl transition-all duration-200 ease-in-out rounded-[20px]  py-1 px-3 ${isActive ? 'text-orange-500 bg-white' : ''} hover:text-orange-400 hover:bg-white flex`
                        }}
                    >
                        Result
                    </NavLink>
                </nav>
            </header>

            <div 
                className="flex flex-col items-center justify-center h-[90vh] md:h-[90vh] w-full text-center text-black overflow-y-auto 
                bg-[url('https://i.pinimg.com/originals/16/10/79/161079382ab41eb5712b3c97aa9145a1.gif')]
                bg-cover md:bg-contain bg-center bg-repeat-none
                "
            >
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 transition-all duration-200 ease-in-out">Welcome to OneVote</h1>

                <h2 className="text-xl md:text-3xl font-bold mb-2  transition-all duration-200 ease-in-out">Exercise your duty to vote.</h2>

                <p className="text-lg md:text-xl mb-8 transition-all duration-200 ease-in-out">Voting starts here</p>

                <Link 
                    to="/registeration" 
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Get Started
                </Link>
            </div>
        </main>
    )
}
export default Hero;