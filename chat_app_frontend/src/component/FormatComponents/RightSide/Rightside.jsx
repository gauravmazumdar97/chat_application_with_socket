import React from 'react';
import Chatuser from './Chatuser/Chatuser';
import Messages from './Messages/Messages';
import { ChatInput } from '../../ReusableComponents.jsx/Searchinput';
import { Box, Flex } from '@chakra-ui/react';
import { red } from '@mui/material/colors';

function Rightside() {
  return (
    <Flex
      direction="column"
      height="100vh"
      position="relative"
      backgroundImage="url('https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1950&q=80')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      {/* Chat Header */}
      <Box>
        <Chatuser />
      </Box>

      {/* Scrollable Messages (without visible scrollbar) */}
      <Box flex="1" overflowY="auto" px={4} py={2} sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }} >
        <Messages />
      </Box>

      {/* Fixed Chat Input */}
      <Box p={1.5} position="sticky" bottom="0" bg="rgba(50, 46, 46, 0.9)" zIndex="1">
         <ChatInput />
      </Box>
    </Flex>
  );
}

export default Rightside;
