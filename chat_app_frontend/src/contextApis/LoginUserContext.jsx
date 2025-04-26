    import React, { useState, createContext, useEffect } from 'react'


    export const  LoginUserContext = createContext(null);

    export const LoginUserProvider = ({children})=>{
        const [LoginUser, setLoginUser] = useState(null);
        const userToken = localStorage.getItem('token');
        

        // Function to decode the token (e.g., if it's a JWT)
        const decodeToken = (token) => {
            try {
            // Decode the JWT token, you can use any decoding library or custom logic
            const decoded = JSON.parse(atob(token.split('.')[1])); // Decode base64 payload
            return decoded;
            } catch (error) {
            console.error('Error decoding token:', error);
            return null;
            }
        };

        // On component mount, if a token exists, decode it and set the user info
        useEffect(() => {
            if (userToken) {
            const decodedUser = decodeToken(userToken);
            if (decodedUser) {
                setLoginUser(decodedUser);
            }
            }
        }, [userToken]);
        
        return(
            <LoginUserContext.Provider value={{LoginUser, setLoginUser}} >
                {children}
            </LoginUserContext.Provider>
        )

    }