import Layout from './components/Layout';
import Dashboard from './components/Dashboard'; /**App */
import Home from './components/Home';
import Info from './components/Info';
import Missing from './components/Missing';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

function App() {

  const [account, setAccount] = useState(null)

  const handleAccount = (address) => {
    setAccount(address)
  }

  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home account={account} handleAccount={handleAccount}/>}/>
          <Route path="app" element={<Dashboard account={account} handleAccount={handleAccount}/>}/>
          <Route path="info" element={<Info account={account} handleAccount={handleAccount}/>}/>
          <Route path="*" element={<Missing account={account} handleAccount={handleAccount}/>}/>
        </Route>
      </Routes>
  );
}

export default App;
