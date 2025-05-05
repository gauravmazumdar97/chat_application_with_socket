import './Leftside.css'
import Users from './Users/Users';
import { toast } from 'react-toastify';
import { Box } from '@chakra-ui/react';
import { environment } from "../../../../environment";
import Interceptor from "../../../../Interceptor/Inteceptor";
import React, {useContext, useEffect, useState} from 'react';
import { SearchInput } from '../../ReusableComponents/SearchInput/Searchinput';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { LoginUserContext } from '../../../contextApis/LoginUserContext';


function Leftside() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState()
  const [searchTerm, setSearchTerm] = useState('');
  const { LoginUser } = useContext(LoginUserContext);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{

    setUserData(LoginUser?.userdata?.username)
  },LoginUser)
  

  const handleLogout = async() => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      localStorage.removeItem('token');

        // const user = localStorage.getItem('token');
        let payload = { '_id': LoginUser?.id }
  
        try {
          const response = await Interceptor.post(`${environment.serverUrl}${environment.authApi}/logout`, payload);
          
          toast.success('User logout successfully');
        } catch (error) {
          console.error('Error logout user:', error);
          toast.error('Error logout user');
        } finally {
          setLoading(false);
          navigate('/logout');
        }
  

    }
  };
  
  
  return (
    <Box height="95vh" display="flex" flexDirection="column" >
      <div style={{ backgroundColor: '#2CD46B', padding: '10px', borderRadius: '8px' }}>
      <h4 style={{ 
          margin: 0, 
          fontSize: '0.9rem', 
          textAlign: 'center',
          animation: 'blinker 2s linear infinite' }}>
          Welcome {userData}.⭐
      </h4>
          <span><h2>Chats</h2></span>
          <Box mt={5} mb={4} width="100%">
            <SearchInput  setSearchTerm={setSearchTerm}/>
          </Box>
      </div>


      {/* Scrollable user list */}
      <Box flex="1" overflowY="auto" className='left_side_styles_child'> 
      {/* <hr style={{ borderColor: 'gray' }} /> */}
        <Users searchTerm={searchTerm} /> 
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
