import React from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { IoSend } from 'react-icons/io5';

export function SearchInput() {
  return (
    <InputGroup>
      <Input type="text" placeholder="Search chat" />
      <InputRightElement pointerEvents="none">
        <SearchIcon color="gray.400" />
      </InputRightElement>
    </InputGroup>
  );
}

export function ChatInput() {
  return (
    <InputGroup w="80%" bg="rgba(50, 46, 46, 0.9)" borderRadius="md" p={2} boxShadow="md" >
      <Input type="text" placeholder="Type something" bg="rgba(50, 46, 46, 0.9)" />
        <InputRightElement pointerEvents="none">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" color="gray.400" height="1em" width="1em" 
           xmlns="http://www.w3.org/2000/svg" font-size="1.5rem" style={{ marginTop: '0.9rem', marginRight:'1rem' }}>
          <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z"></path></svg>
        </InputRightElement>
    </InputGroup>
  );
}


