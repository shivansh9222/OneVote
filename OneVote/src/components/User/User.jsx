import React from "react";
import { useParams } from "react-router-dom";

import {Login , SignUp} from '../index'
import PasswordInput from "../Registeration/PasswordInput/PasswordInput";
import Registeration from "../Registeration/Registeration";

function User(){
    const {userId} = useParams();
    return(
        <>
            
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
                <Registeration />
            </div>
        </>
    )
}

export default User;