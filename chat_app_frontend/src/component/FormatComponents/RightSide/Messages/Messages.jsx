import React, { useEffect, useState, useContext, useRef } from 'react';
import { Box, Flex, Text, VStack, Avatar } from '@chakra-ui/react';
import dayjs from 'dayjs'; // for formatting date
import Interceptor from "../../../../../Interceptor/Inteceptor";
import { environment } from '../../../../../environment';
import { ChatContext } from '../../../../contextApis/ChatContext'; // adjust path
import { SelectChatContext } from '../../../../contextApis/SelectedChatContext';


function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshMessages } = useContext(ChatContext); 
  const { selectedChat } = useContext(SelectChatContext);
  const lastMessageRef = useRef(null); // 👈 ref for last message
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const payload = {
          "isGroup": false,
          "userId": selectedChat?._id
        };

        const response = await Interceptor.post(
          `${environment.serverUrl}${environment.userApi}/chatsWithUser`, payload
        );

        if (response?.data) {
          const formattedMessages = response?.data.map(chat => ({
            id: chat._id,
            text: chat.message || chat.text,
            from: chat.sender._id === payload.userId ? 'me' : 'other',
            date: chat.createdAt || new Date().toISOString()
          }));

          // Assuming you're using a React state setter here
          setMessages(formattedMessages);
        }

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

  },[refreshMessages, selectedChat?._id])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <Box flex="1" overflowY="auto" px={4} py={2}>
        <Text textAlign="center" color="gray.500">
            <span className='abcCSS' style={{backgroundColor:'#ebebeb',color:'black'}}>No messages yet. Start the conversation!</span>
        </Text>
      </Box>
    );
  }
  
  return (
    <Box flex="1" overflowY="auto" px={4} py={2}>
      <VStack spacing={4} align="stretch">
      {messages.map((msg, index) => {
          const isLast = index === messages.length - 1;
          return (
            <Flex key={msg.id} direction="column" ref={isLast ? lastMessageRef : null} 
              align={msg.from === 'me' ? 'flex-end' : 'flex-start'}>

              <Flex direction="row" align="center" justify={msg.from === 'me' ? 'flex-end' : 'flex-start'}>
                {msg.from === 'other' && (
                  <Avatar size="sm" name="Other" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMlUhFs1O9imo9tElgItonIg_Kzzpwey6gWaN3beMNnY4ZUfP124q_0K6yWJyjLvJidhU&usqp=CAU?img=5" mr={2} />
                )}

                <Box maxW="70%" px={4} py={2} borderRadius="lg"
                    bg={msg.from === 'me' ? 'blue.500' : 'gray.200'}
                    color={msg.from === 'me' ? 'white' : 'black'}
                    alignSelf={msg.from === 'me' ? 'flex-end' : 'flex-start'}
                    borderBottomRightRadius={msg.from === 'me' ? '0' : 'lg'}
                    borderBottomLeftRadius={msg.from === 'me' ? 'lg' : '0'}
                    wordBreak="break-word" overflowWrap="break-word" >
                      
                  <Text as="span" whiteSpace="pre-wrap" fontFamily="inherit">
                    {msg.text}
                  </Text>
                </Box>

                {msg.from === 'me' && (
                  <Avatar size="sm" name="Me" src="https://i.pinimg.com/736x/6e/d8/33/6ed8333012ff3da56ece1b959ccfa42f.jpg?img=3" ml={2} />
                )}
              </Flex>
              <Text fontSize="xs" color="gray.500" mt={1}>
                {dayjs(msg.date).format('hh:mm A')}
              </Text>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}


export default Messages;
