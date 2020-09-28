import React, { useCallback, useState } from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { debounce } from 'mini-debounce'
import { useDispatch } from 'react-redux'

import { setSearch } from '../../../ducks/contacts'
import { setAuthInfo } from '../../../ducks/auth'
import { Root, Title, Search, SearchIconWrapper, Input } from './styled'
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



const SearchAppBar: React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const history = useHistory()
  const debouncedSave = useCallback(debounce((nextValue: string) => dispatch(setSearch(nextValue)), 1000), [],);
  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target;
    setValue(nextValue)
    debouncedSave(nextValue)
  }
  const exitHandler = () => {
    dispatch(setAuthInfo({ token: '', username: '' }))
    localStorage.clear()
    history.push('/')
  }
  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <Title variant="h6" noWrap>
            Contacts
          </Title>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Input
              value={value}
              onChange={onChangeSearch}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <IconButton onClick={exitHandler}><ExitToAppIcon style={{ color: "#fff" }} /></IconButton>
        </Toolbar>
      </AppBar>
    </Root>
  );
}

export default SearchAppBar