import React from 'react';
import { Box } from '@chakra-ui/react';
import Users from './Users/Users';
import { SearchInput } from '../../ReusableComponents/SearchInput/Searchinput';
import './Leftside.css'

function Leftside() {
  return (
    <Box height="95vh" display="flex" flexDirection="column" >
      <div style={{ backgroundColor: '#2CD46B', padding: '10px', borderRadius: '8px' }}>
          <h2>Chats</h2>
          <Box mt={5} mb={4} width="100%">
            <SearchInput />
          </Box>
      </div>


      {/* Scrollable user list */}
      <Box flex="1" overflowY="auto" className='left_side_styles_child'> 
      {/* <hr style={{ borderColor: 'gray' }} /> */}
        <Users /> 
      </Box>
    </Box>
  );
}

export default Leftside;
