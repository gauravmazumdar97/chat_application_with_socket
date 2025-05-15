import React, { useRef, useEffect, useState, useContext } from 'react';
import { Textarea, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { SearchIcon } from '@chakra-ui/icons';
import { IoSend } from 'react-icons/io5';
import './SearchInput.css'
import { motion } from 'framer-motion';
import Interceptor from '../../../../Interceptor/Inteceptor';
import { environment } from '../../../../environment'
import {ChatContext} from '../../../contextApis/ChatContext'
import SelectChatContext from '../../../contextApis/SelectedChatContext';
import { LoginUserContext } from '../../../contextApis/LoginUserContext';
import { useSocket } from '../../../contextApis/SocketContext';


export function SearchInput({ setSearchTerm }) {    
  return (
    <InputGroup>
      <Input type="text" placeholder="Search chat" bg="white" onChange={(e) => setSearchTerm(e.target.value)}/>
      <InputRightElement pointerEvents="none">
        <SearchIcon color="gray.400" />
      </InputRightElement>
    </InputGroup>
  );
}

export function ChatInput({ onMessageSent }) {

  const {selectedChat} = useContext(SelectChatContext);
  const {LoginUser} = useContext(LoginUserContext);
  const { triggerRefresh } = useContext(ChatContext); 
  const shineRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const tlRef = useRef(null);
  const { socket } = useSocket();


  useEffect(() => {
    if (shineRef.current) {

      tlRef.current = gsap.timeline({ repeat: -1, paused: true });
      tlRef.current.to(shineRef.current, {
        x: '150%',
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 1,
      });

    }
  }, []);

  useEffect(() => {

    if (tlRef.current) {
      if (hovering) {
        tlRef.current.pause();
      } else {
        tlRef.current.play();
      }
    }
  }, [hovering]);

  const handleSendClick = async () => {
    if (inputValue.trim() === '') return;
    setInputValue('');

    const payload = {
      "receiver": LoginUser?.id,
      "sender": selectedChat._id,
      "message": inputValue
    }

    try {
      const response = await Interceptor.post(`${environment.serverUrl}${environment.userApi}/sendMessageToUser`, payload);

      if (response.data && socket) {
        // Emit the message via socket for real-time delivery
        socket.emit('sendMessage', {
          "chatId": selectedChat._id,
          "receiver": LoginUser?.id,
          "sender": selectedChat._id,
          "message": inputValue,
          "createdAt": new Date().toISOString()
        });
      }

      setInputValue('');
      triggerRefresh();   
    } catch (error) {
      console.error('Error in sending the message:', error);
    }

  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevents newline on Enter
      handleSendClick();
    }
  };


  return (
    <div className="shine-wrapper"
      onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} >

      <div className="shine" ref={shineRef} />

      <InputGroup w="80%" borderRadius="md" p={2} boxShadow="md" zIndex={1}>
        <Textarea
          placeholder="Type something"
          bgColor="#FFFFFF"
          color="black"
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setInputValue(e.target.value);

            if (inputValue) {
        // Emit the message via socket for real-time delivery
        socket.emit('typing', {
          "chatId": selectedChat._id,
          "isTyping": true,
          "sender": LoginUser?.id,
        });
            }
            
            // Optional: Auto-grow effect with max height
            const textarea = e.target;
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 72)}px`; // 3 rows ≈ 72px
          }}
          border="1px solid #3fa9d5"
          resize="none" // Optional: prevent resizing
          rows={1}
          maxH="72px" // ~3 rows height
          overflowY="auto" />

        <InputRightElement onClick={handleSendClick} cursor="pointer">
          <motion.div
            animate={{
              y: [0, -1.5, 3.5, -3.0, 3.0, 0.5],
              transition: {
                y: {
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              },
            }}
            whileHover={{
              y: 0,
              color: "#1a2a8a",
              transition: {
                y: { duration: 0.5 },
                color: { duration: 0.2 },
              },
            }}
            style={{ display: 'inline-block' }}>
            <IoSend
              style={{
                color: "#2e3ca5",
                marginTop: '0.9rem',
                marginRight: '1rem',
                fontSize: '1.3rem',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
            />
          </motion.div>
        </InputRightElement>
      </InputGroup>

    </div>
  );
}
