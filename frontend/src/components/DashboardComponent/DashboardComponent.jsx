import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import SlidebarComponent from '../../components/SlidebarComponent/SlidebarComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { WrapperContainer, Overlay } from './style';

const DashboardComponent = ({pageIndex}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <WrapperContainer isOpen={isOpen}>
      <div className='wrap-sidebar' ref={sidebarRef}>
        <SlidebarComponent curentpage={pageIndex} />
      </div>
      <div className='wrap-main'>
        <div className='wrap-header'>
          <HeaderComponent isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
        <div className='wrap-page'>
          <Outlet />
        </div>
      </div>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
    </WrapperContainer>
  );
};

export default DashboardComponent;
