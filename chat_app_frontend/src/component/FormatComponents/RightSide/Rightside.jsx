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
    
        console.log("==================================================");
        console.log("SelectChatContextSelectChatContextSelectChatContext",SelectChatContext);
        console.log("==================================================");

    // Callback after sending message
    const handleMessageSent = () => {
      setRefresh(!refresh); // Toggle to trigger refresh
    };

    
    if (selectedChat) {

      return (
              <Flex direction="column" height="100vh" position="relative"
          backgroundImage="url('https://www.shutterstock.com/shutterstock/photos/1660950727/display_1500/stock-vector-social-media-sketch-vector-seamless-doodle-pattern-1660950727.jpg')"
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
