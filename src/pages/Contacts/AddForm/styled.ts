import styled from 'styled-components';
import { TextField, } from '@material-ui/core'

export const Form = styled.form`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 400px;
`;

export const Input = styled(TextField)`
  &.MuiFormControl-root {
    width: 100%;
  } 
`
export const WarningText = styled.p`
  color: red;
  min-height: 22px;
  margin: 5px 0;
  width: 100%;
`



