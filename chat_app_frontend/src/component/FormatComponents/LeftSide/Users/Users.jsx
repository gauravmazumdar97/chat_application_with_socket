import React from 'react';
import { Avatar, AvatarBadge, Flex, Text, Box } from '@chakra-ui/react';
import User from '../User/User';

function Users({ searchTerm }) {
  return (
    <Box className='flex_scroll overflow-y-auto' height="100%">
        <User searchTerm={searchTerm}/>
    </Box>
  );
}

export default Users;
