import React from 'react';
import ReactDOM from 'react-dom';
import './scss/Bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
          <App />
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();