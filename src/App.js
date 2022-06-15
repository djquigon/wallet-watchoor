import Layout from './components/Layout';
import Dashboard from './components/Dashboard'; /**App */
import Home from './components/Home';
import Info from './components/Info';
import Missing from './components/Missing';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDLP-fI6ZPpEUrqvGlQkhWJp1GXH1mWZ1s",
  authDomain: "wallet-watchoor.firebaseapp.com",
  databaseURL: "https://wallet-watchoor-default-rtdb.firebaseio.com/",
  projectId: "wallet-watchoor",
  storageBucket: "wallet-watchoor.appspot.com",
  messagingSenderId: "827347776858",
  appId: "1:827347776858:web:50554f41062bfe1a15af63",
  measurementId: "G-52331ETH66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

function App() {

  const [account, setAccount] = useState(null)

  const handleAccount = (address) => {
    setAccount(address)
  }

  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home account={account} handleAccount={handleAccount}/>}/>
          <Route path="app" element={<Dashboard database={database} account={account} handleAccount={handleAccount}/>}/>
          <Route path="info" element={<Info account={account} handleAccount={handleAccount}/>}/>
          <Route path="*" element={<Missing account={account} handleAccount={handleAccount}/>}/>
        </Route>
      </Routes>
  );
}

export default App;
