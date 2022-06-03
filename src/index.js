import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import App from './App';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);