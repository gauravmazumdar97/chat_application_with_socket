import React from 'react';
import { Box } from '@chakra-ui/react';
import { SearchInput } from '../../ReusableComponents.jsx/Searchinput';
import Users from './Users/Users';

function Leftside() {
  return (
    <Box height="100vh" display="flex" flexDirection="column" p={2} bgColor="black" color="white" >
      <h2>Chats</h2>

      <Box mt={5} mb={4}> <SearchInput /> </Box>

      <hr style={{ borderColor: 'gray' }} />

      {/* Scrollable user list */}
      <Box flex="1" overflowY="auto"> <Users /> </Box>
    </Box>
  );
}

export default Leftside;
