import React, { useState, createContext } from 'react'


export const  LoginUserContext = createContext(null);

export const LoginUserProvider = ({children})=>{
    
    const [LoginUser, setLoginUser] = useState(null);
    
    return(
        <LoginUserContext.Provider value={{LoginUser, setLoginUser}} >
            {children}
        </LoginUserContext.Provider>
    )

}