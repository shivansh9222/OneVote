import { createContext, useContext } from "react";

export const UserContext = createContext(
    {
        isAuthenticated: 'false',
        setIsAuthenticated: () => {}
    }
)

export const UserContextProvider = UserContext.Provider;

export function useUser(){
    return useContext(UserContext);
}