import React from "react";
import {Link , NavLink} from 'react-router-dom';

export default function Header() {
    return (
        <header 
            className="sticky top-0 z-20"
            style={{boxShadow: '0px 10px 10px rgba(200 200 200 / 0.6)'}}
        >
            <nav className="flex h-[10vh] min-h-[80px] p-2  bg-white text-sm md:text-base border-b-[4px] border-orange-500">
                <div className="flex h-full w-full items-center justify-between">
                    <Link 
                        to='/' 
                        className="flex w-1/3 p-2 md:p-3"
                        
                    >
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/7444/7444400.png" 
                            alt="Logo"
                            className="w-10 h-10 md:w-12 md:h-12"
                        />
                    </Link>

                    <div><h1 className="hidden md:block ubuntu-bold-italic text-4xl text-orange-600 cursor-pointer items-center">One-Vote</h1></div>

                    <ul className="flex w-[60%] md:w-1/3 justify-evenly items-center ubuntu-light-italic md:ubuntu-medium-italic">
                        <li>
                            <NavLink 
                                to='/'
                                className={({isActive}) =>`${isActive? 'bg-orange-600 text-white' : 'bg-none text-orange-600'} p-2 rounded-2xl hover:-translate-y-2 hover:bg-orange-200 transition duration-300 ease-in-out` }
                            
                            >
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                to='/about'
                                className={({isActive}) =>`${isActive? 'bg-orange-600 text-white' : 'bg-none text-orange-600'} p-2 rounded-2xl  hover:bg-orange-200 transition duration-100 ease-in-out`}
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}