import React, { useContext } from 'react';
import { Avatar, AvatarBadge } from '@chakra-ui/react';
import SelectChatContext from '../../../../contextApis/SelectedChatContext';
import { useSocket } from '../../../../contextApis/SocketContext';


function Chatuser() {
  const { socket, onlineUsers } = useSocket();
  const {selectedChat, setSelectedChat} = useContext(SelectChatContext);
  const isUserOnline = onlineUsers?.includes(selectedChat?._id);
  
  return (
    <div  style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '0.5rem', background :'#cbd9c9', 
      borderRadius: '0.375rem', cursor: 'pointer'}} className="user-container" >
      <Avatar src='https://bit.ly/dan-abramov' bg={isUserOnline ? 'green.500' : 'gray.400'} >
        <AvatarBadge boxSize='1.25em' bg={isUserOnline ? 'green.500' : 'gray.400'}  />
      </Avatar>

      <div style={{ lineHeight: '1.5' }}>
        <div style={{ fontWeight: '500' }}>{selectedChat?.username}</div>
        <div style={{ fontSize: '0.875rem', color: isUserOnline ? '#38A169' : '#A0AEC0' }}>
          {isUserOnline ? 'Online' : 'Offline'}
        </div>

      </div>
    </div>
  );
}

export default Chatuser;