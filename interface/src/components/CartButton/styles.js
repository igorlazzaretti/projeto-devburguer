import styled from "styled-components";

export const ContainerButton = styled.button`
  background-color: #9758A6;
  width: 100%;
  height: 52px;
  border-radius: 5px;
  font-size: 30px;
  border:0;
  background: ${(props) => props.theme.purple} ;
  color:${(props) => props.theme.whitefff};
  &:hover {
    background: #6F3575;
  }
  &:active {
    transform: scale(0.93);
  }
`