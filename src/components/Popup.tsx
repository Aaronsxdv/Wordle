import React from "react";
import styled, { keyframes } from "styled-components";

const slideInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: #ffffff;
  border: 1px solid #000000;
  padding: 20px;
  width: 400px;
  height: 200px;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  animation: ${slideInAnimation} 0.3s ease-in-out forwards;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
`;

type PopupProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ children, onClose }) => {
  return (
    <>
      <PopupContainer>
        {children}
        <CloseButton onClick={onClose}>X</CloseButton>
      </PopupContainer>
    </>
  );
};

export default Popup;
