import React,{useState} from "react";


export default function PasswordInput(){
    const [showPassword , setShowPassword] = useState(false);
    
    const handleImageClick = () => {
        setShowPassword(!showPassword);
    }
    return (
        <>
            <div className="flex w-full gap-y-[-3px] items-center justify-end relative">
                <input 
                    type={showPassword ? 'text' : 'password'}
                    name="pass" 
                    className="w-full p-1 text-start focus-within:text-white rounded-lg md:rounded-full outline-none border-none bg-gray-200 md:bg-gray-100 focus-within:bg-orange-400 ubuntu-light-italic md:p-2  md:text-center"
                /> 
                <div 
                    className="text-black absolute right-1 md:p-2"
                >
                    <img 
                        src={showPassword ? 'https://cdn-icons-png.flaticon.com/512/709/709612.png' : 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png'}
                        alt="eye" 
                        onClick={handleImageClick}
                        className="w-6 h-6 cursor-pointer bg-transparent"
                    />
                </div>
            </div>
        </>
    );
}