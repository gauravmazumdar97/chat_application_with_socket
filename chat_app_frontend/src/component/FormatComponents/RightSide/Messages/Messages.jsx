import React from 'react';
import { Box, Flex, Text, VStack, Avatar } from '@chakra-ui/react';
import dayjs from 'dayjs'; // for formatting date

const messages = [
  { id: 1, text: 'Hey there!', from: 'other', date: '2025-04-08T10:00:00' },
  { id: 2, text: 'Hi! How are you?', from: 'me', date: '2025-04-08T10:01:00' },
  { id: 3, text: "I'm good, thanks!", from: 'other', date: '2025-04-08T10:02:00' },
  { id: 4, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'me', date: '2025-04-08T10:03:00' },
  { id: 5, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'me', date: '2025-04-08T10:03:00' },
  { id: 6, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'other', date: '2025-04-08T10:03:00' },
  { id: 7, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'me', date: '2025-04-08T10:03:00' },
  { id: 8, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'other', date: '2025-04-08T10:03:00' },
  { id: 9, text: "That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.That's great to hear.", from: 'me', date: '2025-04-08T10:03:00' },
];


function Messages() {
  return (
    <Box flex="1" overflowY="auto" px={4} py={2}>
      <VStack spacing={4} align="stretch">
        {messages.map((msg) => (
          <Flex key={msg.id} direction="column" align={msg.from === 'me' ? 'flex-end' : 'flex-start'}>
            <Flex direction="row" align="center" justify={msg.from === 'me' ? 'flex-end' : 'flex-start'}>
              {msg.from === 'other' && (
                <Avatar
                  size="sm"
                  name="Other"
                  src="https://i.pravatar.cc/150?img=5"
                  mr={2}
                />
              )}

              <Box
                maxW="70%"
                bg={msg.from === 'me' ? 'blue.500' : 'gray.200'}
                color={msg.from === 'me' ? 'white' : 'black'}
                px={4}
                py={2}
                borderRadius="lg"
                borderBottomRightRadius={msg.from === 'me' ? '0' : 'lg'}
                borderBottomLeftRadius={msg.from === 'me' ? 'lg' : '0'}
              >
                <Text>{msg.text}</Text>
              </Box>

              {msg.from === 'me' && (
                <Avatar
                  size="sm"
                  name="Me"
                  src="https://i.pravatar.cc/150?img=3"
                  ml={2}
                />
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
