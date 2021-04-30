import React from 'react';
import {render} from 'react-snapshot';

import {Provider} from 'react-redux';
import store from './store'
import { HelmetProvider } from 'react-helmet-async';


import App from './App';
import reportWebVitals from './reportWebVitals';

render(
  <Provider store={store}>
    <HelmetProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HelmetProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
