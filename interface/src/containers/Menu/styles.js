import styled from 'styled-components';
import BannerHamburguer from '../../assets/banner-menu.svg';
import Background from '../../assets/background.svg';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background:
    linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
    url('${Background}');
  width: 100vw;
  min-height: 100vh;
  background-color: #f0f0f0;
  gap: 20px;
  overflow-x: hidden;
`;
export const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  background: url('${BannerHamburguer}') no-repeat;
  background-color: ${(props) => props.theme.mainBlack};
  background-position: center;
  background-size: cover;
  position: relative;
  h1 {
    font-size: 80px;
    font-family: 'Road Rage', sans-serif;
    color: #fff;
    line-height: 65px;
    position: absolute;
    right: 17%;
    top: 11%;
    text-align: center;
  }
  span {
    display: block;
    font-family: 'Poppins', cursive;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
  }
`;
export const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin: 50px 0;
`;

export const CategoryButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: #9758A6;
  font-size: 52px;
  font-family: Road Rage, sans-serif;
  height: 52px;
  font-weight: 900;
  border-radius: 5px;
  padding: 0px 20px;
  line-height: 30px;
  border: none;
  // O botão tem uma borda inferior que muda de cor quando a categoria está ativa
  border-bottom: ${(props) => props.$isActiveCategory && `5px solid   #61A120`};
  transition: 0.2s ease-in-out;
  &:hover {
    scale: calc(1.03);
  }
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px;
  gap: 60px;
  justify-content: center;
  max-width: 1280px;
  margin: 50px auto 0px;

`;

export const ReturnButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: #9758A6;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  border-radius: 5px;
  padding: 10px 20px;
  transition: 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  position: fixed;
  left: 3vw;
  bottom: 5vh;
  border: 1px solid #9758A6;
  &:hover {
    color: #814c8fff;
    background-color: #f0f0f0;
  }
  &:active {
    color: #696969;
  }
`;
