import React from 'react';
import { Avatar, AvatarBadge, Flex, Text, Box } from '@chakra-ui/react';
import User from '../User/User';

function Users() {
  return (
    <Box className='flex_scroll overflow-y-auto' height="100%">
        <User />
    </Box>
  );
}

export default Users;
