import React from 'react';
import { Box } from '@chakra-ui/react';
import Users from './Users/Users';
import { SearchInput } from '../../ReusableComponents/SearchInput/Searchinput';
import './Leftside.css'
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';


function Leftside() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      localStorage.removeItem('token');
      navigate('/logout');
    }
  };
  

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
      {/* Optional Footer / Icon Area */}
      <Box textAlign="center">
        <span className='logout_css'>
          <Tooltip title="Logout" arrow>
             <LogoutIcon  style={{ color: 'black', fontSize: '30px' }}  onClick={handleLogout}/>
          </Tooltip>
        </span>
      </Box>
    </Box>
  );
}

export default Leftside;
