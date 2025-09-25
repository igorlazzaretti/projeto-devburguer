import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  .carousel-item {
    padding-right: 40px;
    padding-left: 40px;
  }
  // Setas do Carousel
  .react-multiple-carousel__arrow::before {
      color: #9758A6;
      font-size: 50px;
      font-weight: bolder;
  }
  .react-multiple-carousel__arrow:hover {
    transform: scale(1.1);
  }
  .react-multiple-carousel__arrow--left {
    left: -0.008vw;
    min-width: 35px;
    min-height: 95px;
    background-color: transparent;
  }
  .react-multiple-carousel__arrow--right {
    right: -0.008vw;
    min-width: 35px;
    min-height: 95px;
    background-color: transparent;
  }
`;

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: #9758a6;
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin-bottom: 40px;
    margin-top: 20px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: calc(50% - 28px);
      width: 56px;
      height: 4px;
      background: #9758a6;
    }
`;

export const ContainerItems = styled.div`
  background: url(${props => props.$imageurl}) no-repeat center center;
  display: flex;
  align-items: center;
  padding: 20px 10px;
  width: 100%;
  height: 250px;
  background-size: cover;
  border-radius: 20px;

`;

export const CategoryButton = styled(Link)`
      color: #fff;
    background-color: rgba(0,0,0,0.5);
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 22.5px;
    font-weight: bold;
    margin-top: 140px;
    text-decoration: none;
    &:hover {
      transform: scale(1.03);
    }
    &:active {
      transform: scale(0.98);
    }
`;
