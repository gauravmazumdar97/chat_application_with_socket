import React, {useContext, useState} from 'react';
import Chatuser from './Chatuser/Chatuser';
import Messages from './Messages/Messages';
import { Box, Flex } from '@chakra-ui/react';
import { ChatInput } from '../../ReusableComponents/SearchInput/Searchinput';
import { LoginUserContext } from "../../../contextApis/LoginUserContext";
import Web_background from '../../../assets/whatsapp_web_background.png';
import {SelectChatContext} from '../../../contextApis/SelectedChatContext';



function Rightside() {

  const [refresh, setRefresh] = useState(false);
    const {selectedChat} = useContext(SelectChatContext);
    
    const handleMessageSent = () => {
      setRefresh(!refresh); // Toggle to trigger refresh
    };

    
    if (selectedChat) {

      return (
              <Flex direction="column" height="100vh" position="relative"
          backgroundImage="url('https://images.unsplash.com/photo-1526554850534-7c78330d5f90?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
          backgroundSize="130%" backgroundPosition="center" backgroundRepeat="no-repeat">

        {/* Chat Header */}
        <Box><Chatuser/></Box>

        {/* Scrollable Messages (without visible scrollbar) */}
        <Box flex="1" overflowY="auto" px={4} py={2} sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }} >
          <Messages />
        </Box>

        {/* Fixed Chat Input */}
        <Box p={1.5} position="sticky" bottom="0" bg="aliceblue" zIndex="1">
          <ChatInput onMessageSent={handleMessageSent} ></ChatInput>
        </Box>
      </Flex>
      );
    } else{
      return (
        <Flex direction="column" height="100vh" position="relative"
      backgroundImage= {Web_background}
      backgroundSize="130%" backgroundPosition="center" backgroundRepeat="no-repeat" />
      )
    }


}

export default Rightside;
