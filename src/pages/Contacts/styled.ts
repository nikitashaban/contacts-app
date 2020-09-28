import styled from 'styled-components';
import { Card } from '@material-ui/core'

export const AddCard = styled(Card)`
  width: 250px;
  min-height: 298px;
  margin: 10px;
  & .MuiButtonBase-root {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & > svg {
      width: 80%;
      height: 80%;
    }
  }
`






