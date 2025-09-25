import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
`;

export const ModalHeader = styled.h2`
  margin: 0 0 16px;
  font-size: 18px;
  color: #333;
`;

export const ModalBody = styled.p`
  font-size: 14px;
  color: #555;
`;

export const ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const ButtonCancel = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #bdc3c7;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #95a5a6;
  }
`;

export const ButtonConfirm = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #e74c3c;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #c0392b;
  }
`;
