import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  cursor: grab;
  box-shadow: rgba(0,0,0,0.35) 0px 5px 15px;
  position: relative;
  div {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 7px;
  }
  p {
    font-size: 18px;
    font-weight: 700;
    color: #ff8C05;
    line-height: 20px;
    margin-top: 45px;
  }
  strong {
  font-size: 22px;
  color: ${props => props.theme.black};
  line-height: 20px;
  font-weight: 800;
  }
`
export const CardImage = styled.img`
  height: 100px;
  position: absolute;
  top: -50px;
`