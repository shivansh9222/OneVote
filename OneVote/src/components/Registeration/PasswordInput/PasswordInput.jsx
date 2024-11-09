import React,{useState} from "react";


export default function PasswordInput({value , onChange,label , placeholder}){

    const [showPassword , setShowPassword] = useState(false);
    const [isFocused , setIsFocused] = useState(false);

    const handleImageClick = () => {
        setShowPassword(!showPassword);
    }
    return (
        <>
            <div 
                className="w-full h-14 border-box px-0.5 flex relative rounded-lg mt-4"
            >
                <label 
                    htmlFor="password"
                    className={`absolute left-4
                            ${isFocused || showPassword ? 'top-0   -translate-y-1/2 bg-white text-sm text-orange-500 z-10' : 'top-1/2 -translate-y-1/2 text-base text-gray-500 -z-10'} p-1 px-2 rounded-xl transition-all ease-in-out duration-150`
                        }
                > 
                    {label}
                </label>
                
                <input 
                    type={showPassword ? 'text' : 'password'}
                    value={value}

                    placeholder="password here"
                    onFocus={ (e) => {
                        setIsFocused(true)
                        e.target.placeholder=''
                    }
                    }
                    onBlur={(e) => {
                            setIsFocused(false)
                            e.target.placeholder = `${placeholder} here`
                        }
                    }
                    onChange={onChange}

                    name="pass" 
                    className="w-full h-full bg-orange-50 ubuntu-medium-italic outline-none border-b-4 border-b-orange-500  transition-all ease-in-out duration-150 rounded-md focus-within:border-2 focus-within:border-orange-400 focus-within:rounded-lg pl-2 pt-1 pr-9 focus-within:placeholder:none placeholder:text-sm focus-within:bg-white text-base"
                    required
                /> 
                <div 
                    className={`
                        h-6 w-6 absolute top-1/2 right-2 -translate-y-1/2 bg-transparent z-10 transition-all ease-in-out duration-150 cursor-pointer
                    `}
                >
                    <img 
                        src={showPassword ? 'https://cdn-icons-png.flaticon.com/512/709/709612.png' : 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png'}
                        alt="eye" 
                        onClick={handleImageClick}
                        className="h-full w-full object-contain object-center"
                    />
                </div>
            </div>
        </>
    );
}