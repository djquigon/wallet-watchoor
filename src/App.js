import Layout from './components/Layout';
import Content from './components/Content'; /**App */
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
          <Route path="app" element={<Content/>}/>
          <Route path="info" element={<Info/>}/>
          <Route path="*" element={<Missing/>}/>
        </Route>
      </Routes>
  );
}

export default App;
