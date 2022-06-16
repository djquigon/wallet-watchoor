import { useCallback, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard'; /**App */
import Home from './components/Home';
import Info from './components/Info';
import Missing from './components/Missing';
import {Route, Routes} from 'react-router-dom';
import {useState} from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, get, ref, set} from "firebase/database"

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
//const analytics = getAnalytics(app);
const database = getDatabase(app);

function App() {

  const [account, setAccount] = useState(null)

  const handleAccount = (address) => {
    setAccount(address)
  }

  const addUser = useCallback( (accountToAdd) => {
    console.log("Adding user: ", accountToAdd)
    const date = new Date().toISOString();
    set(ref(database, `users/${accountToAdd}`), {
      dateJoined: date,
      transactionsWatched: 0,
      //default watched addresses for new user
      watchedAddresses: {        
        "0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2": {
          "alerts": true,
          "alias": "ftx",
          "dateAdded": date
        },
        "0xE592427A0AEce92De3Edee1F18E0157C05861564": {
          "alerts": true,
          "alias": "univ3",
          "dateAdded": date
        },
        "0xb5d85CBf7cB3EE0D56b3bB207D5Fc4B82f43F511": {
          "alerts": true,
          "alias": "coinbase 5",
          "dateAdded": date
        },
        "0x5555763613a12D8F3e73be831DFf8598089d3dCa": {
          "alerts": true,
          "alias": "ricmoo",
          "avatar": "https://www.ricmoo.com/profile.jpg",
          "dateAdded": date,
          "email": "me@ricmoo.com",
          "ens": "ricmoo.eth",
          "twitterName": "@ricmoo",
          "website": "https://www.ricmoo.com/"
        },
        "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5": {
          "alerts": true,
          "alias": "nick.eth",
          "avatar": "https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE",
          "dateAdded": date,
          "email": "arachnid@notdot.net",
          "ens": "nick.eth",
          "twitterName": "nicksdjohnson",
          "website": "https://ens.domains/"
        },
    }});
  }, [])

  useEffect(() => {
    if(account){
      console.log(account)
      get(ref(database, `users/${account}`)).then( (snapshot) => {
        const userCheck = snapshot.val() ? true : false
        console.log("User Exists? ", userCheck)
        !userCheck ? addUser(account) : console.log("Not adding, user already exists in database")
      }) 
    } 
  }, [account, addUser])
  

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
