import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core'

export const Form = styled.form`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0 auto;
      max-width: 400px;
`;

export const Input = styled(TextField)`
  &.MuiFormControl-root {
    width: 100%;
    margin-bottom: 10px;
  } 
`

export const SignInBtn = styled(Button)`
  &.MuiButtonBase-root {
    width: 100%;
    height: 56px;
  }
`

export const WarningText = styled.p`
  color: red;
  min-height: 21px;
`
