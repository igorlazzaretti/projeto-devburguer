import styled from "styled-components";

export const Button = styled.button`
  position: fixed;
  bottom: 60px;
  right: 30px;
  background: transparent;
  border: 2px solid ${(props) => props.theme.purple};
  color: ${(props) => props.theme.purple};
  font-size: 14px;
  font-weight: bold;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 1000;
  transition: all 0.3s ease;
  &:hover {
    background: ${(props) => props.theme.purple};
    color: #fff;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`