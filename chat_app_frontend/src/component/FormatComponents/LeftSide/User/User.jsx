import  Interceptor  from "../../../../../Interceptor/Inteceptor";
import {environment} from "../../../../../environment";
import React, {useContext, useEffect,  } from 'react';
import { Avatar, AvatarBadge, Flex, Text, Box } from '@chakra-ui/react';
import './User.css'; // Import the CSS
import SelectChatContext from "../../../../contextApis/SelectedChatContext";
import { LoginUserContext } from "../../../../contextApis/LoginUserContext";



function User() {

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { selectedChat, setSelectedChat } = useContext(SelectChatContext);
  const { LoginUser } = useContext(LoginUserContext);

  
  useEffect(() => {
    const fetchUsers = async () => {
      // const user = localStorage.getItem('token');
      console.log("LoginUserLoginUserLoginUserLoginUserLoginUser",LoginUser);
      

      const payload = { '_id': LoginUser?.id }

      try {
        const response = await Interceptor.post(`${environment.serverUrl}${environment.userApi}/getAllUser`, payload);

        console.log("===============================>>>",response.data);
        setUsers(response.data);

      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="scroll-container">
      {users.map((user, index) => (
        <Flex key={index} align="center" gap={4} p={3} borderBottom="1px solid #e2e8f0" 
          _hover={{ bg: '#2d84f4', cursor: 'pointer' }}  onClick={() => setSelectedChat(user)} 
          borderRadius="md" transition="background 0.2s ease">
          
          <Avatar src={user.avatarUrl || 'https://bit.ly/dan-abramov'}>
            <AvatarBadge boxSize='1.25em' bg='green.500' />
          </Avatar>

          <Box lineHeight="0.5">
            <Text fontWeight="medium">{user.username}</Text>
            <Text fontSize="sm">{user.email}</Text>
          </Box>
        </Flex>
      ))}
    </div>
  );
}

export default User;
