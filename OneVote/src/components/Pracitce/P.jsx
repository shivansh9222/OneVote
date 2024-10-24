import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function P() {
    const{user , setUser} = useContext(UserContext)
    const handleClick = () => {
        setUser({name: 'John', age: 30})
    }
    return(
        <>
            <button onClick={handleClick}>submit</button>
        </>
    )
}