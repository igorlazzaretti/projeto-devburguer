import styled from "styled-components";

export const Container = styled.div`
  height: 98vh;
`
export const ProductImage = styled.img`
  height: 80px;
  border-radius: 16px;
  padding: 12px;
  background-color: #f1f1f1;
`
export const EditButton = styled.button`
  border: none;
  background-color: ${props => props.theme.darkwhite};
  height: 62px;
  width: 62px;
  border-radius: 8px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
      height: 24px;
      width: 24px;
  }
  &:hover{
    background-color: ${props => props.theme.purple};
    svg{
        fill: ${props => props.theme.white};
    }
  }
  &:active{
    transform: scale(0.9);
  }
`
export const DeleteButton = styled.button`
  border: none;
  background-color: ${props => props.theme.darkwhite};
  height: 62px;
  width: 62px;
  border-radius: 8px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
      height: 24px;
      width: 24px;
  }
  &:hover{
    background-color: ${props => props.theme.darkRed};
    svg{
        fill: ${props => props.theme.white};
    }
  }
  &:active{
    transform: scale(0.9);
  }
`
export const AskDeleteProduct = styled.div`
`