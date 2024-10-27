import UserContext from "./UserContext";
import { useContext , useEffect, useState } from "react";

const UserContextProvider = ({children}) => {
    const [user , setUser] = useState( ()=> {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : {}
    })
    const [isLoggedIn , setIsLoggedIn] = useState( () => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn')
        return storedLoggedIn === 'true'
    })

    useEffect( ()=> {
        localStorage.setItem('user' , JSON.stringify(user))
        localStorage.setItem('isLoggedIn' , isLoggedIn)
    } , [user , isLoggedIn])

    return(
        <UserContext.Provider value={{user , setUser , isLoggedIn , setIsLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;