import React from "react";
import { useParams } from "react-router-dom";

function User(){
    const {userId} = useParams();
    return(
        <>
            <div className="w-full h-1/2 text-center bg-gray-500 text-2xl">User: {userId}</div>
            {/* <Login /> */}
            {/* <SignUp /> */}
            {/* <Registeration /> */}
        </>
    )
}

export default User;