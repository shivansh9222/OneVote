import { createContext, useContext } from "react";

export const ComponentToggleContext = createContext(
    {
        component: 'login',
        toggleToLogin: () => {},
        toggleToSignup: () => {}
    }
);

export const ComponentToggleProvider = ComponentToggleContext.Provider;

export function useToggle(){
    return useContext(ComponentToggleContext);
}