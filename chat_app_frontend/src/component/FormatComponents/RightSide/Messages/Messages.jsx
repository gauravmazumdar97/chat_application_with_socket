import React, { useEffect, useState, useContext, useRef } from 'react';
import { Box, Flex, Text, VStack, Avatar } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Interceptor from "../../../../../Interceptor/Inteceptor";
import { environment } from '../../../../../environment';
import { ChatContext } from '../../../../contextApis/ChatContext';
import { SelectChatContext } from '../../../../contextApis/SelectedChatContext';
import { useSocket } from '../../../../contextApis/SocketContext';

function Messages() { 
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshMessages } = useContext(ChatContext); 
  const { selectedChat } = useContext(SelectChatContext);
  const lastMessageRef = useRef(null);
  const { socket } = useSocket();

  const fetchMessages = async () => {
    if (!selectedChat?._id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const payload = {
        "isGroup": false,
        "userId": selectedChat._id
      };

      const response = await Interceptor.post(
        `${environment.serverUrl}${environment.userApi}/chatsWithUser`, payload
      );

      if (response?.data) {
        const formattedMessages = response.data.map(chat => ({
          id: chat._id,
          text: chat.message,
          from: chat.sender._id === selectedChat._id ? 'me' : 'other',
          date: chat.createdAt || new Date().toISOString()
        }));

        setMessages(formattedMessages);
        console.log('Messages loaded:', formattedMessages);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [refreshMessages, selectedChat?._id]);

  useEffect(() => {
    if (!socket || !selectedChat?._id) return;

    const handleNewMessage = (message) => {
      const formattedMessage = {
        id: message._id,
        text: message.message,
        from: message.sender === selectedChat._id ? 'other' : 'me',
        date: message.createdAt
      };
      
      setMessages(prev => [...prev, formattedMessage]);
      console.log('Added new message:', formattedMessage);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, selectedChat?._id]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading) {
    return (
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading messages...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  if (messages.length === 0) {
    return (
      <Box flex="1" overflowY="auto" px={4} py={2}>
        <Text textAlign="center" color="gray.500">
          <span style={{backgroundColor: '#ebebeb', color: 'black'}}>
            No messages yet. Start the conversation!
          </span>
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
             align={msg.from === 'me' ? 'flex-end' : 'flex-start'} >

              <Flex direction="row" align="center" justify={msg.from === 'me' ? 'flex-end' : 'flex-start'}>
                {msg.from === 'other' && (
                  <Avatar size="sm" name="Other" src="https://bit.ly/broken-link" mr={2} />
                )}

                <Box 
                  borderRadius="lg"
                  wordBreak="break-word"
                  maxW="70%" px={4} py={2} 
                  bg={msg.from === 'me' ? 'blue.500' : 'gray.200'}
                  color={msg.from === 'me' ? 'white' : 'black'}
                  borderBottomRightRadius={msg.from === 'me' ? '0' : 'lg'}
                  borderBottomLeftRadius={msg.from === 'me' ? 'lg' : '0'} >
                  <Text as="span" whiteSpace="pre-wrap"> {msg.text} </Text>
                </Box>

                {msg.from === 'me' && (
                  <Avatar size="sm" name="Me" src="https://bit.ly/broken-link" ml={2} />
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