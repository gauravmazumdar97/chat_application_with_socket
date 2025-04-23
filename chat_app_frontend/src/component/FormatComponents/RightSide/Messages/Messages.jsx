import React, { useEffect, useState, useContext, useRef } from 'react';
import { Box, Flex, Text, VStack, Avatar } from '@chakra-ui/react';
import dayjs from 'dayjs'; // for formatting date
import Interceptor from "../../../../../Interceptor/Inteceptor";
import { environment } from '../../../../../environment';
import { ChatContext } from '../../../../contextApis/ChatContext'; // adjust path


function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshMessages } = useContext(ChatContext); // 👈 get refresh flag
  const lastMessageRef = useRef(null); // 👈 ref for last message

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const payload = {
          "isGroup": false,
          "userId": "67fa015e5cc406719ad41e73"
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

  },[refreshMessages])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
                  <Avatar size="sm" name="Other" src="https://i.pravatar.cc/150?img=5" mr={2} />
                )}

                <Box
                  maxW="70%"
                  px={4}
                  py={2}
                  borderRadius="lg"
                  bg={msg.from === 'me' ? 'blue.500' : 'gray.200'}
                  color={msg.from === 'me' ? 'white' : 'black'}
                  alignSelf={msg.from === 'me' ? 'flex-end' : 'flex-start'}
                  borderBottomRightRadius={msg.from === 'me' ? '0' : 'lg'}
                  borderBottomLeftRadius={msg.from === 'me' ? 'lg' : '0'}
                  wordBreak="break-word"
                  overflowWrap="break-word"
                >
                  <Text as="span" whiteSpace="pre-wrap" fontFamily="inherit">
                    {msg.text}
                  </Text>
                </Box>

                {msg.from === 'me' && (
                  <Avatar size="sm" name="Me" src="https://i.pravatar.cc/150?img=3" ml={2} />
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
