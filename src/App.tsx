import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import { useSelector } from './reducers'
import Auth from './pages/Auth'
import Contacts from './pages/Contacts'
import MainHeader from './components/navigation/MainHeader'

const App = () => {
  const { authInfo } = useSelector(state => state.auth)
  if (authInfo.info.token) {
    return (
      <>
        <MainHeader />
        <Switch>
          <Route path="/contacts">
            <Contacts />
          </Route>
          <Redirect to="/contacts" />
        </Switch>
      </>
    );
  }
  return (
    <Switch>
      <Route path="/" >
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}




export default App;
