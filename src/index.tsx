import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";

import { Alert } from "./components/UI";
import { AlertProvider } from "./context/alertContext";
import "./index.css"
import configureStore from "./store";
import App from './App';


const store = configureStore();


ReactDOM.render(
  <AlertProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Alert />
      </BrowserRouter>
    </Provider>
  </AlertProvider>,
  document.getElementById('root')
);

