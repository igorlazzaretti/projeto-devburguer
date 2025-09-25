import styled from 'styled-components'
import Background from '../../assets/background.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  justify-content: center;
  align-items: center;
  background:
  linear-gradient(rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.76)),
  url('${Background}');
  /* Garante que o container ocupe toda a área */
  width: 100vw;
  height: 89vh;
`
export const CompleteForm = styled.div`
  align-items: center;
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 5px 5px 10px #f1f1f1 ;
  background-color: #fff;
`
export const StatusIcon = styled.div`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const StatusText = styled.h2`
  font-size: 1.5rem;
  color: #333;
  text-align: center;
`
export const DetailsTable = styled.div`
  width: 100%;
  max-width: 500px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  tbody tr {
    border-bottom: 1px solid #e6e6e6;
  }
  tbody tr:last-child {
    border-bottom: none;
  }
`
export const TableLabel = styled.td`
  font-weight: 500;
  padding: 12px 8px;
  text-align: left;
  color: #555;
`
export const TableContent = styled.td`
  padding: 12px 8px;
  text-align: right;
  font-family: 'Courier New', Courier, monospace;
  color: #333;
  word-break: break-all;
`
export const DetailsLink = styled.a`
  color: #0055de;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`
export const RetryButton = styled.a`
  padding: 12px 24px;
  background-color: #0055de; 
  text-decoration: none;
  color: white;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.8;
  }
`
