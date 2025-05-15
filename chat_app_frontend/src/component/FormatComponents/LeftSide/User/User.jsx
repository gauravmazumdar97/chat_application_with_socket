import Interceptor from "../../../../../Interceptor/Inteceptor";
import { environment } from "../../../../../environment";
import React, { useContext, useEffect, useState} from 'react';
import { Avatar, AvatarBadge, Flex, Text, Box } from '@chakra-ui/react';
import './User.css'; // Import the CSS
import SelectChatContext from "../../../../contextApis/SelectedChatContext";
import { LoginUserContext } from "../../../../contextApis/LoginUserContext";
import { toast } from 'react-toastify';
import { useSocket } from '../../../../contextApis/SocketContext';

function User({ searchTerm }) {
  
  const { socket, onlineUsers } = useSocket();
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { selectedChat, setSelectedChat } = useContext(SelectChatContext);
  const [ selectedUser, setSelectedUser ] = React.useState([])
  const { LoginUser, setLoginUser } = useContext(LoginUserContext);

 
  useEffect(() => {
    if (!LoginUser?.id || !socket) return;
  
    const fetchUsers = async () => {
      let payload = { '_id': LoginUser.id };
      try {
        const response = await Interceptor.post(`${environment.serverUrl}${environment.userApi}/getAllUser`, payload);
        setUsers(response.data);
      } catch (error) {
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  
  }, [LoginUser?.id, socket]);
  
useEffect(() => {
  console.log("Updated selectedChat:", selectedChat);
}, [selectedChat]);

useEffect(() => {
  console.log("Updated selectedUser:", selectedUser);
}, [selectedUser]);


    // Filter logic
    const filteredUsers = users.filter(user =>
      user.username?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

  return (
    <div className="scroll-container">
      {filteredUsers.map((user, index) => (
        <Flex key={index} align="center" gap={4} p={3} borderBottom="1px solid #e2e8f0"
          borderRadius="md" transition="background 0.2s ease" _hover={{ bg: '#5a9ef6', cursor: 'pointer' }}
          onClick={() => {
            setSelectedChat(user);
            setSelectedUser(user);
            // Emit joinChat event when user is selected
            socket.emit('joinChat', user._id);
            }} 
          role="group" >
          <Avatar src={user.avatarUrl || 'https://bit.ly/dan-abramov'}>
            <AvatarBadge boxSize="1.25em" bg={onlineUsers.includes(user._id) ? 'green.500' : 'gray.400'}/>
          </Avatar>
          <Box lineHeight="0.5">
            <Text fontWeight="medium" _groupHover={{ color: 'white' }}>
              {user.username}
            </Text>
            <Text fontSize="sm" _groupHover={{ color: 'white' }}>
              {user.email}
            </Text>
          </Box>
        </Flex>

      ))}
    </div>
  );
}

export default User;
