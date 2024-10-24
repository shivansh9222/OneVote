import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function L() {
    const{user} =useContext(UserContext)

    if(!user) return <div>Login please</div>
    return <div>welcome , {user.name}</div>

}