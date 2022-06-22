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
        "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": {
          "alerts": true,
          "alias": "Vitalik",
          "dateAdded": "2022-06-17T00:53:55.574Z",
          "ens": "vitalik.eth",
          "website": "https://vitalik.ca",
          "dateAdded": date
        },
        "0x4862733B5FdDFd35f35ea8CCf08F5045e57388B3": {
          "alerts": true,
          "alias": "3AC",
          "dateAdded": date
        },  
        "0xF30026fe8a2C0D01b70B1949Ceaf2e09EFd8B4A5": {
          "alerts": true,
          "alias": "3AC 2",
          "dateAdded": date
        },     
        "0x7f268357A8c2552623316e2562D90e642bB538E5": {
          "alerts": true,
          "alias": "OpenSea",
          "dateAdded": date
        },    
        "0xc5ed2333f8a2C351fCA35E5EBAdb2A82F5d254C3": {
          "alerts": true,
          "alias": "Alameda",
          "dateAdded": date
        },
        "0x293ed38530005620e4b28600f196a97e1125daac": {
          "alerts": true,
          "alias": "Mark Cuban",
          "dateAdded": date
        },      
        "0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2": {
          "alerts": true,
          "alias": "FTX Exchange",
          "dateAdded": date
        },
        "0xE592427A0AEce92De3Edee1F18E0157C05861564": {
          "alerts": true,
          "alias": "Uniswap Router V3",
          "dateAdded": date
        },
        "0x3DdfA8eC3052539b6C9549F12cEA2C295cfF5296": {
          "alerts": true,
          "alias": "Justin Sun",
          "dateAdded": date
        },
        "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5": {
          "alerts": true,
          "alias": "Nick",
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
