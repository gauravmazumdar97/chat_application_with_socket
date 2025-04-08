import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import SearchInput from '../ReusableComponents.jsx/Searchinput';
import Users from '../Users';

function Leftside() {
  return (
    <Box p={4}>
      <h2 className="m-2">Chats</h2>
      <SearchInput />
      <hr></hr>
      <Users></Users>
    </Box>
  );
}

export default Leftside;
