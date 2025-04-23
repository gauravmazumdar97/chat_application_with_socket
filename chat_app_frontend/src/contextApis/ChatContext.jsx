import React, {useState, createContext} from 'react'


export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
    
    const [refreshMessages, setRefreshMessages] = useState(false);

    const triggerRefresh = () => {
      setRefreshMessages(prev => !prev); 
    };

  return (
    <ChatContext.Provider value={{refreshMessages, triggerRefresh}} >
        {children}
    </ChatContext.Provider>
    
  )
}

export default ChatContext