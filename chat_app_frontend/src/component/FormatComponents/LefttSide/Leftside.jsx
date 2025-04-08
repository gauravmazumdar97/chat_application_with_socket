import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import SearchInput from '../../ReusableComponents.jsx/Searchinput';
import Users from './Users/Users';

function Leftside() {
  return (
    <Box p={2}>
      <h2 className="">Chats</h2>
      <Box mt={5} mb={4}>  {/* Chakra's margin-bottom equivalent to 12px */}
        <SearchInput />
      </Box>
      <hr></hr>
      <Users></Users>
    </Box>
  );
}

export default Leftside;