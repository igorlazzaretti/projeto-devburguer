import styled from "styled-components";
import ReactSelect from "react-select";
import { Button } from "../../../components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`
export const Form = styled.form`
  border-radius: 20px;
  background-color: ${(props) => props.theme.black};
  padding: 32px;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const Label = styled.label`
  color: ${(props) => props.theme.white};
  font-size: 14px;
`
export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 5px;
  padding: 0 12px;
  border: none;
`
export const LabelUpload = styled.label`
  cursor: pointer;
  border: 1px dashed ${(props) => props.theme.white};
  border-radius: 5px;
  padding: 12px;
  margin-top:20px 0;
  display: flex;
  color: ${(props) => props.theme.white};
  > svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.white};
    margin-right: 20px;
  }
  input {
      display: none;
  }
`
export const Select = styled(ReactSelect)`
`
export const SubmitButton = styled(Button)`
  margin-top: 32px;
`
export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.darkRed};
  font-size: 12px;
  line-height: 80%;
  font-weight: 600;
`
export const ContainerCheckbox = styled.div`
  display: flex;
  cursor: pointer;
  gap: 10px;
  margin-top: 10px;
  input {
      cursor: pointer;
  }
`