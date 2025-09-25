import styled from "styled-components"

export const ProductImage = styled.img`
  width: 140px;
  border-radius: 16px;
`
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    color: #fff;
    border: 4px;
    background-color: #9758a6;
    transition: all 0.3s;
    &:hover {
      background-color: #6f357c;
    }
    &:active {
      transform: scale(0.9);
    }
  }
`
export const EmptyCart = styled.p`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  width: 100%;
  height: 100px;
  text-align: right;
  align-items: center;
  display: flex;
  justify-content: center;
`
export const TotalPrice = styled.p`
  font-weight: bold;
`
export const TrashImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: block;
  margin: auto;
  &:hover {
    transform: scale(1.09);
  }
  &:active {
    transform: scale(0.92);
  }
`
