import React from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';


function SearchInput() {
  return (
    <InputGroup>
      <Input type="text" placeholder="Search chat" />
      <InputRightElement pointerEvents="none">
        <SearchIcon color="gray.400" />
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchInput;
