import React, { useRef, useEffect, useState } from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { SearchIcon } from '@chakra-ui/icons';
import { IoSend } from 'react-icons/io5';
import './SearchInput.css'


export function SearchInput() {
  return (
    <InputGroup>
      <Input type="text" placeholder="Search chat" bg="white" />
      <InputRightElement pointerEvents="none">
        <SearchIcon color="gray.400" />
      </InputRightElement>
    </InputGroup>
  );
}

export function ChatInput() {
  const shineRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const tlRef = useRef(null);

  useEffect(() => {
    if (shineRef.current) {
      console.log('Shine ref initialized:', shineRef.current);

      tlRef.current = gsap.timeline({ repeat: -1, paused: true });
      tlRef.current.to(shineRef.current, {
        x: '150%',
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 1,
      });

      console.log('GSAP timeline created');
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

  const handleSendClick = () => {
    if (inputValue.trim() === '') return;
    console.log('Send clicked or Enter pressed:', inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div className="shine-wrapper"
      onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} >
 
      <div className="shine" ref={shineRef} />
      <InputGroup w="80%" borderRadius="md" p={2} boxShadow="md" zIndex={1}>
      <Input type="text" placeholder="Type something" bgColor="#FFFFFF" color="black" value={inputValue}
        onKeyDown={handleKeyDown} onChange={(e) => setInputValue(e.target.value)} 
        border="1px solid #3fa9d5" />

          <InputRightElement onClick={handleSendClick} cursor="pointer">
          
          <IoSend
            style={{ color: "#2e3ca5",  marginTop: '0.9rem', marginRight: '1rem', fontSize: '1.3rem', 
            cursor: 'pointer',  transition: 'color 0.2s ease'}} _hover={{ color: "#1a2a8a" }} />
          </InputRightElement>
      </InputGroup>

    </div>
  );
}
