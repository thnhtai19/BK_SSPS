import styled from "styled-components";

export const WrapperContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: #F7F9FB;
    position: relative; 
`;

export const Overlay = styled.div`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
`;

export const WrapperSlidebar = styled.div`
    height: 100%;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10001;
    transition: transform 0.3s ease;
    
    @media(max-width: 1200px) {
        width: 250px; 
        transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    }
    
    @media(min-width: 1201px) {
        position: static;
        transform: translateX(0);
    }
`;

export const ContentContainer = styled.div`
    flex: 1;
    padding-left: 0;
`;

export const HeaderComponentContainer = styled.div`
    position: relative;
    z-index: 1000; 
    background: #fff;
`;
