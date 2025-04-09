import React from 'react';
import Chatuser from './Chatuser/Chatuser';
import Messages from './Messages/Messages';
import { Box, Flex } from '@chakra-ui/react';
import FollowCursor from '../../ReusableComponents/FollowCursor/FollowCursor'
import { ChatInput } from '../../ReusableComponents/SearchInput/Searchinput';


function Rightside() {
  return (

        <Flex
          direction="column"
          height="100vh"
          position="relative"
          backgroundImage="url('https://www.shutterstock.com/shutterstock/photos/1660950727/display_1500/stock-vector-social-media-sketch-vector-seamless-doodle-pattern-1660950727.jpg')"
          backgroundSize="130%" // <- Zoom out by showing more of the image
          backgroundPosition="center"
          backgroundRepeat="no-repeat">

        {/* Chat Header */}
        <Box>
          <Chatuser />
        </Box>

        {/* Scrollable Messages (without visible scrollbar) */}
        <Box flex="1" overflowY="auto" px={4} py={2} sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }} >
          <Messages />
        </Box>

        {/* Fixed Chat Input */}
        <Box p={1.5} position="sticky" bottom="0" bg="aliceblue" zIndex="1">
          <ChatInput></ChatInput>
        </Box>
      </Flex>

  );
}

export default Rightside;
