import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import SlidebarComponent from '../../components/SlidebarComponent/SlidebarComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { WrapperContainer, WrapperSlidebar, ContentContainer, Overlay } from './style';

const DashboardComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <WrapperContainer>
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <WrapperSlidebar isOpen={isOpen} ref={sidebarRef}>
        <SlidebarComponent curentpage={"1"} />
      </WrapperSlidebar>
      <ContentContainer isOpen={isOpen}>
        <HeaderComponent isOpen={isOpen} setIsOpen={setIsOpen} />
        <Outlet />
      </ContentContainer>
    </WrapperContainer>
  );
};

export default DashboardComponent;
