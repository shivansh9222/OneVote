import UserContext from "./UserContext";
import { useContext , useState } from "react";

const UserContextProvider = ({children}) => {
    const [user , setUser] = useState({})
    const [isLoggedIn , setIsLoggedIn] = useState(false)

    return(
        <UserContext.Provider value={{user , setUser , isLoggedIn , setIsLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;