import styled from 'styled-components'


export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 280px) 1fr;
  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    background-color: ${(props) => props.theme.secondWhite};
    overflow-y: auto;
  }
  section {
    margin: 0 auto;
    padding: 10px 5px;
    max-width: 1200px;
    width: 100%;
  }
`
