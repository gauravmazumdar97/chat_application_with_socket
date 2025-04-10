import React from 'react';
import { Avatar, AvatarBadge, Flex, Text, Box } from '@chakra-ui/react';
import './User.css'; // Import the CSS

function User() {
  return (
    <div className="scroll-container">
      {[...Array(15)].map((_, index) => (
        <Flex key={index} align="center" gap={4} p={3} borderBottom="1px solid #e2e8f0" 
          _hover={{ bg: '#2d84f4', cursor: 'pointer' }}
          borderRadius="md" transition="background 0.2s ease">
          
          <Avatar src='https://bit.ly/dan-abramov'>
            <AvatarBadge boxSize='1.25em' bg='green.500' />
          </Avatar>

          <Box lineHeight="0.5">
            <Text fontWeight="medium">Ranveer Singh {index + 1}</Text>
            <Text fontSize="sm">ranveersingh{index + 1}@gmail.com</Text>
          </Box>
        </Flex>
      ))}
    </div>
  );
}

export default User;
