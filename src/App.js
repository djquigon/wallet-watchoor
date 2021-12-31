import Layout from './components/Layout';
import Dashboard from './components/Dashboard'; /**App */
import Home from './components/Home';
import Info from './components/Info';
import Missing from './components/Missing';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

function App() {
  const navigate = useNavigate();
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="app" element={<Dashboard/>}/>
          <Route path="info" element={<Info/>}/>
          <Route path="*" element={<Missing/>}/>
        </Route>
      </Routes>
  );
}

export default App;
