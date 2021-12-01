import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }  from 'react-redux';
import store from "./store/store"
import './index.css';
import App from './App';
import "./config/firebase-config";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);