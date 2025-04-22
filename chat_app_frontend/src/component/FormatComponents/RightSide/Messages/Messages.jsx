import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, VStack, Avatar } from '@chakra-ui/react';
import dayjs from 'dayjs'; // for formatting date
import Interceptor from "../../../../../Interceptor/Inteceptor";
import { environment } from '../../../../../environment';

// const messages = [
//   { id: 1, text: 'Hey there!', from: 'other', date: '2025-04-08T10:00:00' },
//   { id: 2, text: 'Hi! How are you?', from: 'me', date: '2025-04-08T10:01:00' },
//   { id: 3, text: "I'm good, thanks!", from: 'other', date: '2025-04-08T10:02:00' },
//   { id: 4, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'me', date: '2025-04-08T10:03:00' },
//   { id: 5, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'me', date: '2025-04-08T10:03:00' },
//   { id: 6, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'other', date: '2025-04-08T10:03:00' },
//   { id: 7, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'me', date: '2025-04-08T10:03:00' },
//   { id: 8, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'other', date: '2025-04-08T10:03:00' },
//   { id: 9, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'me', date: '2025-04-08T10:03:00' },
// ];

function Messages() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  }, [])

  return (
    <Box flex="1" overflowY="auto" px={4} py={2}>
      <VStack spacing={4} align="stretch">
        {messages.map((msg) => (
          <Flex key={msg.id} direction="column" align={msg.from === 'me' ? 'flex-end' : 'flex-start'}>
            <Flex direction="row" align="center" justify={msg.from === 'me' ? 'flex-end' : 'flex-start'}>
              {msg.from === 'other' && (
                <Avatar size="sm" name="Other" src="https://i.pravatar.cc/150?img=5" mr={2} />
              )}

              <Box maxW="70%" px={4} py={2} borderRadius="lg"
                bg={msg.from === 'me' ? 'blue.500' : 'gray.200'} color={msg.from === 'me' ? 'white' : 'black'}
                borderBottomRightRadius={msg.from === 'me' ? '0' : 'lg'}
                borderBottomLeftRadius={msg.from === 'me' ? 'lg' : '0'} >
                <Text>{msg.text}</Text>
              </Box>

              {msg.from === 'me' && (
                <Avatar size="sm" name="Me" src="https://i.pravatar.cc/150?img=3" ml={2} />
              )}
            </Flex>
            <Text fontSize="xs" color="gray.500" mt={1}>
              {dayjs(msg.date).format('hh:mm A')}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}


export default Messages;
