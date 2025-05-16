import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  Box, VStack, Flex, Avatar, Text, useDisclosure,
  AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogOverlay,
  AlertDialogHeader, AlertDialogFooter, Button
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import Interceptor from "../../../../../Interceptor/Inteceptor";
import { environment } from '../../../../../environment';
import { ChatContext } from '../../../../contextApis/ChatContext';
import { SelectChatContext } from '../../../../contextApis/SelectedChatContext';
import { useSocket } from '../../../../contextApis/SocketContext';
import Messenger from "../../../../assets/Facebook_Messenger.mp3";
import { LoginUserContext } from "../../../../contextApis/LoginUserContext";
import './Messages.css'


function Messages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshMessages } = useContext(ChatContext);
  const { selectedChat } = useContext(SelectChatContext);
  const { LoginUser } = useContext(LoginUserContext);
  const lastMessageRef = useRef(null);
  const { socket, onlineUsers } = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [selectedMessage, setSelectedMessage] = useState(null);

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
          from: chat.receiver._id === selectedChat._id ? 'me' : 'other',
          date: chat.createdAt || new Date().toISOString()
        }));

        setMessages(formattedMessages);
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

    const handleTyping = (typingData) => {
      const { chatId, isTyping, sender, reciever } = typingData;

      if (chatId == reciever && selectedChat?._id == sender) {
        setIsTyping(typingData?.isTyping)
      }
    };

    const handleMessageDelivered = (typingData) => {
      setIsTyping(false)
    };


    const handleNewMessage = (message) => {
      const formattedMessage = {
        id: message._id,
        text: message.message,
        from: message.sender == selectedChat._id ? 'other' : 'me',
        date: message.createdAt,
        messageDelivered: message?.messageDelivered,
        messageSeen: message?.messageSeen
      };

      setMessages(prev => [...prev, formattedMessage]);

      const messageAudio = new Audio('/Facebook_Messenger.mp3');
      messageAudio.volume = 0.2;
      messageAudio.play().catch((err) => {
        console.warn("Autoplay blocked or failed to play sound:", err);
      });

    };

    socket.on('newMessage', handleNewMessage);
    socket.on('typing', handleTyping);
    socket.on('messageDelivered', handleMessageDelivered);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('typing', handleTyping);
      socket.off('messageDelivered', handleMessageDelivered);
    };
  }, [socket, selectedChat?._id]);


  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);


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
          <span style={{ backgroundColor: '#ebebeb', color: 'black' }}>
            No messages yet. Start the conversation!
          </span>
        </Text>
      </Box>
    );
  }
return (
    <>
      <Box flex="1" overflowY="auto" px={4} py={2}>
        <VStack spacing={4} align="stretch">
          {messages.map((msg, index) => {
            const isLast = index === messages.length - 1;
            return (
              <Flex
                key={msg.id}
                direction="column"
                ref={isLast ? lastMessageRef : null}
                align={msg.from === 'me' ? 'flex-end' : 'flex-start'}
                mb={4}
              >
                <Flex
                  direction="row"
                  align="center"
                  justify={msg.from === 'me' ? 'flex-end' : 'flex-start'}
                  width="100%"
                >
                  {msg.from === 'other' && (
                    <Avatar
                      size="sm"
                      name="Other"
                      src="https://bit.ly/broken-link"
                      mr={2}
                    />
                  )}

                  <Box
                    className={`message-box ${msg.from === 'me' ? 'me' : 'other'}`}
                    onClick={() => {
                       setSelectedMessage(msg);
                       onOpen();
                    }}
                    cursor="pointer"
                    px={4}
                    py={2}
                    borderRadius="md"
                    bg={msg.from === 'me' ? 'blue.100' : 'gray.100'}
                    maxW="70%"
                  >
                    <Text as="span" whiteSpace="pre-wrap">
                      {msg.text}
                    </Text>
                  </Box>

                  {msg.from === 'me' && (
                    <Avatar
                      size="sm"
                      name="Me"
                      src="https://bit.ly/broken-link"
                      ml={2}
                    />
                  )}
                </Flex>

                <Text fontSize="xs" color="gray.500" mt={1}>
                  {dayjs(msg.date).format('hh:mm A')}
                </Text>
              </Flex>
            );
          })}

          {isTyping && (
            <Flex align="center" justify="flex-start" pl={2}>
              <Avatar
                size="sm"
                name="Other"
                src="https://bit.ly/broken-link"
                mr={2}
              />
              <Box borderRadius="lg" px={4} py={2} bg="gray.200" maxW="70%" color="black"
                fontStyle="italic" >
                <Text color="black">Typing...</Text>
              </Box>
            </Flex>
          )}
        </VStack>
      </Box>

      {/* Dialog for message status */}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Message Info
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text><strong>Message:</strong> {selectedMessage?.text}</Text>
              <Text mt={2}><strong>Delivered:</strong> {selectedMessage?.messageDelivered}</Text>
              <Text><strong>Seen:</strong> {selectedMessage?.messageSeen}</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
  // return (
  //   <Box flex="1" overflowY="auto" px={4} py={2}>
  //     <VStack spacing={4} align="stretch">
  //     {messages.map((msg, index) => {
  //       const isLast = index === messages.length - 1;
  //       return (
  //         <Flex key={msg.id} direction="column" ref={isLast ? lastMessageRef : null}
  //           align={msg.from === 'me' ? 'flex-end' : 'flex-start'} mb={4} >
  //           <Flex 
  //             direction="row" align="center" justify={msg.from === 'me' ? 'flex-end' : 'flex-start'}
  //             width="100%" > {msg.from === 'other' && (
  //               <Avatar size="sm" name="Other" src="https://bit.ly/broken-link" mr={2} />
  //             )}

  //             <Box className={`message-box ${msg.from === 'me' ? 'me' : 'other'}`} >
  //               <Text as="span" whiteSpace="pre-wrap">{msg.text}</Text>
  //             </Box>

  //             {msg.from === 'me' && (
  //               <Avatar size="sm" name="Me" src="https://bit.ly/broken-link" ml={2} />
  //             )}
  //           </Flex>

  //           <Text fontSize="xs" color="gray.500" mt={1}>
  //             {dayjs(msg.date).format('hh:mm A')}
  //           </Text>
  //         </Flex>
  //       );
  //     })}

  //       {/* ✅ Typing indicator goes here, outside the message loop */}
  //       {isTyping && (
  //         <Flex  align="center" justify="flex-start" pl={2}>
  //           <Avatar size="sm" name="Other" src="https://bit.ly/broken-link" mr={2} />
  //           <Box borderRadius="lg" px={4} py={2} bg="gray.200" maxW="70%" color="black" fontStyle="italic">
  //             <Text color="black">Typing...</Text>
  //           </Box>
  //         </Flex>
  //       )}
  //     </VStack>
  //   </Box>
  // );
}

export default Messages;