import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100vw;
  height: 7vh;
  background: linear-gradient(-10deg, #1f1f1f, #1f1f1f, #1f1f1ff1, #1f1f1fe1, #1f1f1f, #1f1f1f, #1f1f1f);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  @keyframes gradient {
      0% {
          background-position: 0% 30%;
      }
      50% {
          background-position: 60% 20%;
      }
      100% {
          background-position: 0% 50%;
      }
  }
`
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 7vh;
`
export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7vh;
  div {
    margin-left: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h3 {
    color: #fff;
  }
`
export const HeaderLink = styled(Link)`
  color: ${props => props.$isActive ? '#9758a6' : '#fff'};
  border-bottom: ${props => props.$isActive ? '2px solid #9758a6' : 'none'};
  text-decoration: none;
  font-size: 14px;
  transition: color 200ms;
  height: 7vh;
  align-items: center;
  display: flex;
  padding: 0 16px;
  &:hover {
    color: #9758a6;
  }
`
export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  h3 {
    color: #fff;
    margin-left: 12px;
  }
`
export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  min-width: fit-content;
  p {
    color: #fff;
    font-weight: 300;
    span {
      font-weight: 500;
      color: #9758a6
    }
  }
`
export const LinkLogOut = styled.button`
  color: ${(props) => props.theme.darkGray};
  text-decoration: none;
  font-weight: 700;
  background-color: transparent;
  border: none;
  margin-left: 10px;
  height: 7vh;
  &:hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
    border-bottom: 2px solid #bb3719ff;
    transition: all 0.2s ease-in-out;
  }
`
export const CartHeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  text-decoration: none;
  position: relative;      /* o círculo vai se posicionar em cima do ícone */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${props => props.$isActive ? '2px solid #9758a6' : 'none'};
`
export const HeaderCartLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  height: 7vh;
  display: flex;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.purple};
    cursor: pointer;
    transition: 200ms;
  }
`
export const CircleQuantitty = styled.div`
  position: absolute;
  top: 10px;              /* ajusta a posição vertical */
  right: 60px;           /* ajusta a posição horizontal */
  background: ${(props) => props.theme.purple};
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  min-width: 20px;
  width: fit-content;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`