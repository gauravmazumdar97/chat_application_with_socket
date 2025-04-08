import React from 'react';
import { Avatar, AvatarBadge, Flex, Text, Box } from '@chakra-ui/react';
import User from '../User/User';

function Users() {
  return (
    <div className='flex_scroll overflow-y-auto' style={{maxHeight:"92vh"}}>
      <User></User>
    </div>
  );
}

export default Users;
