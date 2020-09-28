import styled from 'styled-components';
import { Typography, InputBase } from '@material-ui/core'

export const Root = styled.div`
  flex-grow: 1;
`

export const Title = styled(Typography)`
  flex-grow: 1;
`

export const Search = styled.div`
  position: relative;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.15);
  margin-left: 0;
  width: auto;
`

export const SearchIconWrapper = styled.div`
    height: 100%;
    position: absolute;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
`

export const Input = styled(InputBase)`
  &.MuiInputBase-root {
    color: inherit;
  }
  & .MuiInputBase-input {
    width: 100%;
    padding: 8px 8px 8px 0px;
    padding-left: calc(1em + 32px);
  }

`


