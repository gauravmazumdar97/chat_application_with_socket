    import React, { useState, createContext, useEffect } from 'react';

    // Create context
    export const SelectChatContext = createContext(null);



    // Provider
    export const SelectChatProvider = ({ children }) => {
        const [selectedChat, setSelectedChat] = useState(null);
        

        return (
            <SelectChatContext.Provider value={{ selectedChat, setSelectedChat }}>
                {children}
            </SelectChatContext.Provider>
        );
    };


    export default SelectChatContext;