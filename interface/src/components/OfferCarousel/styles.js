import styled from "styled-components";

export const Container = styled.div`
  width: 97vw;
  .carousel-item {
    padding-right: 40px;
    padding-left: 40px;
  }
  // Overflow para o carrossel
  overflow-x: hidden;

  .react-multi-carousel-list {
    overflow: visible;
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
    left: -1.3vw;
    min-width: 35px;
    min-height: 95px;
    background-color: transparent;
  }
  .react-multiple-carousel__arrow--right {
    right: -1.3vw;
    min-width: 35px;
    min-height: 95px;
    background-color: transparent;
  }

  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 40px;
`;
export const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: #61A120;
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin-bottom: 40px;
    margin: 40px 0;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: calc(50% - 28px);
      width: 56px;
      height: 4px;
      background: #61A120;
    }
`;
