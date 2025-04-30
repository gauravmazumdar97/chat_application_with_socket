import React, { useContext } from 'react';
import { Avatar, AvatarBadge } from '@chakra-ui/react';
import SelectChatContext from '../../../../contextApis/SelectedChatContext';

function Chatuser() {
  const {selectedChat} = useContext(SelectChatContext);

  return (
    <div  style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '0.5rem', background :'#cbd9c9', 
      borderRadius: '0.375rem', cursor: 'pointer'}} className="user-container" >
      <Avatar src='https://bit.ly/dan-abramov'>
        <AvatarBadge boxSize='1.25em' bg='green.500' />
      </Avatar>

      <div style={{ lineHeight: '1.5' }}>
        <div style={{ fontWeight: '500' }}>{selectedChat?.username}</div>
        <div style={{ fontSize: '0.875rem', color: '#38A169' }}>Online</div>
      </div>
    </div>
  );
}

export default Chatuser;